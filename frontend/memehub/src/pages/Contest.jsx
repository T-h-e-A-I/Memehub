import React from 'react'
import Banner from '../components/ContestBanner'
import MemeCard from '../components/Memecard'
import {Box,VStack} from "@chakra-ui/react"
import { useState,useEffect } from 'react'
function formatDateToDateTime(dateString) {
  const dateObject = new Date(dateString);

  // Get the date and time components
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based, so we add 1
  const day = dateObject.getDate().toString().padStart(2, '0');
  const hours = dateObject.getUTCHours().toString().padStart(2, '0');
  const minutes = dateObject.getUTCMinutes().toString().padStart(2, '0');
  const seconds = dateObject.getUTCSeconds().toString().padStart(2, '0');

  // Format as 'YYYY-MM-DD HH:MM:SS'
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
const Contest = () => {
  const [contests, setContests] = useState([{},{},{}]);
  const userId = localStorage.getItem("userId");
  // Step 4: Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/contests')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setContests(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  console.log(contests[0]);
  return (
    <Box>
    <VStack p="20px" spacing="20px">
        {contests.map((item) => (
          <Banner
          contestId={item.contest_id} 
          contestName={item.contest_name}
          image={item.sponsor_image}
          prizeMoney={item.prize_money}
          startTime={formatDateToDateTime(item.start_time)}
          endTime={formatDateToDateTime(item.end_time)}
          hostName={item.user}
          registrationFee={item.reg_fee}
          sponsorName={item.sponsor_name}
          hostPic={item.user_pic}
          hostId={item.host_id}
          ></Banner>
        ))}

        {/* Add more MemeCard components as needed */}
      </VStack>
    </Box>
  )
}

export default Contest