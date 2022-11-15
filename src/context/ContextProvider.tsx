import React, { useState } from "react";

const DataContext = React.createContext({ isTrue: true, setIsTrue: (_value: any) => { } });
const DataProvider = ({ children }: any) => {
  const [isTrue, setIsTrue] = useState(true);


  return (
    <DataContext.Provider value={{ isTrue, setIsTrue }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };