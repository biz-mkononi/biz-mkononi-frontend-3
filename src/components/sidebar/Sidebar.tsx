import React, { useContext } from 'react'
import InsightsIcon from '@mui/icons-material/Insights'
import AddBusinessIcon from '@mui/icons-material/AddBusiness'
import BusinessIcon from '@mui/icons-material/Business'
import InventoryIcon from '@mui/icons-material/Inventory'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import BadgeIcon from '@mui/icons-material/Badge'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SideBarMenuItem from './SideBarMenuItem'
import { Divider } from '@mui/material'
import person from '../../Assets/person.png'
import logo from '../../Assets/logo.png'
import { DataContext } from '../../context/ContextProvider'
import { useNavigate } from 'react-router-dom'

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
        link: '/sales/add',
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
        link: '/customers/new',
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

const Sidebar = () => {
  const { currentUser, business, setLoggedUser } = useContext(DataContext)
  const filteredListItems = appMenuItems.filter((item: any) => {
    return item.name === 'Businesses'
  })
  const navigate = useNavigate()
  const logout = () => {
    localStorage.clear()
    setLoggedUser(false)
    navigate('/auth/login')
  }
  return (
    <div>
      <button
        data-drawer-target="sidebar-multi-level-sidebar"
        data-drawer-toggle="sidebar-multi-level-sidebar"
        aria-controls="sidebar-multi-level-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full py-4  pb-4 overflow-y-auto bg-bizLightBlue dark:bg-gray-800">
          <div className=" py-3 lg:px-5 lg:pl-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start justify-start">
                <a href="https://flowbite.com" className="flex ml-2 md:mr-12">
                  <img src={logo} className="h-8 mr-3" alt="FlowBite Logo" />
                  <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                    BizMkononi
                  </span>
                </a>
              </div>
              <div className="flex items-center">
                <div className="flex items-center ml-3">
                  <div>
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      aria-expanded="false"
                      data-dropdown-toggle="dropdown-user"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="w-8 h-8 rounded-full"
                        src={person}
                        alt="user photo"
                      />
                    </button>
                  </div>
                  <div
                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div className="px-4 py-3" role="none">
                      <p
                        className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        {currentUser.phone}
                      </p>
                    </div>
                    <ul className="py-1" role="none">
                      <li>
                        <button
                          onClick={logout}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className=" border-2 border-gray-600 mt-3 mb-3 " />
          {business
            ? appMenuItems.map((item, index) => (
                <div className="mb-2">
                  <SideBarMenuItem {...item} key={index} />
                </div>
              ))
            : filteredListItems.map((item, index) => (
                <div className="mb-2">
                  <SideBarMenuItem {...item} key={index} />
                </div>
              ))}
          <Divider />
          {business &&
            otherItems.map((item, index) => (
              <div className="mb-2">
                <SideBarMenuItem {...item} key={index} />
              </div>
            ))}
        </div>
      </aside>
    </div>
  )
}

export default Sidebar
