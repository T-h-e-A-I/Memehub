import React from "react";
import { Box, Text, Flex, Button,Avatar } from "@chakra-ui/react";

function Banner({
  image,
  contestName,
  contestId,
  hostName,
  sponsorName,
  prizeMoney,
  startTime,
  endTime,
  hostPic,
  registrationFee,
  hostId,
}) {
  const backgroundImageStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${"/images/sponsor/"+image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const adress = "/contest/"+contestId;
  const userId = localStorage.getItem("userId");
  const deleteContest = ()=>{
    fetch(`http://localhost:3000/deletecontest/${contestId}`)
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
        Meme Contest: {contestName}
      </Text>
      <Flex justifyContent="space-between" mt="10px">
        <Text fontSize="md">Organized by: {hostName}</Text>
        <Avatar
                src={"/images/profile/"+hostPic}
                name={hostName}
                mr={2}
              />
        <Text fontSize="md">Sponsored by: {sponsorName}</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="5px">
        <Text fontSize="md">Prize Money: {prizeMoney}</Text>
        <Text fontSize="md">Registration Fee: {registrationFee}</Text>
      </Flex>
      <Flex justifyContent="space-between" mt="5px">
        <Text fontSize="md">Start Time: {startTime}</Text>
        <Text fontSize="md">End Time: {endTime}</Text>
      </Flex>
      <Button
      as="a"
      href={`/contest/rank/${contestId}`}
        position="absolute"
        bottom="10px"
        right="10px"
        bg="orange.500"
        color="white"
        _hover={{ bg: "orange.600" }}
      >
        Rank
      </Button>
      {hostId == userId?
      <Button
        position="absolute"
        bottom="10px"
        right="90px"
        bg="orange.500"
        color="white"
        _hover={{ bg: "orange.600" }}
        onClick={()=>deleteContest()}
      >
        Delete
      </Button>:<></>
}
    </Box>
  );
}

export default Banner;
