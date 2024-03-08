// import React, { useState, FormEvent } from "react";
// import {
//   Box,
//   Grid,
//   Link,
//   Container,
//   FormHelperText,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { LoadingButton } from "@mui/lab";
// import { useNavigate, useParams } from "react-router-dom";
// import AuthService from "../../services/auth";

// const ResetPasswordPage: React.FC = () => {
//   const { token } = useParams<{ token: string }>(); // 获取 URL 中的令牌
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (event: FormEvent) => {
//     event.preventDefault();

//     if (token) {
//       setMessage("");
//       setLoading(true);

//       AuthService.resetPassword(email, token).then(
//         () => {
//           setMessage("Password reset email sent. Please check your inbox.");
//           setLoading(false);
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();

//           setLoading(false);
//           setMessage(resMessage);
//         }
//       );
//     } else {
//       setMessage("Token not found in URL.");
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           mt: 8,
//         }}
//       >
//         <Typography component="h1" variant="h5">
//           {" "}
//           Reset Password{" "}
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} mt={3}>
//           <TextField
//             label="Email Address"
//             margin="normal"
//             required
//             fullWidth
//             autoComplete="email"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             autoFocus
//           />
//           <LoadingButton
//             type="submit"
//             variant="contained"
//             loading={loading}
//             sx={{ mt: 2 }}
//           >
//             Reset Password
//           </LoadingButton>
//           <Grid container justifyContent="flex-end" mt={2}>
//             <Grid item>
//               <Link href="/login" variant="body2">
//                 Back to login
//               </Link>
//             </Grid>
//           </Grid>
//           <FormHelperText>{message}</FormHelperText>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default ResetPasswordPage;

import React, { useState, FormEvent } from "react";
import {
  Box,
  Container,
  FormHelperText,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>(); // 从 URL 中获取 token
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!token) {
      setMessage("Token not found in URL.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    AuthService.resetPassword(token, newPassword).then(
      () => {
        setMessage("Your password has been successfully reset.");
        setLoading(false);
        navigate("/login"); // 导航到登录页面
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setLoading(false);
      }
    );
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type="password"
            id="new-password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            id="confirm-password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
          {message && (
            <FormHelperText error sx={{ mb: 4 }}>
              {message}
            </FormHelperText>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
