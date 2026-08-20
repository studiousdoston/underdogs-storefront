import Typography from "@mui/joy/Typography";
import styles from "./PageIntro.module.css";
import "../../css/globals.css";

type PageIntroProps = {
  title: string;
  description: string;
  imageUrl?: string;
};

export function PageIntro(props: PageIntroProps) {
  const { title, description, imageUrl } = props;
  return (
    <section className={styles.intro}>
      <Typography level="h3" className={styles.title}>
        {title}
      </Typography>
      <Typography level="body-md" className={styles.description}>
        {description}
      </Typography>
      <img src={imageUrl} alt="image" className={styles.image} />
    </section>
  );
}
