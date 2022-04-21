import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router';
import {FaBars} from "react-icons/fa";
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  components: {
      MuiTypography: {
          styleOverrides : {
              root: {
                  fontWeight: 800,
                  fontSize: 20,
                  color: 'white',
                  borderLeft: '4px solid white',
                  paddingLeft: '0.5em',
                  '&:hover' : {
                    color: 'var(--blue)',
                    borderColor: 'var(--blue)',
                  }
              },
          }
      },
      MuiPaper: {
        styleOverrides: {
          root : {
            backgroundColor: ' rgb(136, 136, 136, 0.5)',
            paddingTop: '3em',
            paddingLeft: '0.25em'
          }
        }
      }
  },
})

export default function SwipeableTemporaryDrawer(props) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navItems = ['Home','Exercises','WarmUps','CoolDowns','Programs'];

  const navigate = useNavigate();

  const handleClick = (i)=> {
    if(typeof(i)=== 'string') {
      const pathRoute = i.toLowerCase()
      navigate(`/${pathRoute}`)
  }}

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250,}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {navItems.map((text, index) => (
          <ListItem button key={text} onClick={()=> handleClick(text)}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className='linkStyle' variant='primary' sx={{color: 'white', height: '2em'}} onClick={toggleDrawer(anchor, true)}><FaBars/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            sx={{ fontWeight: 800, fontSize: '20pt'}}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
    </ThemeProvider>
  );
}
