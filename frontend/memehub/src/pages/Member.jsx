import React from "react";
import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

const rankData = [
  {
    id: 1,
    user_name: "User 1",
    user_src: "/images/profiles/avatar3.jpg",
    upvote_count: 400,
  },
  {
    id: 2,
    user_name: "User 2",
    user_src: "/images/profiles/avatar3.jpg",
    upvote_count: 400,
  },
  {
    id: 3,
    user_name: "User 3",
    user_src: "/images/profiles/avatar3.jpg",
    upvote_count: 400,
  },
  // Add more users and their data here
];

function Members() {
  const {communityId} = useParams();
  const [member,setMember] = useState(rankData);
  // Step 4: Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/community/member/${communityId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setMember(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  console.log(member);
  return (
    <Box p={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Rankings
      </Text>
      {member.map((user,index) => (
        <Flex key={index} alignItems="center" mb={4}>
          <Text fontWeight="bold" mr={4}>
            {index+1}.
          </Text>
          <Avatar src={"/images/profile/"+user.user_src} size="md" mr={4} />
          <Flex flexDirection="column">
            <Text fontSize="lg">{user.user_name}</Text>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
}

export default Members;
