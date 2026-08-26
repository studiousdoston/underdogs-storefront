import { ItemSize, ItemType, OrderStatus } from "../enums/order.enum.js";


export type OrderItem = {
  _id: string;
  orderId: string;
  productId: string;
  itemType: ItemType;
  itemSize: ItemSize;
  itemQuantity: number;
  itemPriceAtPurchase: number;
  itemName: string;
};

export interface Order {
  _id: string;
  memberId: string;
  orderStatus: OrderStatus;
  orderTotal: number;
  orderDelivery: number;
  orderLocation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus;
}

export interface AddToCartInput {
  productId: string;
  itemType: ItemType;
  itemSize: ItemSize;
  itemQuantity: number;
}
