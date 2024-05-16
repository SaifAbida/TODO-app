import { useEffect, useState } from "react";
import { ItemType } from "../Types";
import axios, { AxiosResponse } from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const btnStyle = {
  marginLeft: "10px",
  marginTop: "20px",
  padding: "15px",
};

const inputStyle = {
  width: "300px",
  margin: "20px auto",
};

const Home = () => {
  const [list, setList] = useState<ItemType[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/list/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res: AxiosResponse) => {
        setList(res.data);
        setLoading(false);
      })
      .catch(() => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops!! something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        navigate("/login");
      });
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (content.trim()) {
      axios
        .post(
          "http://127.0.0.1:8080/list/",
          { content },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res: AxiosResponse) => {
          setList(res.data);
          setContent("");
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
  }

  function handleDelete(id: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://127.0.0.1:8080/list/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res: AxiosResponse) => {
            setList(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
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
          });
      }
    });
  }

  return (
    <div className="Container">
      <div className="todoContainer">
        <h1 style={{ textAlign: "center" }}>TODOlist</h1>
        <form
          onSubmit={handleSubmit}
          style={{ display: "inline", padding: "0" }}
        >
          <TextField
            id="outlined-basic"
            label="What's on your mind"
            variant="outlined"
            onChange={(e) => setContent(e.target.value)}
            value={content}
            style={inputStyle}
            required
          />
          <Button variant="contained" type="submit" style={btnStyle}>
            Add
          </Button>
        </form>
        {!loading && (
          <ul>
            {list.map((item) => (
              <li key={item.item_id}>
                <span>{item.content}</span>{" "}
                <DeleteIcon
                  onClick={() => handleDelete(item.item_id)}
                  style={{ cursor: "pointer" }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
