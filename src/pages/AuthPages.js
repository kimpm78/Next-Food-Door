import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { authenticateUser, saveUser } from "../utils/storage";
import classes from "./Pages.module.css";

export const LoginPage = ({ onLogin, onNavigate }) => {
  const [form, setForm] = useState({ email: "", password: "" });

  const submitHandler = (event) => {
    event.preventDefault();
    const user = authenticateUser(form.email.trim(), form.password);

    if (!user) {
      toast.error("メールアドレスまたはパスワードが正しくありません。");
      return;
    }

    localStorage.setItem("nfd_current_user", JSON.stringify(user));
    onLogin(user);
    toast.success("ログインしました。");
    onNavigate("/");
  };

  return (
    <section className={classes.authPage}>
      <form className={classes.panel} onSubmit={submitHandler}>
        <Typography variant="h4" component="h1">
          ログイン
        </Typography>
        <TextField
          label="メールアドレス"
          type="email"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
          required
          fullWidth
        />
        <TextField
          label="パスワード"
          type="password"
          value={form.password}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, password: event.target.value }))
          }
          required
          fullWidth
        />
        <Button type="submit" variant="contained" size="large">
          ログイン
        </Button>
        <Button onClick={() => onNavigate("/signup")}>会員登録</Button>
      </form>
    </section>
  );
};

export const SignupPage = ({ onNavigate }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    address: "",
    phone: "",
    terms: false,
  });
  const [visiblePasswords, setVisiblePasswords] = useState({
    password: false,
    passwordConfirm: false,
  });

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setVisiblePasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (form.password !== form.passwordConfirm) {
      toast.error("パスワードが一致しません。");
      return;
    }

    if (!form.terms) {
      toast.error("利用規約に同意してください。");
      return;
    }

    try {
      saveUser({
        email: form.email.trim(),
        password: form.password,
        name: form.name.trim(),
        address: form.address.trim(),
        phone: form.phone.trim(),
        termsAccepted: form.terms,
      });
      onNavigate("/signup-complete");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <section className={classes.authPage}>
      <form className={classes.panel} onSubmit={submitHandler}>
        <Typography variant="h4" component="h1">
          会員登録
        </Typography>
        <TextField
          label="メールアドレス"
          type="email"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="パスワード"
          type={visiblePasswords.password ? "text" : "password"}
          value={form.password}
          onChange={(event) => updateField("password", event.target.value)}
          required
          fullWidth
          inputProps={{ minLength: 6 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="パスワードを表示"
                  edge="end"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {visiblePasswords.password ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="パスワード確認"
          type={visiblePasswords.passwordConfirm ? "text" : "password"}
          value={form.passwordConfirm}
          onChange={(event) =>
            updateField("passwordConfirm", event.target.value)
          }
          required
          fullWidth
          inputProps={{ minLength: 6 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="パスワード確認を表示"
                  edge="end"
                  onClick={() => togglePasswordVisibility("passwordConfirm")}
                >
                  {visiblePasswords.passwordConfirm ? (
                    <VisibilityOff />
                  ) : (
                    <Visibility />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="お名前"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          required
          fullWidth
        />
        <TextField
          label="住所"
          value={form.address}
          onChange={(event) => updateField("address", event.target.value)}
          required
          fullWidth
          multiline
          minRows={2}
        />
        <TextField
          label="電話番号"
          type="tel"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          required
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={form.terms}
              onChange={(event) => updateField("terms", event.target.checked)}
            />
          }
          label="利用規約に同意します。"
        />
        <Button type="submit" variant="contained" size="large">
          会員登録完了
        </Button>
        <Button onClick={() => onNavigate("/login")}>ログインへ移動</Button>
      </form>
    </section>
  );
};

export const SignupCompletePage = ({ onNavigate }) => (
  <section className={classes.authPage}>
    <Box className={classes.panel}>
      <Typography variant="h4" component="h1">
        会員登録完了
      </Typography>
      <Alert severity="success">会員登録が正常に完了しました。</Alert>
      <Button variant="contained" size="large" onClick={() => onNavigate("/login")}>
        ログインする
      </Button>
      <Button onClick={() => onNavigate("/")}>ホームへ移動</Button>
    </Box>
  </section>
);

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

SignupPage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};

SignupCompletePage.propTypes = {
  onNavigate: PropTypes.func.isRequired,
};
