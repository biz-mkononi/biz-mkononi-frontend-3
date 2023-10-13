import React, {useState} from 'react';
import {useLocalStorage, useReadLocalStorage} from 'usehooks-ts';
import dayjs from 'dayjs';
const d = new Date();
d.setFullYear(d.getFullYear() - 1);
d.setHours(0, 0, 0, 0);
const DataContext = React.createContext({
  open: true,
  businessId: null,
  startDate: '',
  // eslint-disable-next-line
  setStartDate: (_value: any) => {},
  endDate: '',
  // eslint-disable-next-line
  setEndDate: (_value: any) => {},
  // eslint-disable-next-line
  setBusinessId: (_value: any) => {},
  loggedUser: false,
  // eslint-disable-next-line
  setLoggedUser: (_value: any) => {},
  business: false,
  // eslint-disable-next-line
  setBusiness: (_value: any) => {},
  user: {},
  // eslint-disable-next-line
  setOpen: (_value: any) => {},
  userName: '',
  currentUser: {
    email: '',
    name: '',
    phone: '',
  },
});
// eslint-disable-next-line
const DataProvider = ({children}: any) => {
  const [open, setOpen] = useState(true);
  const [business, setBusiness] = useLocalStorage('business', false);
  // eslint-disable-next-line
  const user = useReadLocalStorage<any>('user');
  let userName = '';
  let currentUser = {email: '', name: '', phone: ''};

  if (user !== null) {
    userName = user.data.user.name;
    currentUser = user.data.user;
  }
  const [businessId, setBusinessId] = useLocalStorage('businessID', null);
  const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', false);
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState<any>(dayjs(d));
  // eslint-disable-next-line
  const [endDate, setEndDate] = useState<any>(dayjs(Date.now()));

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
      }}>
      {children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
