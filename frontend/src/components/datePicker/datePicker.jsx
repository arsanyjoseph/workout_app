import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export default function MaterialUIPickers({label, value, handleChange}) {
    
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={label}
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={handleChange}
          disableMaskedInput={true}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}
