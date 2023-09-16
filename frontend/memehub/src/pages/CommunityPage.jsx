import Sidebar from "../components/Sidebar"
import MemeCard from "../components/Memecard";
import { Button, VStack } from "@chakra-ui/react";
import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom"; 
const CommunityPage = () => {
  const navigate = useNavigate();
    const { communityId } = useParams();
    const userId = localStorage.getItem("userId");
  const [memes, setMemes] = useState([]);
  const [isInCommunity,setIsInCommunity] = useState(false);
  const registered = ()=>{
   
    fetch(`http://localhost:3000/insertInCommunity/${userId}/${communityId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
          console.log(data)
          if(data.isSuccess == 1){
            setIsInCommunity(true);
          }        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  // Step 4: Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/community/${communityId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setMemes(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/isInCommunity/${userId}/${communityId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        if(data.isSuccess == 1){
          setIsInCommunity(true);
        }else{
          setIsInCommunity(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  return (
    <>
      <Sidebar />
      <VStack p="20px" spacing="20px">
        {isInCommunity?<Button ml={"80%"} size={"lg"} onClick={()=>navigate("/uploadincommunity/"+communityId)}>Upload Meme</Button>:<Button ml={"90%"} size={"lg"} onClick={()=>registered()}>Join</Button>}
        {memes.map((meme) => (
          <MemeCard
            id={meme.id}
            imageUrl={"/images/memes/"+meme.image}
            caption={meme.caption}
            user_name={meme.user_name}
            user_src={"/images/profile/"+meme.user_src}
            upvotes={meme.upvote}
            downvotes={meme.downvotes}
            user_id={meme.user_id}
          />
        ))}

        {/* Add more MemeCard components as needed */}
      </VStack>
    </>
  );
}

export default CommunityPage;