import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  Stack,
  FormLabel, // Import the Textarea component from Chakra UI
  Image, // Import the Image component from Chakra UI
} from "@chakra-ui/react";

function DpUploader() {
  const userId = localStorage.getItem("userId");
  const [selectedFile, setSelectedFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [image,setImage] = useState(""); // State for the caption

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  // Function to handle caption input
  const handleCaptionChange = (event) => {
    const text = event.target.value;
    setCaption(text);
    //console.log(caption);
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("caption", caption); // Include the caption in the FormData

    try {
      const response = await fetch("http://localhost:3000/uploaddp", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        //console.log("Image uploaded successfully. Image URL:", data.imageUrl);
        fetch(`http://localhost:3000/updatepic/${userId}/${data.imageUrl}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data.isSuccess){
          window.alert("Dp Uploaded Successfully");
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
        // You can now use the imageURL as needed in your application.
      } else {
        console.error("Image upload failed.");
      }
    } catch (error) {
      console.error("Error while uploading the image:", error);
    }
    window.location.reload();
    
  };

  return (
    <Container maxW="xl">
      <Center mt={10}>
      
        <Stack spacing={4}>
        <Box
          p={6}
          borderRadius="lg"
          boxShadow="md"
          mb={4}
          width="100%" // Ensure the box takes the full width
        >
          <Heading as="h6" size="lg" m={4}>
            Upload a Profile Photo
          </Heading>
          <Box>
            {/* Image preview */}
            {selectedFile && (
              <Image
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                maxH="200px"
                mb={4}
              />
            )}
            {/* File input */}
            <Input type="file" onChange={handleFileSelect} />
          </Box>
          
          <Button colorScheme="teal" onClick={handleUpload} w={"100%"} m={4}>
            Upload
          </Button>
          </Box>
        </Stack>
      </Center>
    </Container>
  );
}

export default DpUploader;
