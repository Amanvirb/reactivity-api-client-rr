import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import activities from '../../app/assets/images/avtivities.jpg'
import { CardMedia } from '@mui/material'
import { router } from '../../app/layout/Routes'

const HomePage = () => {
  return (
    <Box component={'div'} sx={{mt: 20, height:'100vh'}}>
      <Typography align='center' margin={4}>
      Homepage is under construction
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          direction: 'column',

        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: 80, md: 120 },
            display: 'flex',
            mr: 1,
          }}
          image={activities}
          alt="Activities"
        />

        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          Reactivities
        </Typography>
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
