import {
  AppBar,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Box,
  CircularProgress,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PaymentIcon from '@mui/icons-material/Payment';
import React, { useState } from 'react';
import useAuthToken from '../../hooks/common/useAuthToken';
import useSubscriptionStatus from '../../hooks/common/useGetSubscriptionStatus';

type SubscriptionStatus = 'active' | 'trial' | 'inactive';

type Props = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
  subscriptionStatus?: SubscriptionStatus;
  onUpgrade?: () => void;
};

export const logout = () => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.clear();
      resolve('/auth/login');
    } catch (error) {
      reject(error);
    }
  });
};

const AppMenuBar = ({ drawerWidth, handleDrawerToggle }: Props) => {
  const { token } = useAuthToken();
  const { data, isLoading } = useSubscriptionStatus();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    handleMenuClose();
    logout()
      .then(() => {
        window.location.assign('/auth/login');
      })
      .catch((error) => {
        console.error('An error occurred during logout:', error);
      });
  };

  if (isLoading) {
    return (
      <div className="text-center">
        <CircularProgress color="success" />
      </div>
    );
  }

  const getSubscriptionChip = () => {
    switch (data?.status) {
      case 'active':
        return (
          <Chip
            icon={<CheckCircleIcon />}
            label="Active"
            color="success"
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      case 'free-trial':
        return (
          <Chip
            icon={<AccessTimeIcon />}
            label="Free Trial"
            color="warning"
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      case 'inactive':
        return (
          <Chip
            icon={<ErrorOutlineIcon />}
            label="Inactive"
            color="error"
            size="small"
            sx={{ fontWeight: 500 }}
          />
        );
      default:
        return null;
    }
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        backgroundColor: 'white',
        boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon sx={{ color: '#3282b8' }} />
        </IconButton>

        <div
          className="flex items-center gap-2 ml-auto cursor-pointer"
          onClick={handleMenuOpen}
        >
          <AccountCircleIcon sx={{ color: '#3282b8', fontSize: 32 }} />
          <span className="text-black font-medium">{token?.user.name}</span>
        </div>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          onClick={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1.5,
              minWidth: 220,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5 }}>
            <div className="text-sm font-semibold text-gray-800">
              {token?.user.name}
            </div>
            <div className="text-xs text-gray-500 mt-0.5">
              {token?.user.email}
            </div>
          </Box>

          <Divider />

          <MenuItem disabled>
            <ListItemText>
              <div className="flex items-center gap-2">
                <span className="text-sm">Subscription:</span>
                {getSubscriptionChip()}
              </div>
            </ListItemText>
          </MenuItem>

          {['billing-due', 'inactive'].includes(data?.status ?? '') && (
            <>
              <Divider />
              <MenuItem
                component="a"
                href={`/payments/${token?.user.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ListItemIcon>
                  <PaymentIcon sx={{ color: '#3282b8' }} />
                </ListItemIcon>
                <ListItemButton>
                  <ListItemText
                    primary={
                      data?.status === 'inactive' ? 'Renew Now' : 'Fix Billing'
                    }
                  />
                </ListItemButton>
              </MenuItem>
            </>
          )}

          <Divider />

          <MenuItem onClick={onLogout}>
            <ListItemIcon>
              <PowerSettingsNewIcon sx={{ color: '#3282b8' }} />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default AppMenuBar;
