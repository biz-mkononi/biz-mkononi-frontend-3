import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import image2 from "../../Assets/logo.png"



import InsightsIcon from '@mui/icons-material/Insights';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BadgeIcon from '@mui/icons-material/Badge';
import AppMenuItem from './AppMenuItem'

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
        link: '/',
      },
    ],
  },
  {
    name: 'Businesses',
    Icon: AddBusinessIcon,
    items: [
      {
        name: 'My Businesses',
        link: '/businesses/list',
      },
      {
        name: 'New Business',
        link: '/businesses/add',
      },

    ],

  },
  {
    name: 'Sales',
    Icon: BusinessIcon,
    items: [
      {
        name: 'Sales',
        link: '/',
      },
      {
        name: 'Add Sale',
        link: "/sales/add",
      },

    ],


  },
  {
    name: 'Suppliers',
    Icon: InventoryIcon,
    items: [
      {
        name: 'Suppliers',
        link: '/',
      },
      {
        name: 'new Supplier',
        link: '/supplier/new',
      },

    ],

  },
  {
    name: 'Products',
    Icon: ProductionQuantityLimitsIcon,
    items: [
      {
        name: 'Product',
        link: '/',
      },
      {
        name: 'New Product',
        link: '/product/new',
      },
      {
        name: 'Product Categories',
        link: '/',
      },
      {
        name: 'New Category',
        link: '/category/new',
      },

    ],
  },
  {
    name: 'Customers',
    Icon: BusinessIcon,
    items: [
      {
        name: 'customers',
        link: '/',
      },
      {
        name: 'new customer',
        link: "/customers/new",
      },

    ],


  },
  {
    name: 'Employees',
    Icon: BadgeIcon,
    items: [
      {
        name: 'Employees',
        link: '/',
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
        link: '/',
      },

    ],
  },
]

const AppMenu: React.FC = () => {
  const classes = useStyles()

  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {/* <AppMenuItem {...appMenuItems[0]} /> */}
      <div className="mb-3" style={{ display: "flex", marginLeft: "10px" }}>
        <img src={image2} className="img-fluid" alt="..." />
        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 " style={{ padding: "20px" }}>BizMkononi</h5>
      </div>
      {
        appMenuItems.map((item, index) => (
          <AppMenuItem {...item} key={index} />
        ))
      }
    </List >
  )
}

const drawerWidth = 240

const useStyles = makeStyles(theme =>
  createStyles({
    appMenu: {
      width: '100%',
    },
    navList: {
      width: drawerWidth,
    },
    menuItem: {
      width: drawerWidth,
    },
    menuItemIcon: {
      color: '#1B262C',
    },
  }),
)

export default AppMenu


