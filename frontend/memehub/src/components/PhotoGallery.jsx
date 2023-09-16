import React, { useState } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";

function PhotoGallery({ photos,setPictures }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
    localStorage.setItem("selected_photo", JSON.stringify(photo));
  };

  return (
    <Flex flexWrap="wrap">
      {photos.map((photo, index) => (
        <Box
          key={index}
          width="100px"
          height="100px"
          m="10px"
          bg={selectedPhoto === photo ? "blue" : "gray"}
          border={selectedPhoto === photo ? "3px solid black" : ""} // Highlight selected photo
          onClick={() => {handlePhotoClick(photo);setPictures()}}
          
        >
          <Image
            src={photo}
            alt={`Photo ${index}`}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>
      ))}
    </Flex>
  );
}

export default PhotoGallery;
