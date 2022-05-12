import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useSelector } from 'react-redux';
export default function ComboBox({disableClearable, getOptionLabel, isOptionEqualToValue, size, label, data, multiple, value, handleChange, inputValue, handleInputChange}) {

    return (
      <Autocomplete
      size={size}
      value={value}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
        multiple={multiple}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={isOptionEqualToValue}
        disableClearable={disableClearable}	
        noOptionsText='No Options'
        disablePortal
        id="combo-box-demo"
        options={data}
        sx={{ width: 150 }}
        renderInput={(params) => <TextField {...params} label={label} />}
      />

    );
  }