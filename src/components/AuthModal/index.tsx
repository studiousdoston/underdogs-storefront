import { X } from "lucide-react";
import Drawer from "@mui/joy/Drawer";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import { useAuthModal } from "../../context/AuthModalContext";
import styles from "./AuthModal.module.css";
import { useNavigate } from "react-router-dom";

export function AuthModal() {
  const { isOpen, close } = useAuthModal();
  const navigate = useNavigate();

  function goToAuth() {
    close();
    navigate("/auth");
  }
  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={close}
      sx={{
        "--Drawer-horizontalSize": "420px",
      }}
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: "none",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <div className={styles.dialog}>
        <div className={styles.header}>
          <Typography level="title-lg" className={styles.logo}>
            UNDERDOGS
          </Typography>
          <IconButton variant="plain" size="sm" onClick={close}>
            <X size={20} className={styles.closeButton} />
          </IconButton>
        </div>

        <Typography level="h4" className={styles.title}>
          Sign in to your account
        </Typography>
        <Typography level="body-sm" className={styles.subtitle}>
          Get access to your orders, rewards, and more
        </Typography>

        <div className={styles.buttonGroup}>
          <Button
            size="lg"
            variant="solid"
            className={styles.signUp}
            onClick={goToAuth}
          >
            Sign Up
          </Button>
          <Button
            size="lg"
            variant="outlined"
            className={styles.login}
            onClick={goToAuth}
          >
            <span>Already have an account?</span> Log In
          </Button>
        </div>

        <Typography level="body-xs" className={styles.terms}>
          By signing in, you agree to our privacy policy and terms of service
        </Typography>
      </div>
    </Drawer>
  );
}
