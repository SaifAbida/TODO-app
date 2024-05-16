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

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
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
      .post("http://127.0.0.1:8080/user/register", user)
      .then((res: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops!! something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  return (
    <div className="Container">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
          autoComplete="username"
          style={inputStyle}
          onChange={handleChange}
          required
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          autoComplete="email"
          style={inputStyle}
          onChange={handleChange}
          required
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          autoComplete="current-password"
          style={inputStyle}
          type="password"
          onChange={handleChange}
          required
        />
        <Button variant="contained" type="submit" style={buttonStyle}>
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
