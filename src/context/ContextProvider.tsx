import React, { useState } from 'react'
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'
import dayjs, { Dayjs } from 'dayjs'
var d = new Date()
d.setFullYear(d.getFullYear() - 1)
d.setHours(0, 0, 0, 0)
const DataContext = React.createContext({
  open: true,
  businessId: null,
  startDate: '',
  setStartDate: (_value: any) => {},
  endDate: '',
  setEndDate: (_value: any) => {},
  setBusinessId: (_value: any) => {},
  loggedUser: false,
  setLoggedUser: (_value: any) => {},
  business: false,
  setBusiness: (_value: any) => {},
  user: {},
  setOpen: (_value: any) => {},
  userName: '',
  currentUser: {
    email: '',
    name: '',
    phone: '',
  },
})
const DataProvider = ({ children }: any) => {
  const [open, setOpen] = useState(true)
  const [business, setBusiness] = useLocalStorage('business', false)
  const user = useReadLocalStorage<any>('user')
  let userName = ''
  let currentUser = { email: '', name: '', phone: '' }

  if (user !== null) {
    userName = user.data.user.name
    currentUser = user.data.user
  }
  const [businessId, setBusinessId] = useLocalStorage('businessID', null)
  const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', false)
  const [startDate, setStartDate] = useState<any>(dayjs(d))
  const [endDate, setEndDate] = useState<any>(dayjs(Date.now()))

  return (
    <DataContext.Provider
      value={{
        open,
        setOpen,
        user,
        currentUser,
        businessId,
        loggedUser,
        setLoggedUser,
        business,
        setBusiness,
        setBusinessId,
        userName,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataProvider }
