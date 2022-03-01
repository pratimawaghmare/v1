import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ArrowForward from '@mui/icons-material/ArrowForward';
import { Link } from "react-router-dom";
const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function DrawerMenu() {

    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
                        backgroundColor: "#1976D2"
                    }

                }}
                variant="persistent"
                anchor="left"
                open={true}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon style={{ color: "white" }} /> : <ChevronRightIcon style={{ color: "white" }} />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['MX Widget', 'Nexus Widget'].map((text, index) => (
                        <ListItem button key={text} component={Link} to={"/" + text.replace(' ', '')}>

                            <ListItemText primary={text} style={{ color: "white" }} />
                            <ListItemIcon style={{ color: "white" }}>
                                <ArrowForward />
                            </ListItemIcon>
                        </ListItem>
                    ))}
                </List>
                {/* <Divider /> */}
            </Drawer>
        </Box>
    );
}