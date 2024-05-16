import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const linkStyle = {
  textDecoration: "none",
  color: "white",
};

export default function NavBar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  function handleClick() {
    localStorage.removeItem("token");
    navigate("/login");
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
      icon: "info",
      title: "Signed out successfully",
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            TODO
          </Typography>
          {token ? (
            <>
              {" "}
              <Button color="inherit">
                <Link to="/" style={linkStyle}>
                  List
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/settings" style={linkStyle}>
                  Settings
                </Link>
              </Button>
              <Button color="inherit" onClick={handleClick}>
                Logout
              </Button>
            </>
          ) : (
            <>
              {" "}
              <Button color="inherit">
                <Link to="/login" style={linkStyle}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link to="/register" style={linkStyle}>
                  Register
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
