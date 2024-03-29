import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ImageAvatars from './avatar'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {BiLogOut} from 'react-icons/bi'
import {logout, reset} from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './settingsIcon.css'
import {MdVideoLibrary} from 'react-icons/md'


const theme = createTheme({
  components: {
      MuiButton: {
          styleOverrides : {
              root: {
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'grey'
                  }
              },
          }
      },
  },
})

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function CustomizedMenus(props) {
  const {user} = useSelector((state)=> state.auth)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditProfile = (e)=> {
    const linkTxt = e.target.innerText.toLowerCase().replace(/\s+/g, '');
    navigate(`/home/${linkTxt}/${user.id}`)
    handleClose();
  }
  const handleEdit = ()=> {
    handleClose();
    navigate('/home/editavatar')
  }

  const handleLogout = ()=> {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <ThemeProvider theme={theme}>
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <ImageAvatars name={user.firstName} imgSrc={'/' + user.avatarLink}/>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit} disableRipple>
          <EditIcon />
          Edit Avatar
        </MenuItem>
        <MenuItem  onClick={(e)=> handleEditProfile(e)} disableRipple>
          <FileCopyIcon />
          Edit Profile
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          Messages
          {props.notif && <span className='notifNumber'><span>{props.notif}</span></span>}
        </MenuItem>

        <MenuItem onClick={()=> navigate('/home/reference')} disableRipple>
          <MdVideoLibrary style={{fontSize: 'large'}}/>
          <span style={{marginLeft: '0.8em'}}>Reference</span>
        </MenuItem>

        <MenuItem onClick={handleClose} disableRipple>
          <BiLogOut />
           <span style={{marginLeft: '0.8em'}} onClick={handleLogout}>Logout</span>
        </MenuItem>
      </StyledMenu>
    </div>
    </ThemeProvider>
  );
}
