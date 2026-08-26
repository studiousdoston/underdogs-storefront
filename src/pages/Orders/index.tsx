import { useEffect, useState } from "react";
import { StoreHeader } from "../../components/StoreHeader";
import { PageIntro } from "../../components/PageIntro";
import { OrderTabs } from "../../components/OrderTabs";
import { OrderCard } from "../../components/OrderCard";
import { OrderSidebar } from "../../components/OrderSidebar";
import { Footer } from "../../components/Footer";
import styles from "./Orders.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchMyOrders,
  payOrder,
  deleteOrder,
} from "../../features/order/orderSlice";
import { Typography } from "@mui/joy";

const TAB_TO_STATUS: Record<string, "IN_CART" | "PAID" | "DELIVERED"> = {
  "In the cart": "IN_CART",
  "On the process": "PAID",
  "Finished Orders": "DELIVERED",
};

export default function Orders() {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState("In the cart");

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  const filteredOrders = orders.filter(
    (order) => order.orderStatus === TAB_TO_STATUS[activeTab],
  );

  return (
    <>
      <StoreHeader />

      <PageIntro
        title="My Orders"
        description="A workout outfit is never complete without sports accessories. Because the devil is in the detail, our sports accessories ensure you're ready for every session."
        imageUrl="/header2.webp"
      />

      <div className={styles.content}>
        <div className={styles.main}>
          <OrderTabs onChange={setActiveTab} />

          {status === "loading" ? (
            <Typography level="body-sm">Loading orders...</Typography>
          ) : filteredOrders.length === 0 ? (
            <Typography level="body-sm">No orders here yet.</Typography>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order._id}
                orderId={order._id}
                status={order.orderStatus}
                items={order.items.map((i) => ({
                  name: i.itemName,
                  price: i.itemPriceAtPurchase,
                  quantity: i.itemQuantity,
                }))}
                onCancel={(id) => dispatch(deleteOrder(id))}
                onPay={(id) => dispatch(payOrder(id))}
              />
            ))
          )}
        </div>

        <OrderSidebar />
      </div>

      <Footer />
    </>
  );
}
