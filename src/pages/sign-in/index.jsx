import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useLoggedInUser, useSignIn } from "../../hooks/auth.hooks";

const SignInPage = () => {
  const { mutateAsync: signinAsync } = useSignIn();
  const { data: loggedInUser } = useLoggedInUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signinAsync({ email, password });
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      setLoginError(errorMessage || "Something went wrong");
      console.error(error);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setLoginError(null);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setLoginError(null);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUser) {
      navigate("/dashboard");
    }
  }, [loggedInUser, navigate]);

  return (
    <div className="signin-page-container">
      <div className="sign-in-form">
        <Typography variant="h3">Sign In</Typography>
        <Box component="form" onSubmit={handleSignIn}>
          <div className="form-row">
            <TextField
              value={email}
              onChange={handleEmail}
              fullWidth
              label="Email"
              required
              type="email"
            ></TextField>
          </div>
          <div className="form-row">
            <TextField
              value={password}
              onChange={handlePassword}
              fullWidth
              label="Password"
              type="password"
              required
            ></TextField>
          </div>
          {loginError && (
            <div className="form-row">
              <Typography color="error">{loginError}</Typography>
            </div>
          )}
          <div className="form-row">
            <Button fullWidth variant="contained" type="submit">
              Create Account
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default SignInPage;
