import React, {useState} from 'react';
import {useLocalStorage} from 'usehooks-ts';
import dayjs from 'dayjs';
const d = new Date();
d.setFullYear(d.getFullYear() - 1);
d.setHours(0, 0, 0, 0);
const DataContext = React.createContext({
  open: true,
  businessId: null,
  openDialog:true,
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
   // eslint-disable-next-line
  setUser: (_value: any) => {},
  business: false,
  // eslint-disable-next-line
  setBusiness: (_value: any) => {},
  user: {user:{email: '', name: '', phone: '',freeTrialStartDate:'',subscriptionType:''}},
  // eslint-disable-next-line
  setOpen: (_value: any) => {},
  // eslint-disable-next-line
  setOpenDialog: (_value: any) => {},
  userName: '',
  formData:{name: '',email:'', password: '', phone: '', password2: '',subscriptionType:''},
  // eslint-disable-next-line
  setFormData:(_value: any) => {},
});
// eslint-disable-next-line
const DataProvider = ({children}: any) => {
  const [open, setOpen] = useState(true);
  const [openDialog,setOpenDialog] = useLocalStorage('dialog', false);
  const [business, setBusiness] = useLocalStorage('business', false);
  // eslint-disable-next-line
  let userName = '';
  const currentUser = {user:{email: '', name: '', phone: '',freeTrialStartDate:'',subscriptionType:''}};

  const [businessId, setBusinessId] = useLocalStorage('businessID', null);
  const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', false);
  const [user,setUser] = useLocalStorage('user',currentUser)
  // eslint-disable-next-line
  const [startDate, setStartDate] = useState<any>(dayjs(d));
  // eslint-disable-next-line
  const [endDate, setEndDate] = useState<any>(dayjs(Date.now()));

  const initialState = {name: '',email:'', password: '', phone: '', password2: '',subscriptionType:''};
  // eslint-disable-next-line
  const [formData, setFormData] = useState(initialState);

  return (
    <DataContext.Provider
      value={{
        open,
        setOpen,
        user,
        setUser,
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
        formData,
        setFormData,
        openDialog,
        setOpenDialog
      }}>
      {children}
    </DataContext.Provider>
  );
};

export {DataContext, DataProvider};
