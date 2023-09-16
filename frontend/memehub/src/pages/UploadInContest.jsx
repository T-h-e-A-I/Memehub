import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  Stack,
  Textarea, // Import the Textarea component from Chakra UI
  Image, // Import the Image component from Chakra UI
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function ImageUploaderContest() {
const {contestId} = useParams();

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
      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        //console.log("Image uploaded successfully. Image URL:", data.imageUrl);
        setImage(data.imageUrl);
        console.log(data.imageUrl);
        fetch(`http://localhost:3000/uploadmemecontest/${caption}/${data.imageUrl}/${userId}/${contestId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        if(data.isSuccess){
          window.alert("Image uploaded successfully!");
        }
        console.log(data);
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
    console.log("caption: " + caption);
    console.log("image: " + image);
    
  };

  return (
    <Container maxW="xl">
      <Center mt={10}>
        <Stack spacing={4}>
          <Heading as="h2" size="lg">
            Upload an Image
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
          <Box>
            {/* Caption input */}
            <Textarea
              placeholder="Enter a caption..."
              value={caption}
              onChange={handleCaptionChange}
              rows={4}
            />
          </Box>
          <Button colorScheme="teal" onClick={handleUpload}>
            Upload
          </Button>
        </Stack>
      </Center>
    </Container>
  );
}

export default ImageUploaderContest;
