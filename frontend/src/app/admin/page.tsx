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
        justifyContent: 'center',
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold',
        fontFamily: 'Geist Sans',
      }}
    >
      <Typography>Hello</Typography>
    </Box>
  );
}

