import React, { useContext } from 'react'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import NotificationAddIcon from '@mui/icons-material/NotificationAdd';
import MenuIcon from '@mui/icons-material/Menu';
import "./appbar.css"
import { DataContext } from '../../context/ContextProvider';
const AppBar = () => {
    const { isTrue, setIsTrue } = useContext(DataContext)

    const onClick = () => {
        setIsTrue((prev: any) => !prev)
    }

    return (
        <div>
            <div className='menu-icons'  >
                <span ><MenuIcon className='menu-icon' onClick={onClick} /></span>
            </div>
            <div className=" bar-icons " >
                <span style={{ textAlign: "right" }} ><NotificationAddIcon /></span>
                <span ><PowerSettingsNewIcon /></span>
            </div>
        </div>
    )
}

export default AppBar