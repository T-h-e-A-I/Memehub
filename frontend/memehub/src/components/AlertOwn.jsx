import {
    Alert,
    AlertIcon,
    Stack,
  } from '@chakra-ui/react'
  function AlertOwn({type,text}){
    <Stack spacing={3}>
    {type == "error"?(
  <Alert status='error'>
    <AlertIcon />
    {text}
  </Alert>):<></>
  }
   {type == "success"?(
  <Alert status='success'>
    <AlertIcon />
    {text}
  </Alert>):<></>
  }
</Stack>
  }
  export default AlertOwn;