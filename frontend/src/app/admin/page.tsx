import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function AdminPage() {
  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Typography>Hello</Typography>
    </Box>
  );
}

