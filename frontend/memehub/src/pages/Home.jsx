import Sidebar from "../components/Sidebar"
import MemeCard from "../components/Memecard";
import { VStack } from "@chakra-ui/react";
import { useState,useEffect } from "react";
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
const Home = () => {
  const [memes, setMemes] = useState([]);
  const userId = localStorage.getItem("userId");
  // Step 4: Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/memes/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setMemes(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  return (
    <>
      <Sidebar />
      <VStack p="20px" spacing="20px">
        {memes.map((meme) => (
          <MemeCard
          key={meme.id}
            id={meme.id}
            imageUrl={"/images/memes/"+meme.image}
            caption={meme.caption}
            user_name={meme.user_name}
            user_src={"/images/profile/"+meme.user_src}
            upvotes={meme.upvote}
            downvotes={meme.downvotes}
            user_id={meme.user_id}
            postedTime={formatDateToDateTime(meme.post_time)}
          />
        ))}

        {/* Add more MemeCard components as needed */}
      </VStack>
    </>
  );
}

export default Home