import axios from "axios";
import type {
  Cloth,
  GetClothesParams,
  GetClothesResponse,
} from "../lib/types/clothes";

const serverApi = import.meta.env.VITE_SERVER_API as string;

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  //! ------- getClothes -------
  public async getClothes(
    params: GetClothesParams,
  ): Promise<GetClothesResponse> {
    try {
      const url = `${this.path}/product/clothes`;
      const result = await axios.get(url, { params, withCredentials: true });
      return result.data;
    } catch (err) {
      console.log("ERROR, getClothes:", err);
      throw err;
    }
  }
}

export default ProductService;
