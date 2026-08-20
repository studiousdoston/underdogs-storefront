import { Footer } from "../../components/Footer";
import { PageIntro } from "../../components/PageIntro";
import { ProductListing } from "../../components/ProductListing";
import { StoreHeader } from "../../components/StoreHeader";

export default function Accessories() {
  return (
    <>
      <StoreHeader />
      <PageIntro />
      <ProductListing />
      <Footer />
    </>
  );
}
