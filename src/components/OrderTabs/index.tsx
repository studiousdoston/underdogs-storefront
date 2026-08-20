import { useState } from "react";
import styles from "./OrderTabs.module.css";

const tabs = ["In the cart", "On the process", "Finished Orders"];

type OrderTabsProps = {
  onChange?: (tab: string) => void;
};

export function OrderTabs({ onChange }: OrderTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  function handleClick(tab: string) {
    setActiveTab(tab);
    onChange?.(tab);
  }

  return (
    <div className={styles.tabs}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${tab === activeTab ? styles.active : ""}`}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
