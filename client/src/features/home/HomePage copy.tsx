import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import activities from '../../app/assets/images/avtivities.jpg'
import { CardMedia } from '@mui/material'
import { router } from '../../app/layout/Routes'
import HomeHeader from './HomeHeader'
import HomeMiddle from './HomeMiddle';

const HomePage = () => {
  return (
    <Box component={'div'} sx={{mt: 5, height:'100vh'}}>
     
      <Typography align='center' margin={4} >Homepage is under Construction</Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          direction: 'column',

        }}
      >
         <HomeHeader/>
         </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          direction: 'column',

        }}
      >
       <HomeMiddle/>
      </Box>
      {/* <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{m:4}}
      >
        <Button variant='contained' onClick={()=>router.navigate('/loginform')}>Login</Button>
        <Button variant='contained'>Register</Button>
      </Stack> */}
    </Box>
  )
}

export default HomePage
