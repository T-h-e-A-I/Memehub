import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { SmallCloseIcon } from '@chakra-ui/icons';

export default function Settings() {
    const navigate = useNavigate();
  const dummyData = {
    userName: 'John Doe',
    email: 'johndoe@example.com',
    userBio: 'hello world',
    password: '******',
  };
  const userId = localStorage.getItem("userId");
  const deactivate = ()=>{
    fetch(`http://localhost:3000/deleteuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      navigate('/signup')
  }
  const [users,setUsers] = useState(dummyData)
  useEffect(() => {
    fetch(`http://localhost:3000/userinfoforedit/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data[0]);
        setUsers(data[0])
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editedField, setEditedField] = useState(null);
  const [userData, setUserData] = useState(dummyData);

  const handleEditClick = (field) => {
    setIsFormOpen(true);
    setEditedField(field);
    setUserData({
      ...dummyData,
      [field]: '', // Clear the specific field for editing
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormOpen(false); // Close the form after submission
    setEditedField(null);
    if(userData.userName != dummyData.userName){
        console.log("Name edited "+userData.userName);
        fetch(`http://localhost:3000/updatename/${userId}/${userData.userName}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      window.location.reload();
    }
    if(userData.userBio != dummyData.userBio){
        console.log("Bio "+userData.userBio);
        fetch(`http://localhost:3000/updatebio/${userId}/${userData.userBio}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      window.location.reload();
    }
    if(userData.email != dummyData.email){
        console.log("Email "+userData.email);
        fetch(`http://localhost:3000/updateemail/${userId}/${userData.email}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      window.location.reload();
    }
    if(userData.password != dummyData.password){
        fetch(`http://localhost:3000/updatepass/${userId}/${userData.password}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}>
        <Heading
          lineHeight={1.1}
          fontSize={{ base: '2xl', sm: '3xl' }}
          textAlign="center">
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Profile Picture</FormLabel>
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar size="xl" src={"/images/profile/"+users.image}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button as="a" href="/upload-dp" w="full">Change Profile Picture</Button>
            </Center>
          </Stack>
        </FormControl>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>User name</FormLabel>
              <HStack>
                <Input
                  value={editedField === 'userName' ? userData.userName : users.name}
                  isReadOnly={!isFormOpen || editedField !== 'userName'}
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  id="userName"
                  onChange={handleInputChange}
                />
                {!isFormOpen || editedField !== 'userName' ? (
                  <Button
                    onClick={() => handleEditClick('userName')}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Edit
                  </Button>
                ) : null}
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>User Bio</FormLabel>
              <HStack>
                <Input
                  value={editedField === 'userBio' ? userData.userBio : users.bio}
                  isReadOnly={!isFormOpen || editedField !== 'userBio'}
                  _placeholder={{ color: 'gray.500' }}
                  type="text"
                  id="userBio"
                  onChange={handleInputChange}
                />
                {!isFormOpen || editedField !== 'userBio' ? (
                  <Button
                    onClick={() => handleEditClick('userBio')}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Edit
                  </Button>
                ) : null}
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <HStack>
                <Input
                  value={editedField === 'email' ? userData.email : users.email}
                  isReadOnly={!isFormOpen || editedField !== 'email'}
                  _placeholder={{ color: 'gray.500' }}
                  type="email"
                  id="email"
                  onChange={handleInputChange}
                />
                {!isFormOpen || editedField !== 'email' ? (
                  <Button
                    onClick={() => handleEditClick('email')}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Edit
                  </Button>
                ) : null}
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <HStack>
                <Input
                  value={editedField === 'password' ? userData.password : dummyData.password}
                  isReadOnly={!isFormOpen || editedField !== 'password'}
                  _placeholder={{ color: 'gray.500' }}
                  type="password"
                  id="password"
                  onChange={handleInputChange}
                />
                {!isFormOpen || editedField !== 'password' ? (
                  <Button
                    onClick={() => handleEditClick('password')}
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Edit
                  </Button>
                ) : null}
              </HStack>
            </FormControl>
            {isFormOpen && (
              <HStack spacing={4}>
                <Button
                  type="submit"
                  bg={'blue.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Submit
                </Button>
                <Button
                  onClick={() => setIsFormOpen(false)}
                  bg={'red.400'}
                  color={'white'}
                  w="full"
                  _hover={{
                    bg: 'red.500',
                  }}>
                  Cancel
                </Button>
              </HStack>
            )}
          </Stack>
        </form>
        <Button onClick={()=>deactivate()}>Deactivate</Button>
      </Stack>
    </Flex>

  );
}
