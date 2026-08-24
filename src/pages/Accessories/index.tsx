import { Footer } from "../../components/Footer";
import { PageIntro } from "../../components/PageIntro";
import { ProductListing } from "../../components/ProductListing";
import { StoreHeader } from "../../components/StoreHeader";
import { AccessoryCategory } from "../../lib/enums/accessories.enum";

const intro = {
  title: "All Accessories",
  description: ` A workout outfit is never complete without sports accessories. Because the devil is in the detail, our sports accessories ensure you're ready for every session. From sports bags to toilet bags, socks to caps and water bottles to shakers, you'll never be short of anything.`,
  imageUrl: `/accessory.webp`,
};

const accessoryTypeOptions = Object.values(AccessoryCategory).map((type) => {
  const label = type.charAt(0) + type.slice(1).toLowerCase();

  return { label, value: type };
});

export default function Accessories() {
  return (
    <>
      <StoreHeader />
      <PageIntro
        title={intro.title}
        description={intro.description}
        imageUrl={intro.imageUrl}
      />
      <ProductListing
        typeOptions={accessoryTypeOptions}
        productType="accessory"
      />
      <Footer />
    </>
  );
}
