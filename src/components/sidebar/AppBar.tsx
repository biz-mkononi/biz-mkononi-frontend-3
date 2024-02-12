import { AppBar, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import React from 'react'
import useAuthToken from '../../hooks/common/useAuthToken';

type Props = {
  drawerWidth:number;
  handleDrawerToggle: () => void;
}
const AppMenuBar = ({drawerWidth,handleDrawerToggle}:Props) => {
  const {token} = useAuthToken();
  const logout = () => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.clear();
      resolve('/auth/login');
    } catch (error) {
      reject(error);
    }
  });
};

  const onLogout = () => {
    logout()
  .then(() => {
    window.location.assign('/auth/login');
  })
  .catch((error) => {
    console.error('An error occurred during logout:', error);
  });

  }
  return (
   <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor:'white',
          boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon sx={{
              color:'#3282b8'
            }} />
          </IconButton>
           <IconButton
            color="inherit"
            edge="end"
            sx={{ mr: 2}}
            onClick={onLogout}
          >
            <PowerSettingsNewIcon sx={{
              color:'#3282b8'
            }} />
          </IconButton>

<div className="flex justify-end">
 <h1 className="text-black">{token?.user.name}</h1>
                  </div>
        </Toolbar>


      </AppBar>
  )
}

export default AppMenuBar
