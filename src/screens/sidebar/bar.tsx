import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from './Dummy';
import "./sidebar.css";


const Bar2 = () => {
    const [screenSize, setScreenSize] = useState<any>(undefined);
    const [activeMenu, setActiveMenu] = useState<any>(true);
    const [currentColor, setCurrentColor] = useState<any>("#3282b8");


    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

    return (
        <div className="ml-1  h-screen md:overflow-hidden w-72 overflow-auto md:hover:overflow-auto pb-10 bar-container">
            {activeMenu && (
                <>
                    <div className="flex justify-between items-center ">
                        <Link to="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
                            <SiShopware /> <span>BizMkononi</span>
                        </Link>
                        <TooltipComponent content="Menu" position="BottomCenter">
                            <button
                                type="button"
                                onClick={() => setActiveMenu(!activeMenu)}
                                style={{ color: currentColor }}
                                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
                            >
                                <MdOutlineCancel />
                            </button>
                        </TooltipComponent>
                    </div>
                    <div className="mt-10 ">
                        {links.map((item) => (
                            <div key={item.title}>
                                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                                    {item.title}
                                </p>
                                {item.links.map((link) => (
                                    <NavLink
                                        to={`/${link.name}`}
                                        key={link.name}
                                        onClick={handleCloseSideBar}
                                        style={({ isActive }) => ({
                                            backgroundColor: isActive ? currentColor : '',
                                        })}
                                        className={({ isActive }) => (isActive ? activeLink : normalLink)}
                                    >
                                        {link.icon}
                                        <span className="capitalize ">{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default Bar2;