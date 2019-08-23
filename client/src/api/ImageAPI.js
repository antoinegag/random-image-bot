import RequestHandler from "./RequestHandler";
import Endpoints from "./Endpoints";

export default class ImageAPI {
  static async list() {
    return RequestHandler.get(Endpoints.IMAGE.LIST);
  }

  static async get(id) {
    return RequestHandler.get(Endpoints.IMAGE.GET(id));
  }

  static async delete(id) {
    return RequestHandler.delete(Endpoints.IMAGE.DELETE(id));
  }
}
