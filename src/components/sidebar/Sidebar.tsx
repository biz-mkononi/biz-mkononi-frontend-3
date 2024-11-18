import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InsightsIcon from '@mui/icons-material/Insights';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BadgeIcon from '@mui/icons-material/Badge';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Toolbar from '@mui/material/Toolbar';
import SideBarMenuItem from './SideBarMenuItem';
import { DataContext } from '../../context/ContextProvider';
import Logo from '../../Assets/logo.png';

const appMenuItems = [
  {
    name: 'Insights',
    Icon: InsightsIcon,
    items: [
      {
        name: 'Overview',
        link: '/insights/overview',
      },
      {
        name: 'Sales-Insights',
        link: '/insights/sales',
      },
      {
        name: 'Customers Insights',
        link: '/insights/customers',
      },
      {
        name: 'Churn Rate Insights',
        link: '/insights/churn-rate',
      },
      {
        name: 'Revenue Insights',
        link: '/insights/revenue',
      },
    ],
  },
  {
    name: 'Businesses',
    Icon: AddBusinessIcon,
    items: [
      {
        name: 'My Businesses',
        link: '/',
      },
      {
        name: 'New Business',
        link: '/businesses/add',
      },
    ],
  },
];
const otherItems = [
  {
    name: 'Product Categories',
    Icon: ProductionQuantityLimitsIcon,
    items: [
      {
        name: 'Product Categories',
        link: '/categories/list',
      },
      {
        name: 'New Category',
        link: '/category/new',
      },
    ],
  },
  {
    name: 'Products',
    Icon: ProductionQuantityLimitsIcon,
    items: [
      {
        name: 'Products',
        link: '/products/list',
      },
      {
        name: 'New Product',
        link: '/product/new',
      },
    ],
  },
  {
    name: 'Suppliers',
    Icon: InventoryIcon,
    items: [
      {
        name: 'Suppliers',
        link: '/suppliers/list',
      },
      {
        name: 'New Supplier',
        link: '/supplier/new',
      },
    ],
  },
  {
    name: 'Supplies',
    Icon: InventoryIcon,
    items: [
      {
        name: 'Supplies',
        link: '/supplies/list',
      },
      {
        name: 'Add Supply',
        link: '/supplies/add',
      },
    ],
  },
  {
    name: 'Customers',
    Icon: BusinessIcon,
    items: [
      {
        name: 'Customers',
        link: '/customers/list',
      },
      {
        name: 'New Customer',
        link: '/customers/new',
      },
    ],
  },
  {
    name: 'Sales',
    Icon: BusinessIcon,
    items: [
      {
        name: 'Sales',
        link: '/sales/list',
      },
      {
        name: 'Add Sale',
        link: '/sales/add',
      },
    ],
  },
  {
    name: 'Employees',
    Icon: BadgeIcon,
    items: [
      {
        name: 'Employees',
        link: '/employees/list',
      },
      {
        name: 'Add Employee',
        link: '/employee/new',
      },
      {
        name: 'Pay Employee',
        link: '/employee/pay',
      },
      {
        name: 'Employee Salaries',
        link: '/employees/salaries',
      },
    ],
  },
  {
    name: 'Finance',
    Icon: AttachMoneyIcon,
    items: [
      {
        name: 'Add Expense',
        link: '/expense/add',
      },
      {
        name: 'Expenses',
        link: '/expense/list',
      },
      {
        name: 'Other Income',
        link: '/income/list',
      },
      {
        name: 'Add Extra Income',
        link: '/income/add',
      },
    ],
  },
];
interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
  drawerWidth: number;
}

export default function Sidebar(props: Props) {
  const {
    window,
    mobileOpen,
    handleDrawerClose,
    handleDrawerTransitionEnd,
    drawerWidth,
  } = props;
  const { business } = React.useContext(DataContext);
  const filteredListItems = appMenuItems.filter((item) => {
    return item.name.includes('Businesses');
  });

  const drawer = (
    <div>
      <div className="flex space-x-2 ml-4 mt-6  items-center">
        <img src={Logo} alt="logo" className="h-8 w-8" />
        <h1 className="text-xl text-black font-semibold">BizMkononi</h1>
      </div>
      <Toolbar />

      <Divider />
      {business
        ? appMenuItems.map((item, index) => (
            <div className="mb-2" key={index}>
              <SideBarMenuItem {...item} key={index} />
            </div>
          ))
        : filteredListItems.map((item, index) => (
            <div className="mb-2" key={index}>
              <SideBarMenuItem {...item} key={index} />
            </div>
          ))}
      <Divider />
      {business &&
        otherItems.map((item, index) => (
          <div className="mb-2" key={index}>
            <SideBarMenuItem {...item} key={index} />
          </div>
        ))}
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#bbe1fa',
            boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundColor: '#bbe1fa',
            boxShadow: '2px 0px 10px rgba(0, 0, 0, 0.1)',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
