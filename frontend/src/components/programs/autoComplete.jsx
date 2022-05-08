import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
export default function ComboBox({label, data, multiple, value, handleChange, inputValue, handleInputChange}) {

    return (
      <Autocomplete
      size='small'
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
        multiple={multiple}
        getOptionLabel={(option)=> option.name}
        disablePortal
        id="combo-box-demo"
        options={data}
        sx={{ width: 170 }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />
    );
  }