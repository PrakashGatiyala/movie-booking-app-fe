import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useLoggedInUser, useSignUp } from "../../hooks/auth.hooks";

const SignUpPage = () => {
  const { mutateAsync: signupAsync } = useSignUp();
  const { data: loggedInUser } = useLoggedInUser();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordMissMatch = useMemo(() => {
    return confirmPassword !== "" && password !== confirmPassword;
  }, [password, confirmPassword]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isPasswordMissMatch) return;
    try {
      await signupAsync({ firstname, lastname, email, password });
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (loggedInUser) {
      navigate("/dashboard");
    }
  }, [loggedInUser, navigate]);

  return (
    <div className="signup-page-container">
      <div>
        <Typography variant="h3">Sign up</Typography>
        <Box component="form" onSubmit={handleSignUp}>
          <div className="form-row">
            <TextField
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              label="First Name"
              required
            ></TextField>
            <TextField
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              label="Last Name"
            ></TextField>
          </div>
          <div className="form-row">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Email"
              required
              type="email"
            ></TextField>
          </div>
          <div className="form-row">
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label="Password"
              type="password"
              required
            ></TextField>
          </div>
          <div className="form-row">
            <TextField
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={isPasswordMissMatch}
              helperText={isPasswordMissMatch && "Password does not match"}
              fullWidth
              label="Confirm Password"
              type="password"
              required
            ></TextField>
          </div>
          <div className="form-row">
            <Button
              disabled={isPasswordMissMatch}
              fullWidth
              variant="contained"
              type="submit"
            >
              Create Account
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default SignUpPage;
