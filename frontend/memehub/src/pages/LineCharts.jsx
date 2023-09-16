import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, LinearScale, PointElement, LineElement } from 'chart.js';
import { Center, Box, Heading, VStack } from '@chakra-ui/react';

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);


const chartOptions = { // This allows you to control the chart size
  responsive: true, // This ensures responsiveness
};

const LineCharts = () => {
  const userId = localStorage.getItem('userId');
  const [dataset,setDataSet] = useState([]);
  const [upvotes,setUpvotes] = useState([]);
  const [dataPoints,setDataPoints] = useState([]);
  const [comments,setComments] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:3000/stats/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Assuming the data is an array of meme objects
        setDataSet(data);
        const datapoint = data.map((item,index)=>index+1);
        const up_votes = data.map((item)=>item.upvotes);
        const comments = data.map((item)=>item.comments);
        setComments(comments);
        setUpvotes(up_votes);
        setDataPoints(datapoint)
        
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const data1 = {
    labels: dataPoints,
    datasets: [
      {
        label: 'Chart 1',
        data: upvotes,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  
  const data2 = {
    labels: dataPoints,
    datasets: [
      {
        label: 'Chart 2',
        data: comments,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: false,
      },
    ],
  };
  
  return (
    <Center>
      <VStack>
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Upvote Chart
          </Heading>
          <Line data={data1} options={chartOptions} width={800} />
        </Box>
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Comment Chart
          </Heading>
          <Line data={data2} options={chartOptions}  width={800}/>
        </Box>
      </VStack>
    </Center>
  );
};

export default LineCharts;
