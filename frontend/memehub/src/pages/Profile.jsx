import {useState,useEffect} from "react";
import {
  ChakraProvider,
  CSSReset,
  extendTheme,
  Container,
  Box,
  Flex,
  Image,
  Avatar,
  VStack,
  Text,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Button,
} from "@chakra-ui/react";
import ProfileCard from "../components/ProfileCard";// Create a ProfileCard component
import MemeCard from "../components/Memecard";
import { useParams,useNavigate } from "react-router-dom";

const theme = extendTheme({
  // Customize the Chakra UI theme here if needed
});

function Profile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [memes, setMemes] = useState([]);
  const [following,setFollowing] = useState([])
  const [followers,setFollowers] = useState([])
  const [user,setUser] = useState({user_name:"",user_image:"1.jpg",user_bio:"Hello",user_money:"100",})
  const loggedInId = localStorage.getItem("userId");
  const [isFollow,setIsFollow] = useState(true);
  //const userId = localStorage.getItem("userId");
  // Step 4: Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetch(`http://localhost:3000/userposts/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setMemes(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/userfollowing/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setFollowing(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/userfollowers/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setFollowers(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/userinfo/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        if(data.length === 1){
        setUser(data[0]);
        }
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      fetch(`http://localhost:3000/isfollowing/${userId}/${loggedInId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        if(data.isfollowing){
          setIsFollow(true);
        }else{
          setIsFollow(false);
        }
        console.log(data.isfollowing);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  // Sample user data
  const unfollow = ()=>{
    fetch(`http://localhost:3000/unfollow/${userId}/${loggedInId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      setIsFollow(false);
      window.location.reload();
  }
  const follow = ()=>{
    fetch(`http://localhost:3000/follow/${userId}/${loggedInId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
          setIsFollow(true);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      window.location.reload();
      
  }
  const deactivate = ()=>{
    fetch(`http://localhost:3000/deleteuser/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        console.log(data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
      navigate('/signup')
  }
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Container maxW="container.lg" mt="20px">
        {/* Profile Card */}
        <ProfileCard user={user} />
        {userId == loggedInId ? <></>:(isFollow?<Button color={"red"} m={5} onClick={()=>unfollow()}>Unfollow</Button>:<Button color={"Blue"} m={5} onClick={()=>follow()}>Follow</Button>)}
        {/* Friends and Memecards Tabs */}
        <Box mt="20px">
          <Tabs colorScheme="teal">
            <TabList>
              <Tab>Memes</Tab>
              <Tab>Following</Tab>
              <Tab>Followers</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
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
          />
        ))}

        {/* Add more MemeCard components as needed */}
      </VStack>
              </TabPanel>
              <TabPanel>
              <Box p={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Following
      </Text>
      {following.map((user,index) => (
        <Flex as="a" href={"/users/"+user.following_id} key={index} alignItems="center" mb={4}>
          <Text fontWeight="bold" mr={4}>
            {index+1}.
          </Text>
          <Avatar src={"/images/profile/"+user.following_image} size="md" mr={4} />
          <Flex flexDirection="column">
            <Text fontSize="lg">{user.following_name}</Text>
          </Flex>
        </Flex>
      ))}
    </Box>
              </TabPanel>
              <TabPanel>
              <Box p={8}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Followers
      </Text>
      {followers.map((user,index) => (
        <Flex as="a" href={"/users/"+user.follower_id} key={index} alignItems="center" mb={4}>
          <Text fontWeight="bold" mr={4}>
            {index+1}.
          </Text>
          <Avatar src={"/images/profile/"+user.follower_image} size="md" mr={4} />
          <Flex flexDirection="column">
            <Text fontSize="lg">{user.follower_name}</Text>
          </Flex>
        </Flex>
      ))}
    </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default Profile;
