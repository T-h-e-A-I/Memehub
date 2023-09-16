import React from 'react'
import Banner from '../components/ContestBanner'
import MemeCard from '../components/Memecard'
import {Box,VStack} from "@chakra-ui/react"
import { useState,useEffect } from 'react'
import CommunityBanner from '../components/CommunityBanner'

const Community = () => {
  const [communities, setCommunities] = useState([{},{},{}]);

  // Step 4: Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/community')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setCommunities(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  console.log(communities[0]);
  console.log("/images/community/" + communities[0].community_image);
  return (
    <Box>
    <VStack p="20px" spacing="20px">
        {communities.map((item) => (
          <CommunityBanner
            communityId={item.community_id}
            communityName={item.community_name}
            image={"/images/community/" + item.community_image}
            adminName={item.admin_name}
            adminImage={item.admin_image}
            adminId={item.admin_id}
          >

          </CommunityBanner>
        ))}

        {/* Add more MemeCard components as needed */}
      </VStack>
    </Box>
  )
}

export default Community;