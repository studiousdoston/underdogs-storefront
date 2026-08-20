import { useState } from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import styles from "./Auth.module.css";

type Mode = "login" | "signup";

export default function Auth() {
  const [mode, setMode] = useState<Mode>("login");

  return (
    <div className={styles.wrapper}>
      <Link to="/" className={styles.logo}>
        <Typography level="h4">UNDERDOGS</Typography>
      </Link>

      <div className={styles.card}>
        <Typography level="h4" className={styles.title}>
          {mode === "login" ? "Log in to your account" : "Create an account"}
        </Typography>
        <Typography level="body-sm" className={styles.subtitle}>
          {mode === "login"
            ? "Welcome back. Enter your details below."
            : "Get access to your orders, rewards, and more."}
        </Typography>

        <form className={styles.form}>
          {mode === "signup" && (
            <Input placeholder="Full name" size="lg" className={styles.input} />
          )}
          <Input
            placeholder="Email"
            type="email"
            size="lg"
            className={styles.input}
          />
          <Input
            placeholder="Password"
            type="password"
            size="lg"
            className={styles.input}
          />
          {mode === "signup" && (
            <Input
              placeholder="Confirm password"
              type="password"
              size="lg"
              className={styles.input}
            />
          )}

          <Button size="lg" variant="solid" className={styles.submit}>
            {mode === "login" ? "Log In" : "Sign Up"}
          </Button>
        </form>

        <Typography level="body-sm" className={styles.toggle}>
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className={styles.toggleLink}
                onClick={() => setMode("signup")}
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className={styles.toggleLink}
                onClick={() => setMode("login")}
              >
                Log in
              </span>
            </>
          )}
        </Typography>
      </div>
    </div>
  );
}
