import * as React from 'react'
import { Link } from 'react-router-dom'

import MenuIcon from '@mui/icons-material/Menu'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Toolbar
} from '@mui/material'


const drawerWidth = 240
const adminNavItems = ['All Users', 'Add User', 'Profile', 'Logout']
const userNavItems = ['Profile', 'Logout']

const Navbar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {adminNavItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <MyLink to={toURL(item)}>
                <ListItemText primary={item} />
              </MyLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex', marginBottom: '130px' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <MyLink to="/">Website</MyLink>
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {adminNavItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                <MyLink to={toURL(item)}>
                  {item}
                </MyLink>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  )
}


const MyLink = ({ children, to }) => {
  return <Link
    to={to}
    style={{ color: 'inherit', textDecoration: 'inherit' }}
  >
    {children}
  </Link>
}

const toURL = (pageName) => pageName.toLowerCase().replace(' ', '-')


export default Navbar
