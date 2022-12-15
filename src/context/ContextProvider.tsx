import React, { useState } from "react";
import { useLocalStorage, useReadLocalStorage } from 'usehooks-ts'

const DataContext = React.createContext({ open: true, businessId: null, setBusinessId: (_value: any) => { }, loggedUser: false, setLoggedUser: (_value: any) => { }, business: false, setBusiness: (_value: any) => { }, user: {}, setOpen: (_value: any) => { } });
const DataProvider = ({ children }: any) => {
  const [open, setOpen] = useState(true);
  const [business, setBusiness] = useLocalStorage("business", false);
  const user = useReadLocalStorage<any>("user")
  const [businessId, setBusinessId] = useLocalStorage("businessID", null)
  const [loggedUser, setLoggedUser] = useLocalStorage("loggedUser", false);

  return (
    <DataContext.Provider value={{ open, setOpen, user, businessId, loggedUser, setLoggedUser, business, setBusiness, setBusinessId }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };