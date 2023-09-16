import Sidebar from "../components/Sidebar"
import MemeCard from "../components/Memecard";
import { VStack ,Button} from "@chakra-ui/react";
import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom"; 
const ContestPage = () => {
  const navigate = useNavigate();
    const { contestId } = useParams();
    const userId = localStorage.getItem("userId");
  const [memes, setMemes] = useState([]);
  const [isRunning,setIsRunning] = useState(true);
  const [isInContest,setIsInContest] = useState(true);
  // Step 4: Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/contests/${contestId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setMemes(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/isRunning/${contestId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data);
        if(data.isSuccess == 1){
          setIsRunning(true);
        }else{
          setIsRunning(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/isInContest/${userId}/${contestId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        if(data.isSuccess == 1){
          setIsInContest(true);
        }else{
          setIsInContest(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  const registered = ()=>{
   
    fetch(`http://localhost:3000/insertInContest/${userId}/${contestId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
          console.log(data)
          if(data.isSuccess == 1){
            setIsInContest(true);
          }        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }
  return (
    <>
      <Sidebar />
      {!isRunning?<></>:isInContest?<Button ml={"80%"} mt={5} size={"lg"} onClick={()=>navigate("/uploadincontest/"+contestId)}>Upload Meme</Button>:<Button ml={"80%"} mt={"5"} size={"lg"} onClick={()=>registered()}>Register</Button>}
      <VStack p="20px" spacing="20px">
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

export default ContestPage;