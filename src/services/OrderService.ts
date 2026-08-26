import type { OrderStatus } from "@/lib/enums/order.enum";
import axios from "axios";

const serverApi = import.meta.env.VITE_SERVER_API as string;

export type OrderItemDto = {
  _id: string;
  itemName: string;
  itemPriceAtPurchase: number;
  itemQuantity: number;
};

export type OrderDto = {
  _id: string;
  orderStatus: OrderStatus;
  orderTotal: number;
  orderDelivery: number;
  items: OrderItemDto[];
};

class OrderService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  //! ------- getMyOrders -------
  public async getMyOrders(
    orderStatus?: string,
  ): Promise<{ data: OrderDto[]; total: number }> {
    try {
      const url = `${this.path}/member/mine`;
      const result = await axios.get(url, {
        params: orderStatus ? { orderStatus, limit: 50 } : { limit: 50 },
        withCredentials: true,
      });
      return result.data;
    } catch (err) {
      console.log("ERROR, getMyOrders:", err);
      throw err;
    }
  }

  //! ------- payOrder -------
  public async payOrder(orderId: string): Promise<OrderDto> {
    try {
      const url = `${this.path}/member/${orderId}/pay`;
      const result = await axios.patch(url, {}, { withCredentials: true });
      return result.data.data;
    } catch (err) {
      console.log("ERROR, payOrder:", err);
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

export default OrderService;
