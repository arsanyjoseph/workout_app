import * as React from 'react';
import Avatar from '@mui/material/Avatar';



export default function ImageAvatars({name, imgSrc}) {
  return (
        <Avatar alt={name} src={imgSrc} />
  );
}
