import React from "react";
import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Container,
  Flex,
  Box,
  Image,
  Avatar,
  Text,
  Divider,
  Input,
  Button,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { FaEdit,FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom"; 
import { useState,useEffect } from "react";


function MemePage() {
  const { memeId } = useParams();
  const userId = localStorage.getItem("userId");
  const [userInfo,setUserInfo] = useState({user_name: "Alice",profile:""});
  const [memeinfo, setMemeinfo] = useState([{imageUrl: '40.jpg', caption: null, user_name: 'awesh', user_src: '2.jpeg'}]);
  const [memecomment, setMemecomment] = useState([
    { username: "Alice", comment: "Haha, that's so true!",profile:"",id:"1" },
    { username: "Bob", comment: "LOL, great meme!",profile:"",id:"" },
  ]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  // Function to handle the "Edit" button click
  const handleEditCommentClick = (commentId, initialText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(initialText);
  };


  // Function to handle the cancel button click
  const handleCancelEditClick = () => {
    setEditingCommentId(null);
    setEditedCommentText("");
  };
  const handleUpdateComment = (commentId) => {
    // Print the updated comment text to the console
    console.log("Updated Comment:", editedCommentText);
    fetch(`http://localhost:3000/updatecomment/${commentId}/${editedCommentText}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      window.location.reload();
    // Reset the editingCommentId and editedCommentText states
    setEditingCommentId(null);
    setEditedCommentText("");
  };
  // Step 4: Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/memeinfo/${memeId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setMemeinfo(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  useEffect(() => {
    fetch(`http://localhost:3000/memecomment/${memeId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setMemecomment(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/userinfo/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setUserInfo(data[0]);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  
  console.log(memecomment);
  const memeImageUrl = memeinfo? "/images/memes/"+memeinfo[0].imageUrl:null;
  console.log(memeImageUrl);
  const handleDeleteComment = (commentId)=>{
    fetch(`http://localhost:3000/deletecomment/${commentId}`)
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
  const handleCommentSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Get the input element by its ID (you can add an ID to the input element)
    const commentInput = document.getElementById("comment-input");

    // Get the value entered in the input field
    const commentText = commentInput.value;

    // Log the comment text to the console
    console.log("Comment:", commentText);
    setMemecomment([...memecomment, { username: userInfo.user_name, comment: commentText, profile: userInfo.user_image }]);

    // Clear the input field and reset newComment state
    document.getElementById("comment-input").value = "";
    setNewComment("");
    // Define the data to send in the request body
    fetch(`http://localhost:3000/postcomment/${memeId}/${userId}/${commentText}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      window.location.reload();

  };

  const memePoster = {
    username: memeinfo[0].user_name,
    profilePicture: "/images/profile/"+memeinfo[0].user_src,
  };

  const memeCaption = memeinfo[0].caption;

  

  return (
    <ChakraProvider>
      <CSSReset />
      <Container maxW="container.lg" py={8}>
        <Flex>
          {/* Meme Image */}
          <Image
            src={memeImageUrl}
            alt="Meme"
            boxSize="50%"
            objectFit="cover"
            mr={4}
          />

          {/* Comment Section */}
          <Box flex="1">
            {/* Meme Poster */}
            <Flex align="center" mb={4}>
              <Avatar
                src={memePoster.profilePicture}
                name={memePoster.username}
                mr={2}
              />
              <Text fontWeight="bold">{memePoster.username}</Text>
            </Flex>

            {/* Meme Caption */}
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              {memeCaption}
            </Text>

            {/* Comments */}
            {memecomment.map((comment, index) => (
              
              <HStack
                key={index}
                p={2}
                borderBottom="1px solid"
                borderColor="gray.300"
              >
                <Avatar
                src={"/images/profile/"+comment.profile}
                name={comment.username}
                mr={2}
              />
               {editingCommentId === comment.id ? (
            // Render the edit form when editingCommentId matches the comment's id
            <Flex align="center">
              <Input
                value={editedCommentText}
                onChange={(e) => setEditedCommentText(e.target.value)}
                mr={2}
              />
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleUpdateComment(comment.id)}
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
            </Flex>
          ) :(
                <>
                <Text>
                  <strong>{comment.username}:</strong> {comment.comment}
                </Text>
                {comment.username === userInfo.user_name && (
                  <Flex ml="auto">
                    <IconButton
                      aria-label="Edit Comment"
                      icon={<FaEdit />}
                      size="sm"
                      colorScheme="blue"
                      mr={2}
                      onClick={() => handleEditCommentClick(comment.id,comment.comment)}
                    />
                    <IconButton
                      aria-label="Delete Comment"
                      icon={<FaTrash />}
                      size="sm"
                      colorScheme="red"
                      onClick={() => handleDeleteComment(comment.id)}
                    />
                  </Flex>
                

                )}
                </>)}
              </HStack>

            ))}

            {/* Comment Form */}
            <VStack mt={4} align="stretch">
              <Input id="comment-input" placeholder="Add a comment..." />
              <Button colorScheme="teal" onClick={handleCommentSubmit}>Post Comment</Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </ChakraProvider>
  );
}

export default MemePage;
