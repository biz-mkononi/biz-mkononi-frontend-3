import React, {forwardRef} from 'react';
import {NavLink, NavLinkProps} from 'react-router-dom';
import ListItem from '@mui/material/ListItem';

interface AppMenuItemComponentProps {
  className?: string;
  link?: string | null; // because the InferProps props allows alows null value
  children: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
const SidebarMenuItemComponent: React.FC<AppMenuItemComponentProps> = (
  props
) => {
  const {className, link, onClick, children} = props;
  if (!link || typeof link !== 'string') {
    return (
      <ListItem
        sx={{
          '&.active': {
            background: 'rgba(0, 0, 0, 0.08)',
            '& .MuiListItemIcon-root': {
              color: '#fff',
            },
          },
        }}
        className={className}
        // eslint-disable-next-line
        children={children}
        onClick={onClick}
      />
    );
  }
  return (
    <ListItem
      sx={{
        '&.active': {
          background: 'rgba(0, 0, 0, 0.08)',
          '& .MuiListItemIcon-root': {
            color: '#fff',
          },
        },
      }}
      className={className}
      // eslint-disable-next-line
      children={children}
      // eslint-disable-next-line
      component={forwardRef((props: NavLinkProps, ref: any) => (
        <NavLink {...props} ref={ref} />
      ))}
      to={link}
    />
  );
};

export default SidebarMenuItemComponent;
