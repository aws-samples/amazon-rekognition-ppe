import request from "./request";

export default {
  processImage(image) {
    // return request("/process", "post", { image });

    return request("DetectProtectiveEquipment", {
      Image: { Bytes: image },
    });
  },
};
