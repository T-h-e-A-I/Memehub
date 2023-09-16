import React, { useState,useEffect } from "react";
import {
  VStack,
  Box,
  Text,
  Avatar,
  Link,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";

function NotificationList() {
  // Sample notification data
  const notifications = [
    {
      id: 1,
      text: "You have a new message from John Doe.",
      avatarSrc: "https://via.placeholder.com/40", // Replace with image URL
    },
    {
      id: 2,
      text: "You have a new friend request from Jane Smith.",
      avatarSrc: "https://via.placeholder.com/40", // Replace with image URL
    },
    // Add more notifications as needed
  ];
  const [notification,setNotification] = useState(notifications);
  const userId = localStorage.getItem("userId");
  const changeState = ()=>{
    setIsViewed(true);
  }
  useEffect(() => {
    fetch(`http://localhost:3000/notifications/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setNotification(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  const [isViewed,setIsViewed] = useState(false);

  return (
    <VStack align="stretch" spacing={2} mt={4}>
      {notification.map((notification) => (
        (notification.type == "comment")?(
        <Box
        bg={isViewed?"white":useColorModeValue("gray.100", "gray.900")}
          key={notification.id}
          p={3}
          borderWidth={1}
          borderRadius="md"
          onClick={()=>changeState()}
        >
            <HStack>
            <Avatar
            src={"/images/profile/" + notification.image}
            size="sm"
            name="User Avatar"
          />
          <Text><strong><Link  href={"/users/"+notification.notified_by} >{notification.name}</Link></strong> commented on your <strong><Link   href={"/meme/"+notification.post} >post</Link></strong></Text>
          </HStack>
        </Box>
      ):(notification.type == "up_vote")?(<>
      <Box
          bg={isViewed?"white":useColorModeValue("gray.100", "gray.900")}
          key={notification.id}
          p={3}
          borderWidth={1}
          borderRadius="md"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          onClick={()=>changeState()}

        >
            <HStack>
            <Avatar
            src={"/images/profile/" + notification.image}
            size="sm"
            name="User Avatar"
          />
          <Text><strong><Link   href={"/users/"+notification.notified_by}>{notification.name}</Link></strong> upvoted your <strong><Link  href={"/meme/"+notification.post} >post</Link></strong></Text>
          </HStack>
        </Box></>):(<>
            <Box
            bg={isViewed?"white":useColorModeValue("gray.100", "gray.900")}
          key={notification.id}
          p={3}
          borderWidth={1}
          borderRadius="md"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          onClick={()=>changeState()} 

        >
            <HStack>
            <Avatar
            src={"/images/profile/" + notification.image}
            size="sm"
            name="User Avatar"
          />
          <Text><strong><Link href={"/users/"+notification.notified_by} >{notification.name}</Link></strong> followed you</Text>
          </HStack>
        </Box></>)
      ))}
    </VStack>
  );
}

export default NotificationList;
