import axios from "axios";
import type { AddToCartInput, Order, OrderItem } from "@/lib/types/order";

const serverApi = import.meta.env.VITE_SERVER_API as string;

class CartService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  //! ------- createOrderBulk -------
  public async createOrderBulk(
    items: AddToCartInput[],
  ): Promise<Order & { items: OrderItem[] }> {
    try {
      const url = `${this.path}/member/orders/bulk`;
      const result = await axios.post(
        url,
        { items },
        { withCredentials: true },
      );
      return result.data.data;
    } catch (err) {
      console.log("ERROR, createOrderBulk:", err);
      throw err;
    }
  }

  //! ------- cancelOrder -------
  public async cancelOrder(orderId: string): Promise<Order> {
    try {
      const url = `${this.path}/member/${orderId}/cancel`;
      const result = await axios.patch(url, {}, { withCredentials: true });
      return result.data.data;
    } catch (err) {
      console.log("ERROR, cancelOrder:", err);
      throw err;
    }
  }

  //! ------- deleteOrder -------
  public async deleteOrder(orderId: string): Promise<void> {
    try {
      const url = `${this.path}/member/${orderId}`;
      await axios.delete(url, { withCredentials: true });
    } catch (err) {
      console.log("ERROR, deleteOrder:", err);
      throw err;
    }
  }
}

export default CartService;
