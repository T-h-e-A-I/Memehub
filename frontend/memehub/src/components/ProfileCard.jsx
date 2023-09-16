import React from "react";
import { Box, Flex, Avatar, Text } from "@chakra-ui/react";

function ProfileCard({ user }) {
  console.log(user);
  return (
    <Box
      bg="white"
      boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      p="20px"
      borderRadius="8px"
      width="100%"
    >
      <Flex alignItems="center">
        <Avatar
          src={"/images/profile/"+user.user_image}
          name={user.user_name}
          size="lg"
          mr="10px"
        />
        <Box>
          <Text fontSize="xl" fontWeight="bold">
            {user.user_name}
          </Text>
          <Text fontSize="md">{user.user_bio}</Text>
        </Box>
      </Flex>
      <Flex justifyContent="space-between" mt="10px">
      </Flex>
    </Box>
  );
}

export default ProfileCard;
