import { AspectRatio, Card, Skeleton } from "@mui/joy";
import cardStyles from "./Loader.module.css";

function ProductCardSkeleton() {
  return (
    <Card variant="plain" className={cardStyles.card}>
      <AspectRatio ratio="3/4">
        <Skeleton variant="rectangular" />
      </AspectRatio>
      <Skeleton variant="text" level="body-sm" className={cardStyles.name} />
      <Skeleton
        variant="text"
        level="body-md"
        width="40%"
        className={cardStyles.name}
      />
    </Card>
  );
}
