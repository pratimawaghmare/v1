import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import { ListItemButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import App from "./App";

const drawerWidth = 240;

export default function NavigationDrawer() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', margin: 0}}
            >
                <App/>
            </Box>
        </Box>
    );
}

