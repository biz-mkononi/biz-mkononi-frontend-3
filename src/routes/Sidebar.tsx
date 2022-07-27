import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import clsx from 'clsx'
import AppMenu from "../screens/sidebar/AppMenu"
import { makeStyles } from '@material-ui/core/styles'
import { Outlet } from 'react-router-dom'

const Sidebar = () => {
    const classes = useStyles()

    return (
        <div className={clsx('App', classes.root)}>
            <CssBaseline />
            <Drawer
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <AppMenu />
                <Outlet />
            </Drawer>
        </div>
    )
}

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        background: '#BBE1FA',
        color: '#1B262C',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}))

export default Sidebar