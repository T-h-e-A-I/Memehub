import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // State for email
  const [username, setUsername] = useState(""); // State for username
  const [isEmailUnique, setIsEmailUnique] = useState(true);
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [isEmailCorrect,setIsEmailCorrect] = useState(true);
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const checkEmailUnique = async (email) => {
    try {
      const response = await fetch(`http://localhost:3000/isUniqueMail/${email}`);
      const data = await response.json();
  
      // Assuming the data is an array of meme objects
      console.log(data);
  
      if (data.isUniqueMail) {
        setIsEmailUnique(true);
        return true;
      } else {
        setIsEmailUnique(false);
        return false;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return false; // Handle the error and return false
    }
  };
  
  const checkUsernameUnique = async (username) => {
    try {
      const response = await fetch(`http://localhost:3000/isUniqueName/${username}`);
      const data = await response.json();
  
      // Assuming the data is an array of meme objects
      console.log(data);
  
      if (data.isUniqueName) {
        setIsUsernameUnique(true);
        return true;
      } else {
        setIsUsernameUnique(false);
        return false;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return false; // Handle the error and return false
    }
  };
  
  function isEmailMatchingPattern(email) {
    // Define a regular expression pattern to match the desired format
    const pattern = /@.+\.com$/i; // The "i" flag makes the pattern case-insensitive
    if(pattern.test(email)){
      setIsEmailCorrect(true);
    }
    else{
      setIsEmailCorrect(false);
    }
    // Use the test method to check if the email matches the pattern
    return pattern.test(email);
  }
  const handleSignUp = async () => {
    try {
      const isEmailUniqueResult = await checkEmailUnique(email);
      const isUsernameUniqueResult = await checkUsernameUnique(username);
  
      const isEmailCorrectResult = isEmailMatchingPattern(email);
  
      if (!isEmailUniqueResult || !isUsernameUniqueResult || !isEmailCorrectResult) {
        console.log("Don't Proceed");
        return; // Don't proceed if fields are not unique
      }
  
      // Proceed with signup logic
      fetch(`http://localhost:3000/insertUser/${email}/${username}/${password}/`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    } catch (error) {
      console.error('Error:', error);
    }
    navigate("/login");
  };

  return (
    <Flex
      minH={"100vh"}
      maxW={"100vw"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          maxW={"2xl"}
        >
          <Stack spacing={4}>
            <Box>
              <FormControl id="firstName" isRequired>
                <FormLabel>User Name</FormLabel>
                <InputGroup>
                <Input
                  type="text"
                  size="xl"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                
                </InputGroup>
                {!isUsernameUnique && <Text color="red">Username is not unique</Text>}
              </FormControl>
            </Box>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <InputGroup>
              <Input
                type="email"
                size="xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              
              </InputGroup>
              {!isEmailUnique && <Text color="red">Email is not unique</Text>}
              {!isEmailCorrect && <Text color="red">Email is not correct</Text>}
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} size="xl" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
                {/* ... */}
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                width={"300px"}
                bg={"orange"}
                color={"white"}
                _hover={{
                  bg: "orange.500",
                }}
                onClick={handleSignUp}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user? <Link color={"orange"} href="/login">Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
