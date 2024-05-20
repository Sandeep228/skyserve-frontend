import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://skyserve-backend-1iio.onrender.com/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#c10808",
      }}
    >
      <h1
        style={{
          color: "white",
          fontWeight: "600",
          fontSize: "60px",
        }}
      >
        GeoLocator
      </h1>
      {isLoggedIn && (
        <div style={{ marginLeft: "65%" }}>
          <Button
            borderRadius="10px"
            backgroundColor="green"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
