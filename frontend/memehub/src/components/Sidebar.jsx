import React from "react";
import { VStack, Box, Text, Flex } from "@chakra-ui/react";

function Sidebar() {
  return (
    <Box
      w="20%"
      left="0"
      top="64px"
      height="100%"
      position="fixed"
      padding={"50px"}
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      display="flex"
      alignItems="center" // Center the content vertically
      justifyContent="flex-start" // Align the content to the left
      zIndex={"1"}
    >
      <VStack spacing="20px" align="flex-start">
        {" "}
        {/* Align text content to the left */}
        <Text as="a" href="/sponsor-registration" fontSize={"lg"}>Register as a Sponsor</Text>
        <Text as="a" href="/community-registration" fontSize="lg">Create a Community</Text>
        <Text as="a" href="/contest-registration" fontSize="lg">Start a Contest</Text>
        <Text as="a" href="/upload"fontSize="lg">Upload a Meme</Text>
        <Text as="a" href="/upload-template"fontSize="lg">Upload a Template</Text>
      </VStack>
    </Box>
  );
}

export default Sidebar;
