import React from 'react';
import PropTypes from 'prop-types';
import SidebarMenuItemComponent from './SidebarMenuItemComponent';
import ListItemIcon from '@mui/material/ListItemIcon';
import {Collapse, List, ListItemText} from '@mui/material';
import IconExpandLess from '@mui/icons-material/ExpandLess';
import IconExpandMore from '@mui/icons-material/ExpandMore';

export const AppMenuItemPropTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string,
  Icon: PropTypes.elementType,
  items: PropTypes.array,
};

// TypeScript compile-time props type, infered from propTypes
// https://dev.to/busypeoples/notes-on-typescript-inferring-react-proptypes-1g88
type AppMenuItemPropTypes = PropTypes.InferProps<typeof AppMenuItemPropTypes>;
type AppMenuItemPropsWithoutItems = Omit<AppMenuItemPropTypes, 'items'>;

// Improve child items declaration
export type AppMenuItemProps = AppMenuItemPropsWithoutItems & {
  items?: AppMenuItemProps[];
};
const SideBarMenuItem: React.FC<AppMenuItemProps> = (props) => {
  const {name, Icon, link, items = []} = props;
  const isExpandable = items && items.length > 0;
  const [open, setOpen] = React.useState(false);
  function handleClick() {
    setOpen((prev) => !prev);
  }
  const parentMenu = (
    <SidebarMenuItemComponent link={link} onClick={handleClick}>
      <>
        {!!Icon && (
          <ListItemIcon sx={{color: '#1B262C'}}>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText
          className="text-sm"
          sx={{fontWeight: 'bold'}}
          primary={name}
          inset={!Icon}
        />
        {/* Display the expand menu if the item has children */}
        {isExpandable && !open && <IconExpandMore />}
        {isExpandable && open && <IconExpandLess />}
      </>
    </SidebarMenuItemComponent>
  );
  const ChildItem = isExpandable ? (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {items.map((item, index) => (
          <SideBarMenuItem {...item} key={index} />
        ))}
      </List>
    </Collapse>
  ) : null;
  return (
    <>
      {parentMenu}
      {ChildItem}
    </>
  );
};

export default SideBarMenuItem;
