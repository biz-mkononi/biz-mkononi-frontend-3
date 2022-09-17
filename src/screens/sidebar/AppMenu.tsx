import React, { useState, useEffect } from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'

import List from '@material-ui/core/List'
import image2 from "../../Assets/logo.png"
import "./sidebar.css"
import { useNavigate } from 'react-router-dom'


import InsightsIcon from '@mui/icons-material/Insights';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import BusinessIcon from '@mui/icons-material/Business';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import BadgeIcon from '@mui/icons-material/Badge';
import AppMenuItem from './AppMenuItem'
import MenuIcon from '@mui/icons-material/Menu';

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

]
const otherItems = [
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
        link: '/suppliers/list',
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
        link: '/products/list',
      },
      {
        name: 'New Product',
        link: '/product/new',
      },
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
    name: 'Customers',
    Icon: BusinessIcon,
    items: [
      {
        name: 'customers',
        link: '/customers/list',
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
]

const AppMenu: React.FC = () => {
  const navigate = useNavigate()
  const classes = useStyles()
  const [drawerNewWidth, setDrawerWidth] = useState(drawerWidth)
  const [businessId, setBusinessId] = useState(JSON.parse(localStorage.getItem("businessId")!))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")!))



  useEffect(() => {
    setBusinessId(JSON.parse(localStorage.getItem("businessId")!));
    setUser(JSON.parse(localStorage.getItem("user")!));

  }, [location]);

  const logout = () => {
    localStorage.clear()
    navigate("/auth/login")
  }


  return (
    <List component="nav" className={classes.appMenu} disablePadding>
      {/* <AppMenuItem {...appMenuItems[0]} /> */}
      <div className="mb-3" style={{ display: "flex", marginLeft: "10px" }}>
        <img src={image2} className="img-fluid sidebar-logo" alt="..." />
        <h5 className="font-medium leading-tight text-xl mt-0 mb-2 " style={{ paddingLeft: "10px", fontWeight: 'bold' }}>BizMkononi</h5>
      </div>
      {
        appMenuItems.map((item, index) => (
          <div className='mb-4'>
            <AppMenuItem {...item} key={index} />

          </div>
        ))
      }
      {
        businessId && (
          <>
            <>
              <hr />
              <h5 className='mt-4'>section</h5>
            </>
            {
              otherItems.map((item, index) => (
                <div className='mb-4 mt-2' style={{ fontWeight: 'bold' }}>
                  <AppMenuItem {...item} key={index} />

                </div>
              ))
            }
          </>
        )
      }
      {
        user && (
          <h4>{user.json.user.name}</h4>

        )
      }
      <button className="btn btn-danger btn-md" onClick={logout}>Logout</button>

    </List >
  )
}


const drawerWidth = 0

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


