import React, { createContext, useContext, useState } from "react";
interface AppContextInterface {
  name: string;
  author: string;
  url: string;
}
const StateContext = createContext({});

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};
interface Props {
  children: JSX.Element[] | JSX.Element
}


export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [screenSize, setScreenSize] = useState<any>(undefined);
  const [currentColor, setCurrentColor] = useState<any>("#03C9D7");
  const [currentMode, setCurrentMode] = useState<any>("Light");
  const [themeSettings, setThemeSettings] = useState<any>(false);
  const [activeMenu, setActiveMenu] = useState<any>(true);
  const [isClicked, setIsClicked] = useState<any>(initialState);

  const setMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color: string) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked: string) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
