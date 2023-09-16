import React, { useState, useRef,useEffect } from "react";
import { Button,Input,VStack,HStack,FormLabel,Heading } from "@chakra-ui/react";
import PhotoGallery from "../components/PhotoGallery";

function MemeGenerator() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [fontSize, setFontSize] = useState(50);
  const [imageSrc,setImageSrc] = useState("")
  const [photos,setPhotos] = useState([]);
  const canvasRef = useRef(null);
  useEffect(() => {
    fetch('http://localhost:3000/templates')
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        const arr = data.map((item)=>`/images/templates/${item.image}`);
        setPhotos(arr)
        console.log(arr)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [])

  const handleTopTextChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomTextChange = (event) => {
    setBottomText(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleGenerateMeme = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    const storedPhoto = localStorage.getItem("selected_photo");
    if (storedPhoto) {
      setImageSrc(JSON.parse(storedPhoto));
    }
    image.src = imageSrc;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      ctx.font = `${fontSize}px Impact`;
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.textAlign = "center";

      ctx.fillText(topText, canvas.width / 2, 80);
      ctx.strokeText(topText, canvas.width / 2, 80);

      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
      ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
    };
  };

  const handleDownloadMeme = () => {
    const canvas = canvasRef.current;
    const downloadLink = document.createElement("a");
    downloadLink.href = canvas.toDataURL("image/jpeg");
    downloadLink.download = "meme.jpg";
    downloadLink.click();
  };

  return (
    <div>
      <Heading mx={"30%"} my={10} justifyContent={"center"}>Meme Generator</Heading>
      <HStack>
        <VStack width={"50%"} border={"1px solid black"} m="2">
          <canvas ref={canvasRef} style={{ width: "100%" }}></canvas>
          <br />
          <Button onClick={handleDownloadMeme}>Download Meme</Button>
        </VStack>
        <VStack m={"auto"}>
        <FormLabel htmlFor="topText" textAlign={"left"}>Top Text: </FormLabel>
          <Input
            type="text"
            value={topText}
            onChange={handleTopTextChange}
            placeholder="Top text"
          />
          <br />
          <FormLabel htmlFor="bottomText">Bottom Text: </FormLabel>
          <Input
            type="text"
            value={bottomText}
            onChange={handleBottomTextChange}
            placeholder="Bottom text"
          />
          <br />
          <FormLabel htmlFor="fontSize">Font Size: </FormLabel>
          <Input
            type="number"
            id="fontSize"
            value={fontSize}
            onChange={handleFontSizeChange}
          />
          <br />
          <Button onClick={handleGenerateMeme}>Generate Meme</Button>
          <br />
        </VStack>
      </HStack>
      <PhotoGallery photos={photos} setPictures={handleGenerateMeme}/>
    </div>
  );
}

export default MemeGenerator;
