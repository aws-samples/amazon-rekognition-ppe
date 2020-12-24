import request from "./request";

const gateway = {
  processImage(image) {
    return request("/process", "post", { image });
  },
};

export default gateway;
