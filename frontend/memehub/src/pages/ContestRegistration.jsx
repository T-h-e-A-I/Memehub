import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";

function EventForm() {
const hostId = localStorage.getItem("userId");
  const [eventName, setEventName] = useState("");
  const [selectedSponsor, setSelectedSponsor] = useState("");
  const [duration, setDuration] = useState("");
  const [registrationFee, setRegistrationFee] = useState("");
  const [prizeMoney, setPrizeMoney] = useState("");
    const [sponsors,setSponsors] = useState([]);
  // Replace with your sponsor options
  useEffect(() => {
    fetch('http://localhost:3000/sponsors')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setSponsors(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create an object to store the form data
    const formData = {
      eventName,
      selectedSponsor,
      duration,
      registrationFee,
      prizeMoney,
    };
    var sponsor_id;
    for (let i = 0; i < sponsors.length; i++) {
        if (sponsors[i].name === formData.selectedSponsor) {
          sponsor_id = sponsors[i].id;
        }
      }
    // Log the form data to the console
    fetch(`http://localhost:3000/insertcontest/${hostId}/${formData.eventName}/${sponsor_id}/${formData.prizeMoney}/${formData.duration}/${formData.registrationFee}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
    console.log(formData,sponsor_id);
  };

  return (
    <Container maxW="xl">
      <Center mt={10}>
        <Box
          p={6}
          borderRadius="lg"
          boxShadow="md"
          width="100%" // Ensure the box takes the full width
        >
          <Stack spacing={4}>
            <Heading as="h2" size="lg">
              Create a Contest
            </Heading>
            <form onSubmit={handleFormSubmit}>
              <FormControl>
                <FormLabel>Contest Name</FormLabel>
                <Input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Sponsor</FormLabel>
                <Select
                  value={selectedSponsor}
                  onChange={(e) => setSelectedSponsor(e.target.value)}
                  required
                >
                  <option value="" disabled>
                    Select a Sponsor
                  </option>
                  {sponsors.map((sponsor) => (
                    <option key={sponsor.id} value={sponsor.name}>
                      {sponsor.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Duration (in days)</FormLabel>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Registration Fee</FormLabel>
                <Input
                  type="number"
                  value={registrationFee}
                  onChange={(e) => setRegistrationFee(e.target.value)}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Prize Money</FormLabel>
                <Input
                  type="number"
                  value={prizeMoney}
                  onChange={(e) => setPrizeMoney(e.target.value)}
                  required
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="teal"
                size="lg" // Set the button size to large (lg)
                width="100%" // Ensure the button takes the full width
                mt={2}
              >
                Submit
              </Button>
            </form>
          </Stack>
        </Box>
      </Center>
    </Container>
  );
}

export default EventForm;
