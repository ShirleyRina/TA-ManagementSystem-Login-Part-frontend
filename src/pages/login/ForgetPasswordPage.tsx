import React, { useState, FormEvent } from "react";
import {
  Box,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth";

const ForgotPasswordPage: React.FC = () => {
  // 1. 声明状态变量
  const [email, setEmail] = useState(""); // 存储电子邮件
  const [loading, setLoading] = useState(false); // 控制加载状态
  const [message, setMessage] = useState(""); // 存储消息

  const navigate = useNavigate();

  // 2. 处理忘记密码表单提交
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // 通过AuthService处理忘记密码逻辑
    AuthService.forgotPassword(email).then(
      () => {
        setMessage("check your email");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setLoading(false);
        setMessage(resMessage);
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
          Forgot Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} mt={3}>
          {/* 3. 渲染电子邮件输入框 */}
          <TextField
            label="Email Address"
            margin="normal"
            required
            fullWidth
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {/* 4. 渲染密码重置按钮 */}
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            sx={{ mt: 4, mb: 3 }}
          >
            Reset Password
          </LoadingButton>
          {/* 5. 渲染取消按钮 */}
          <Button
            component={RouterLink}
            variant="text"
            to="/login"
            sx={{ mt: 4, mb: 3 }}
          >
            Cancel
          </Button>
          {/* 6. 显示错误消息 */}
          <FormHelperText>{message}</FormHelperText>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
