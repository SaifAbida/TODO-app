import { Button, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const inputStyle = {
  width: "400px",
  margin: "10px auto",
};

const buttonStyle = {
  padding: "10px 25px",
  marginTop: "20px",
};

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8080/user/login", user)
      .then((res: AxiosResponse) => {
        localStorage.setItem("token", res.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  return (
    <div className="Container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
          autoComplete="username"
          onChange={handleChange}
          style={inputStyle}
          required
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          autoComplete="current-password"
          onChange={handleChange}
          style={inputStyle}
          type="password"
          required
        />
        <Button variant="contained" type="submit" style={buttonStyle}>
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
