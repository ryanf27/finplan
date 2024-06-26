"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { signIn, SignInResponse } from "next-auth/react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const result: SignInResponse | undefined = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        router.push("/dashboard");
      } else {
        if (result?.error === "CredentialsSignin") {
          console.error("Invalid email or password. Please try again.");
        } else if (result?.error?.startsWith("NextAuthError:")) {
          console.error("An error occurred during login:", result.error);
        } else {
          console.error(
            "An unknown error occurred during login:",
            result?.error
          );
        }
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
      }}
    >
      <Box
        sx={{
          background: `url('https://images.unsplash.com/photo-1541140911322-98afe66ea6da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdoaXRlJTIwJTIwYmFja2dyb3VuZCUyMGZpbmFuY2lhbHxlbnwwfHwwfHx8MA%3D%3D')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          p: 3,
        }}
      >
        <IconButton
          sx={{
            color: "black",
            mb: 2,
            padding: 2,
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
          }}
          component={Link}
          href="/"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1" sx={{ mb: 4, color: "black" }}>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }} noValidate>
          <TextField
            fullWidth
            margin="normal"
            id="email"
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{ input: { color: "black" }, label: { color: "black" } }}
          />
          <TextField
            fullWidth
            margin="normal"
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            sx={{ input: { color: "black" }, label: { color: "black" } }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#F0C042" }}
          >
            Log In
          </Button>
          <Typography sx={{ mt: 2, color: "black" }}>
            Don&apos;t have an account?
            <MuiLink href="/register" sx={{ color: "#F0C099" }}>
              Sign up
            </MuiLink>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
