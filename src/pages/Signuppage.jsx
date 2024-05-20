import  { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const Signuppage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://skyserve-backend-1iio.onrender.com/users/register",
        {
          username,
          email,
          password,
        }
      );
      console.log("Signup Successful", response.data);
      setUsername("");
      setEmail("");
      setPassword("");
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Signup Failed", error);
      setIsErrorModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsSuccessModalOpen(false);
    navigate("/");
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
      backgroundColor="green"
    >
      <Box
        backgroundColor="white"
        w="30%"
        h="500px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        p={"20px 20px 20px 20px"}
        borderRadius="10px"
        boxShadow="1px 7px 9px 1px"
      >
        <form onSubmit={handleSubmit}>
          <Heading>Signup</Heading>
          <FormControl>
            <FormLabel mt={"10px"}>Username:</FormLabel>
            <Input
              mt={"10px"}
              type="text"
              bg={"white"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel mt={"10px"}>Email address:</FormLabel>
            <Input
              mt={"10px"}
              type="email"
              bg={"white"}
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
          <Button type="submit" mt={"40px"} w="100%" bg="#2c96dc">
            Signup
          </Button>
        </form>
      </Box>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>User registered successfully.</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleModalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Error Modal */}
      <Modal isOpen={isErrorModalOpen} onClose={handleCloseErrorModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            User already exists. Please login with another account.
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              bg="#2e94b9"
              onClick={handleCloseErrorModal}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Signuppage;
