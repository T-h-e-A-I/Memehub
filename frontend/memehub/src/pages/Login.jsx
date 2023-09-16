import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function SimpleCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const checkCredentials = (email,pass)=>{
    fetch(`http://localhost:3000/login/${email}/${pass}`)
        .then((response) => response.json())
        .then((data) => {
          // Assuming the data is an array of meme objects
          if(data.length === 1){
            localStorage.setItem("userId", data[0].user_id);
            localStorage.setItem("isLoggedIn",1);
            setIsLoggedIn(true);
            navigate("/")
            window.location.reload();
            return 1;
          }
          else{
            setError("Email and password do not match.");
            return 0;
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
  };
  const handleSignIn = () => {
    // Implement your checking function here
    // For example, assuming checkCredentials returns 0 if no match
    const result = checkCredentials(email, password);
    if (result === 0) {
      setError("Email and password do not match.");
    } else {
      // Store user id in local storage
      localStorage.setItem("userId", result);

      // Clear any previous error
      setError("");
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Text color={"orange.400"}>features</Text> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            {error && <Text color="red">{error}</Text>}
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"orange.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={"orange.400"}
                color={"white"}
                _hover={{
                  bg: "orange.500",
                }}
                onClick={handleSignIn}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
