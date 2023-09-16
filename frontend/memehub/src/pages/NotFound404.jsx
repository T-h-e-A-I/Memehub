import React from "react";
import { Box, Text, Icon, VStack } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";

function NotFound404() {
  return (
    <Box
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
    >
      <VStack spacing={4}>
        <Text fontSize="6xl" fontWeight="bold" color="red.500">
          404
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          Page Not Found
        </Text>
        <Icon as={FaTimes} boxSize={12} color="red.500" />
        <Text fontSize="lg" color="gray.600">
          The page you are looking for might be under construction or does not
          exist.
        </Text>
        {/* You can add more design elements here */}
      </VStack>
    </Box>
  );
}

export default NotFound404;
