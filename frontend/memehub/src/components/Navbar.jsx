import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Image,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { FaBell } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

const Links = [{name:"Contests",link:"/contest"}, {name:"Communitites",link:"/communities"}, {name:"Meme Generator",link:"/meme-generator"}, {name:"Search",link:"/search"}];

const NavLink = (props) => {
  
  const { children } = props;
  
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

const Navbar = ()=> {
  const navigate = useNavigate()
  const userId = localStorage.getItem("userId");
  console.log(userId);
  const openNotification = ()=>{
    navigate("/notifications");
  }
  const handleLogout = ()=>{
    localStorage.setItem("userId", 0);
    localStorage.setItem("isLoggedIn",0);
    navigate("/signup")
    window.location.reload();
  }
  const goToProfile = ()=>{
      navigate(`/users/${userId}`);
      window.location.reload();
  }
  const [image,setImage] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    fetch(`http://localhost:3000/profilepicture/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        if(data.length === 1){
        setImage("/images/profile/"+data[0].user_image);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  return (
    <>
      <Box
        width={"100%"}
        bg={useColorModeValue("gray.100", "gray.900")}
        position={"fixed"}
        top={"0"}
        left={"0"}  
        zIndex={"1000"}   
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <a href="/">
              <Image src="/images/logo.png" alt="logo" width="50" height="50" />
            </a>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Text as="a" textDecoration={"none"}
                key={link.name} href={link.link} mx={"1"} >
                    {link.name}
                </Text>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <IconButton icon={<FaBell/>} margin={"5px"} onClick={()=>openNotification()}></IconButton>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={image}
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={()=>goToProfile()}>Profile</MenuItem>
                <MenuItem as={"a"} href="/settings">Settings</MenuItem>
                <MenuItem as={"a"} href="/stats">Statistics</MenuItem>
                <MenuDivider />
                <MenuItem onClick={()=>handleLogout()}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
      <Box height={"64px"}/>
    </>
  );
}
export default Navbar;