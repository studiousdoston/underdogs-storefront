import { Footer } from "../../components/Footer";
import { PageIntro } from "../../components/PageIntro";
import { ProductListing } from "../../components/ProductListing";
import { StoreHeader } from "../../components/StoreHeader";
import { ClothType } from "../../lib/enums/clothes.enum";

const intro = {
  title: "All Clothes",
  description: `The modern male gym-goer expects more than just stretch. He wants comfort in sweat zones, and gear that looks sharp from gym to street. That’s exactly what our brand delivers, in every product, every run. Whether you’re targeting gym rats, runners, lifters, or lifestyle brands, our men’s activewear range is flexible enough to fit your market while remaining rigid on quality.`,
  imageUrl: "/clothes.webp",
};

const clothTypeOptions = Object.values(ClothType).map(
  (type) => type.charAt(0) + type.slice(1).toLowerCase(),
);

export default function Clothes() {
  return (
    <>
      <StoreHeader />
      <PageIntro
        title={intro.title}
        description={intro.description}
        imageUrl={intro.imageUrl}
      />
      <ProductListing typeOptions={clothTypeOptions} />
      <Footer />
    </>
  );
}
