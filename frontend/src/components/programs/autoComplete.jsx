import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({renderOption, disableClearable, getOptionLabel, isOptionEqualToValue, size, label, data, multiple, value, handleChange, inputValue, handleInputChange}) {

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
        renderOption={renderOption}
        renderInput={(params) => <TextField {...params} label={label} />}
       
      />

    );
  }