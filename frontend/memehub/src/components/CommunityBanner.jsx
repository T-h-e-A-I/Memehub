import React from "react";
import { Box, Text, Flex, Button,Avatar } from "@chakra-ui/react";

function CommunityBanner({
  image,
  communityName,
  communityId,
  adminName,
  adminImage,
  adminId,
}) {
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const adress = "/communities/"+communityId;
  const userId = localStorage.getItem("userId");
 const deleteCommunity = ()=>{
  fetch(`http://localhost:3000/deletecommunity/${communityId}`)
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
  return (
    <Box
    as="a"
    href={adress}
      bgGradient="linear(to-r, #FF0080, #7928CA)"
      color="white"
      p="20px"
      width="80%"
      margin={"auto"}
      my={"10px"}
      borderRadius={"10px"}
      height="35vh" // 20% of the viewport height
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      position="relative"
      style={backgroundImageStyle}
    >
      <Text fontSize="xl" fontWeight="bold">
        Meme Contest: {communityName}
      </Text>
      <Flex justifyContent="space-between" mt="10px">
        <Text fontSize="md">Admin: {adminName}</Text>
        <Avatar
                src={"/images/profile/"+adminImage}
                name={adminName}
                mr={2}
              />
      </Flex>
      
      <Button
      as="a"
      href={`/communities/member/${communityId}`}
        position="absolute"
        bottom="10px"
        right="10px"
        bg="orange.500"
        color="white"
        _hover={{ bg: "orange.600" }}
      >
        Members
      </Button>
      {adminId == userId?
      <Button
        position="absolute"
        bottom="10px"
        right="115px"
        bg="orange.500"
        color="white"
        _hover={{ bg: "orange.600" }}
        onClick={()=>deleteCommunity()}
      >
        Delete
      </Button>:<></>
}
    </Box>
  );
}

export default CommunityBanner;
