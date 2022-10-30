import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

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
const adminNavItems = ['All Users', 'Add User', 'Profile']
const userNavItems = ['Profile',]

const Navbar = ({ window }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const navigate = useNavigate()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const logout = () => {
    Cookies.remove('token')
    navigate('/signin')
  }

  const loggedIn = Boolean(Cookies.get('token'))
  React.useEffect(() => {
    if (!loggedIn)
      navigate('/signin')
  }, [])

  const navItems = Cookies.get('role') == 'admin' ? adminNavItems : userNavItems

  const container = window !== undefined ? () => window().document.body : undefined

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Website
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <MyLink to={toURL(item)}>
                <ListItemText primary={item} />
              </MyLink>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Logout" onClick={logout} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex', marginBottom: '130px' }}>
      {loggedIn &&
        <>
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
                {navItems.map((item) => (
                  <Button key={item} sx={{ color: '#fff' }}>
                    <MyLink to={toURL(item)}>
                      {item}
                    </MyLink>
                  </Button>
                ))}
                <Button sx={{ color: '#fff' }} onClick={logout}>
                  Logout
                </Button>
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
        </>}
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
