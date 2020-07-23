# tvm, relay
import tvm
from tvm import te
from tvm import relay

# os and numpy
import numpy as np
import os.path

# Tensorflow imports
import tensorflow as tf

try:
    tf_compat_v1 = tf.compat.v1
except ImportError:
    tf_compat_v1 = tf

# Tensorflow utility functions
import tvm.relay.testing.tf as tf_testing

# Base location for model related files.
repo_base = "models/"

# Test image
img_name = ""
image_url = os.path.join(repo_base, img_name)

model_name = "model.pb"
model_url = os.path.join(repo_base, model_name)

# Image label map
map_proto = "proto.pbtxt"
map_proto_url = os.path.join(repo_base, map_proto)

# Human readable text for labels
label_map = "label_map.txt"
label_map_url = os.path.join(repo_base, label_map)

# Target settings
# Use these settings to build for cuda.
target = "cuda"
target_host = "llvm"
layout = "NCHW"
ctx = tvm.gpu(0)
# Use these settings to build for cpu.
# target = 'llvm'
# target_host = 'llvm'
# layout = None
# ctx = tvm.cpu(0)

from tvm.contrib.download import download_testdata

img_path = download_testdata(image_url, img_name, module="data")
model_path = download_testdata(model_url, model_name, module=["tf", "object_detection"])
map_proto_path = download_testdata(map_proto_url, map_proto, module="data")
label_path = download_testdata(label_map_url, label_map, module="data")


with tf_compat_v1.gfile.GFile(model_path, "rb") as f:
    graph_def = tf_compat_v1.GraphDef()
    graph_def.ParseFromString(f.read())
    graph = tf.import_graph_def(graph_def, name="")
    # Call the utility to import the graph definition into default graph.
    graph_def = tf_testing.ProcessGraphDefParam(graph_def)
    # Add shapes to the graph.
    with tf_compat_v1.Session() as sess:
        graph_def = tf_testing.AddShapesToGraphDef(sess, "softmax")


from PIL import Image

image = Image.open(img_path).resize((299, 299))

x = np.array(image)


shape_dict = {"DecodeJpeg/contents": x.shape}
dtype_dict = {"DecodeJpeg/contents": "uint8"}
mod, params = relay.frontend.from_tensorflow(graph_def, layout=layout, shape=shape_dict)

print("Tensorflow protobuf imported to relay frontend.")


with tvm.transform.PassContext(opt_level=3):
    lib = relay.build(mod, target=target, target_host=target_host, params=params)


from tvm.contrib import graph_runtime

dtype = "uint8"
m = graph_runtime.GraphModule(lib["default"](ctx))
# set inputs
m.set_input("DecodeJpeg/contents", tvm.nd.array(x.astype(dtype)))
# execute
m.run()
# get outputs
tvm_output = m.get_output(0, tvm.nd.empty(((1, 1008)), "float32"))


predictions = tvm_output.asnumpy()
predictions = np.squeeze(predictions)

# Creates node ID --> English string lookup.
node_lookup = tf_testing.NodeLookup(
    label_lookup_path=map_proto_path, uid_lookup_path=label_path
)

# Print top 5 predictions from TVM output.
top_k = predictions.argsort()[-5:][::-1]
for node_id in top_k:
    human_string = node_lookup.id_to_string(node_id)
    score = predictions[node_id]
    print("%s (score = %.5f)" % (human_string, score))

