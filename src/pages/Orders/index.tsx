import { StoreHeader } from "../../components/StoreHeader";
import { PageIntro } from "../../components/PageIntro";
import { OrderTabs } from "../../components/OrderTabs";
import { OrderCard } from "../../components/OrderCard";
import { OrderSidebar } from "../../components/OrderSidebar";
import { Footer } from "../../components/Footer";
import styles from "./Orders.module.css";

const sampleOrder = [
  { name: "shoes", price: 129.99 },
  { name: "long sleeve shirts", price: 39.99 },
];

export default function Orders() {
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
          <OrderTabs />
          <OrderCard items={sampleOrder} />
        </div>

        <OrderSidebar />
      </div>

      <Footer />
    </>
  );
}
