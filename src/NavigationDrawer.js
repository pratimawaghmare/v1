import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import App from "./App";

const drawerWidth = 240;

export default function NavigationDrawer() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    '& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper': {
                        position: 'inherit',
                    }
                }}
                variant="permanent"
                anchor="left"
            >
                <List>
                    {['Money', 'Student Loans', 'Payroll', 'Tax'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', margin: 0}}
            >
                <App/>
            </Box>
        </Box>
    );
}
