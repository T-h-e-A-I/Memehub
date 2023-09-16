import React from "react";
import {
  Box,
  Flex,
  Image,
  IconButton,
  Avatar,
  Text,
  HStack,
  Input,
  Button
} from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

function MemeCard({
  id,
  imageUrl,
  caption,
  user_name,
  user_src,
  upvotes,
  downvotes,
  postedTime,
  location,
  user_id,
}) {
  const address = "/meme/" + id;
  const userId = localStorage.getItem("userId");
  const [isLiked,setIsLiked] = useState(false);
  const [upvoteCount,setUpvoteCount] = useState(upvotes); 
  const [editState,setEditState] = useState(false);
  const [editedCaptionText,setEditedCaptionText] = useState("");
  const toggleUp = async () => {
      const response = await fetch(`http://localhost:3000/upvote/${id}/${userId}`);
      console.log(response.data);
      if(response.ok) setUpvoteCount(upvoteCount + 1);
  };
  const deletePost = ()=>{
    fetch(`http://localhost:3000/deletepost/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  const toggleDown = () => {
    fetch(`http://localhost:3000/downvote/${id}/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data)
        if(data.isSuccessDown == 1) setUpvoteCount(upvoteCount - 1);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    
  };
  const editPost = ()=>{
      setEditState(true);
  }
  const handleCancelEditClick = ()=>{
    setEditState(false);
    setEditedCaptionText("");
  }
  const handleUpdateCaption = ()=>{
    console.log(editedCaptionText);
    fetch(`http://localhost:3000/updatecaption/${id}/${editedCaptionText}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      setEditedCaptionText("");
      setEditState(false);
  }
  useEffect(() => {
    fetch(`http://localhost:3000/isliked/${id}/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data)
        console.log( " " + userId+" "+id);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  return (
    <Box
      bg="white"
      marginLeft={"20%"}
      marginRight={"50xpx"}
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      p="20px"
      borderRadius="8px"
      maxW={"600px"} // Card takes up all available space
    >
      {/* User Info */}
      
      <Flex alignItems="center" mb="10px">
        <Avatar src={user_src} name={user_name} size="md" mr="10px" />
        <Text as="a" href={`/users/${user_id}`} fontSize="sm">{user_name}</Text>
        {userId == user_id? <><IconButton ml={"68%"}icon={<FaTrash/>} colorScheme={"orange"} onClick={()=>deletePost()}></IconButton><IconButton ml={"2%"} icon={<FaEdit/>} colorScheme={"orange"} onClick={()=>editPost()}></IconButton></>:<></>}
      </Flex>
      {/* Image */}
      <a href={address}>
        <Image src={imageUrl} alt="Meme" maxWidth="100%" height="auto" />
      </a>
      {/* Votes and Caption */}
      <Flex alignItems="center" justifyContent="space-between" mt="10px">
        <HStack>

    
    <IconButton
      aria-label="Upvote"
      icon={<FaArrowUp />}
      size="sm"
      colorScheme="blue"
      onClick={()=>toggleUp()}
    />
    <Text>{upvoteCount}</Text>
    <IconButton
      aria-label="Downvote"
      icon={<FaArrowDown />}
      size="sm"
      colorScheme="red"
      onClick={()=>toggleDown()}
    />
  
          
          
          <Text>{downvotes}</Text>
        </HStack>
        {editState?(
        <Flex align="center">
              <Input
                value={editedCaptionText}
                onChange={(e) => setEditedCaptionText(e.target.value)}
                mr={2}
              />
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleUpdateCaption()}
              >
                Update
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                onClick={handleCancelEditClick}
              >
                Cancel
              </Button>
            </Flex>):(
        <Text textAlign="center" fontSize="md">
          {caption}
        </Text>)}
      </Flex>
      {/* Posted Time and Location */}
      <Flex justifyContent="space-between" mt="10px">
        <Text fontSize="sm" color="gray.500">
          Posted at: {postedTime}
        </Text>
        
      </Flex>
    </Box>
  );
}

export default MemeCard;
