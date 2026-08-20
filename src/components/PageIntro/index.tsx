import Typography from "@mui/joy/Typography";
import styles from "./PageIntro.module.css";
import '../../css/globals.css'

// type PageIntroProps = {
//   title: string;
//   description: string;
//   imageUrl?: string;
// };

export function PageIntro() {
  return (
    <section className={styles.intro}>
      <Typography level="h3" className={styles.title}>
        All Accessories
      </Typography>
      <Typography level="body-md" className={styles.description}>
        A workout outfit is never complete without sports accessories. Because
        the devil is in the detail, our sports accessories ensure you're ready
        for every session. From sports bags to toilet bags, socks to caps and
        water bottles to shakers, you'll never be short of anything.
      </Typography>
      <img src={"/accessory.webp"} alt="image" className={styles.image} />
    </section>
  );
}
