import React, { useState, useEffect, useContext } from 'react'
import { styled, useTheme } from '@mui/material/styles';

import List from '@mui/material/List'
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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { DataContext } from '../../context/ContextProvider'
import { Divider } from '@mui/material';
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

]
const otherItems = [
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
        link: "/sales/add",
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
        link: "/supplies/add",
      },

    ],


  },
  {
    name: 'Finance',
    Icon: AttachMoneyIcon,
    items: [
      {
        name: 'Add Expense',
        link: "/expense/add",
      },
      {
        name: 'Expenses',
        link: "/expense/list",
      },
      {
        name: 'Other Income',
        link: '/income/list',
      },
      {
        name: 'Add Extra Income',
        link: "/income/add",
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
        name: 'Customers',
        link: '/customers/list',
      },
      {
        name: 'New Customer',
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

  const { business } = useContext(DataContext)
  return (
    <List component="nav" sx={{width:"100%"}} disablePadding>
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
        business && (
          <>
            <>
              <Divider />
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

    </List >
  )
}


export default AppMenu


