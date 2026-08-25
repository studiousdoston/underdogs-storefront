import axios from "axios";
import type {
  GetClothesParams,
  GetClothesResponse,
} from "../lib/types/clothes";
import type {
  GetAccessoriesParams,
  GetAccessoriesResponse,
} from "@/lib/types/accessories";
import type { Product } from "@/lib/types/product";

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

  //! ------- getClothes -------
  public async getAccessories(
    params: GetAccessoriesParams,
  ): Promise<GetAccessoriesResponse> {
    try {
      const url = `${this.path}/product/accessories`;
      const result = await axios.get(url, { params, withCredentials: true });
      return result.data;
    } catch (err) {
      console.log("ERROR, getAccessories:", err);
      throw err;
    }
  }

  //! ------- getProductById -------
  public async getProductById(id: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${id}`;
      const result = await axios.get(url, { withCredentials: true });
      return result.data.data;
    } catch (err) {
      console.log("ERROR, getProductById:", err);
      throw err;
    }
  }

  //! ------- getRelatedProducts -------
  public async getRelatedProducts(id: string, limit = 4): Promise<Product[]> {
    try {
      const url = `${this.path}/product/${id}/related`;
      const result = await axios.get(url, {
        params: { limit },
        withCredentials: true,
      });
      return result.data.data;
    } catch (err) {
      console.log("ERROR, getRelatedProducts:", err);
      throw err;
    }
  }
}

export default ProductService;
