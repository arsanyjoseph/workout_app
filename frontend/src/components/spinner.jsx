import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './spinner.css'

export default function CircularIndeterminate() {
  return (
    <div className='spinnerBackground'>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress/>
      </Box>
    </div>
  );
}
