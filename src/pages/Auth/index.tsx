import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import styles from "./Auth.module.css";
import { useAppDispatch } from "@/hooks";
import { login, signup } from "../../features/auth/memberSlice";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "@/lib/sweetAlert";
import { Messages } from "@/lib/config";

type Mode = "login" | "signup";

export default function Auth() {
  const location = useLocation();
  const initialMode = (location.state as { mode?: Mode })?.mode ?? "login";
  const [memberNick, setMemberNick] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [mode, setMode] = useState<Mode>(initialMode);
  const [memberPassword, setMemberPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      mode === "signup" &&
      (!memberNick || !memberEmail || !memberPassword || !confirmPassword)
    ) {
      await sweetErrorHandling({
        response: { data: { message: Messages.error3 } },
      });
      return;
    }

    if (mode === "login" && (!memberEmail || !memberPassword)) {
      await sweetErrorHandling({
        response: { data: { message: Messages.error3 } },
      });
      return;
    }

    if (mode === "signup" && memberPassword !== confirmPassword) {
      await sweetErrorHandling({
        response: { data: { message: "Passwords do not match!" } },
      });
      return;
    }

    try {
      if (mode === "login") {
        await dispatch(login({ memberEmail, memberPassword })).unwrap();
        sweetTopSmallSuccessAlert("Welcome back!");
      } else {
        await dispatch(
          signup({ memberNick, memberEmail, memberPassword }),
        ).unwrap();
        sweetTopSmallSuccessAlert("Account created!");
      }
      navigate("/");
    } catch (err) {
      await sweetErrorHandling(err);
    }
  };

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

        <form className={styles.form} onSubmit={handleSubmit}>
          {mode === "signup" && (
            <Input
              placeholder="User Name"
              size="lg"
              className={styles.input}
              value={memberNick}
              onChange={(e) => setMemberNick(e.target.value)}
            />
          )}
          <Input
            placeholder="Email"
            type="email"
            size="lg"
            className={styles.input}
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            size="lg"
            className={styles.input}
            value={memberPassword}
            onChange={(e) => setMemberPassword(e.target.value)}
          />
          {mode === "signup" && (
            <Input
              placeholder="Confirm password"
              type="password"
              size="lg"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <Button
            size="lg"
            variant="solid"
            className={styles.submit}
            type="submit"
          >
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
