import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useLoggedInUser, useSignUp } from "../../hooks/auth.hooks";
import { validateName, validatePassword } from "../../utils/signUpvalidation";

const SignUpPage = () => {
  const { mutateAsync: signupAsync } = useSignUp();
  const { data: loggedInUser } = useLoggedInUser();

  const [firstname, setFirstname] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastname, setLastname] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState(null);

  const isPasswordMissMatch = useMemo(() => {
    return confirmPassword !== "" && password !== confirmPassword;
  }, [password, confirmPassword]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (isPasswordMissMatch) return;
    try {
      await signupAsync({ firstname, lastname, email, password });
    } catch (error) {
      const errorMessage = error?.response?.data?.error;
      setSignupError(errorMessage || "Something went wrong");
      console.error(error);
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSignupError(null);
  };

  useEffect(() => {
    if (!firstname) return;
    setFirstnameError(validateName("First Name", firstname));
  }, [firstname]);

  useEffect(() => {
    if (!lastname) return;
    setLastnameError(validateName("Last Name", lastname));
  }, [lastname]);

  useEffect(() => {
    if (!password) return;
    setPasswordError(validatePassword(password));
  }, [password]);

  const handleLastnameBlur = () => {
    if (!lastname) {
      setLastnameError("");
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
              type="text"
              error={!!firstnameError}
              helperText={firstnameError}
              FormHelperTextProps={{
                sx: {
                  maxWidth: "150px",
                  whiteSpace: "normal",
                },
              }}
              required
            ></TextField>
            <TextField
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              onBlur={handleLastnameBlur}
              label="Last Name"
              type="text"
              error={!!lastnameError}
              helperText={lastnameError}
              FormHelperTextProps={{
                sx: {
                  maxWidth: "150px",
                  whiteSpace: "normal",
                },
              }}
            ></TextField>
          </div>
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
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label="Password"
              type="password"
              error={!!passwordError}
              helperText={passwordError}
              FormHelperTextProps={{
                sx: {
                  maxWidth: "300px",
                  whiteSpace: "normal",
                },
              }}
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
          {signupError && (
            <div className="form-row">
              <Typography color="error">{signupError}</Typography>
            </div>
          )}
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
