import React, { useContext } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import NotificationAddIcon from '@mui/icons-material/NotificationAdd'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import './appbar.css'
import { DataContext } from '../../context/ContextProvider'
import { styled, useTheme } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useNavigate } from 'react-router-dom'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}
const drawerWidth = 240
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))
const TopBar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const { open, setOpen, user, loggedUser, setLoggedUser, businessId } =
    useContext(DataContext)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const checkOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    localStorage.clear()
    setLoggedUser(false)
    navigate('/auth/login')
  }
  return (
    <div>
      {loggedUser && (
        <AppBar className="topBar" elevation={0} open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon className="menu-icons" />
            </IconButton>

            <div className=" bar-icons text-right">
              <Button
                id="basic-button"
                aria-controls={checkOpen ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={checkOpen ? 'true' : undefined}
                onClick={handleClick}
              >
                <PowerSettingsNewIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={checkOpen}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>
                  <button className="btn btn-outline btn-md" onClick={logout}>
                    Logout
                  </button>
                </MenuItem>
              </Menu>
              {/* <span style={{ textAlign: "right" }} ><NotificationAddIcon /></span> */}
            </div>
          </Toolbar>
        </AppBar>
      )}
    </div>
  )
}

export default TopBar
