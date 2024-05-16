import { Button, TextField } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
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

const Settings = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [update, setUpdate] = useState({
    username: "",
    email: "",
  });
  const [reset, setReset] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/user/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        setUpdate({
          username: res.data.username,
          email: res.data.email,
        });
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops!! something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      });
  }, []);

  function handleUpdateChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setUpdate((prevUpdate) => ({
      ...prevUpdate,
      [name]: value,
    }));
  }

  function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .patch("http://127.0.0.1:8080/user/update", update, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Opps! something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  }

  function handleResetChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setReset((prevReset) => ({
      ...prevReset,
      [name]: value,
    }));
  }

  function handleReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .patch("http://127.0.0.1:8080/user/reset", reset, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data,
          showConfirmButton: false,
          timer: 1500,
        });
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
      <form onSubmit={handleUpdate}>
        <h1>Update</h1>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
          autoComplete="username"
          style={inputStyle}
          onChange={handleUpdateChange}
          value={update.username}
          required
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          autoComplete="email"
          style={inputStyle}
          onChange={handleUpdateChange}
          value={update.email}
          required
        />
        <Button variant="contained" type="submit" style={buttonStyle}>
          Update
        </Button>
      </form>
      <form onSubmit={handleReset}>
        <h1>Password Reset</h1>
        <TextField
          id="outlined-basic"
          label="Current password"
          variant="outlined"
          name="currentPassword"
          autoComplete="current-password"
          style={inputStyle}
          onChange={handleResetChange}
          type="password"
          required
        />
        <TextField
          id="outlined-basic"
          label="New password"
          variant="outlined"
          name="newPassword"
          autoComplete="new-password"
          style={inputStyle}
          onChange={handleResetChange}
          type="password"
          required
        />
        <TextField
          id="outlined-basic"
          label="Confirm password"
          variant="outlined"
          name="confirmPassword"
          autoComplete="new-password"
          style={inputStyle}
          onChange={handleResetChange}
          type="password"
          required
        />
        <Button variant="contained" type="submit" style={buttonStyle}>
          Reset
        </Button>
      </form>
    </div>
  );
};

export default Settings;
