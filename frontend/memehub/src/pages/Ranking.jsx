import React from "react";
import { Box, Text, Flex, Avatar, Divider } from "@chakra-ui/react";
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

function RankPage() {
  const {contestId} = useParams();
  const [rank,setRank] = useState(rankData);
  // Step 4: Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/contests/rank/${contestId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setRank(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  console.log(rank);
  return (
    <Box p={8}>
      
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Rankings
      </Text>
      {rank.map((user,index) => (
        <>
        <Divider></Divider>
        <Flex key={index} alignItems="center" mb={4}>
          <Text fontWeight="bold" mr={4}>
            {index+1}.
          </Text>
          <Avatar src={"/images/profile/"+user.user_src} size="md" mr={4} />
          <Flex flexDirection="column">
            <Text as="a" href={"/users/"+user.memer_id} fontSize="lg">{user.user_name}</Text>
            <Text color="gray.500">Total Upvotes: {user.upvote_count}</Text>
            <Text color="gray.500">Total Post: {user.post_count}</Text>
            <Text color="gray.500">Total Comment: {user.comment_count}</Text>
            <Text color="gray.500">Score: {user.scoring}</Text>
          </Flex>
        </Flex>
        </>
      ))}
      
    </Box>
  );
}

export default RankPage;
