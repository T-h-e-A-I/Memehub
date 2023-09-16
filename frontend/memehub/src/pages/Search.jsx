import React, { useState } from "react";
import { Input, Button, Flex, Icon, Box,Text,Avatar } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles,setProfiles] = useState([]);
  const [contests,setContests] = useState([]);
  const [communities,setCommunities] = useState([]);
  const handleSearch = () => {
    // Perform the search logic here
    console.log("Performing search for:", searchQuery);
    fetch(`http://localhost:3000/searchprofile/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setProfiles(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/searchcontest/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setContests(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/searchcommunity/${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setCommunities(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <Box p={4} bg="gray.100">
      <Flex align="center" justify="space-between">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter your search query"
          size="lg"
          width="90%"
        />
        <Button
            size="lg"
          leftIcon={<Icon as={FaSearch} />}
          colorScheme="teal"
          onClick={handleSearch}
        >
          Search
        </Button>
        </Flex> 
        
        <Box p={8}>
        <Text fontSize={"18px"} mb={4} mr={4}>Profile</Text>
      {profiles.map((user,index) => (
        <Flex as="a" href={"/users/"+user.id} key={index} alignItems="center" mb={4}>
          <Avatar src={"/images/profile/"+user.image} size="md" mr={4} />
          <Flex flexDirection="column">
            <Text fontSize="lg">{user.name}</Text>
          </Flex>
        </Flex>
      ))}
    </Box>
    <Box p={8}>
        <Text fontSize={"18px"} mb={4} mr={4}>Contest</Text>
      {contests.map((user,index) => (
        <Flex as="a" href={"/contest/"+user.id} key={index} alignItems="center" mb={4}>
          <Avatar src={"/images/sponsor/"+user.image} size="md" mr={4} />
          <Flex flexDirection="column">
            <Text fontSize="lg">{user.name}</Text>
          </Flex>
        </Flex>
      ))}
    </Box>
    <Box p={8}>
        <Text fontSize={"18px"} mb={4} mr={4}>Community</Text>
      {communities.map((user,index) => (
        <Flex as="a" href={"/communities/"+user.id} key={index} alignItems="center" mb={4}>
          <Avatar src={"/images/community/"+user.image} size="md" mr={4} />
          <Flex flexDirection="column">
            <Text fontSize="lg">{user.name}</Text>
          </Flex>
        </Flex>
      ))}
    </Box>
    </Box>
  );
}

export default SearchPage;
