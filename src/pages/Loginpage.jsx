import  { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Box,
  Heading,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Loginpage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://skyserve-backend-1iio.onrender.com/users/login",
        {
          email,
          password,
        }
      );
      console.log(response);
      if (response && response.data && response.data.token) {
        console.log(response.data);
        setIsSuccessModalOpen(true);
        setModalMessage("Login successful!");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
      } else {
        setIsErrorModalOpen(true);
        setModalMessage(
          "Login failed. Please make sure your email and password are correct."
        );
      }
    } catch (error) {
      console.error("Login Failed", error);
      setIsErrorModalOpen(true);
      setModalMessage(
        "Login failed. Please make sure your email and password are correct. If you haven't registered yet, please register yourself."
      );
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    navigate("/mapcomponent");
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <Box
      w="100%"
      h="640px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      backgroundColor="#acdcee"
    >
      <Box
        backgroundColor="white"
        w="30%"
        h="400px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        p={"20px 20px 20px 20px"}
        borderRadius="10px"
        boxShadow="1px 7px 9px 1px"
      >
        <form onSubmit={handleSubmit}>
          <Heading>Login</Heading>
          <FormControl>
            <FormLabel mt={"10px"}>Email address:</FormLabel>
            <Input
              bg={"white"}
              mt={"10px"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={"10px"}>Password:</FormLabel>
            <Input
              bg={"white"}
              mt={"10px"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <p
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
              gap: "5px",
            }}
          >
            Not Registered?{" "}
            <span style={{ color: "#2e94b9" }}>
              <Link to="/signup">Signup</Link>
            </span>
          </p>
          <Button type="submit" mt={"40px"} w="100%" bg="#2e94b9">
            Login
          </Button>
        </form>
      </Box>

      <Modal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isErrorModalOpen} onClose={handleCloseErrorModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{modalMessage}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseErrorModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Loginpage;
