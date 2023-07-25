import React from 'react'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import Link from 'next/link'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import HomeIcon from '@mui/icons-material/Home'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import PortraitIcon from '@mui/icons-material/Portrait'
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket'
import useAppStore from '@/store/applicationStateStore'

const DrawerLinkList = () => {
  const closeMenu = useAppStore((state) => state.closeMenu)
  return (
    <List>
      <LinkItem
        href='/'
        itemText='Home'
        Icon={HomeIcon}
        closeMenu={closeMenu}
      />
      <LinkItem
        href='/catalogs'
        itemText='Cataloging'
        Icon={LibraryBooksIcon}
        closeMenu={closeMenu}
      />
      <LinkItem
        href='/patrons'
        itemText='Patrons'
        Icon={PortraitIcon}
        closeMenu={closeMenu}
      />
      <LinkItem
        href='/circulation'
        itemText='Circulation'
        Icon={ShoppingBasketIcon}
        closeMenu={closeMenu}
      />
    </List>
  )
}

export default DrawerLinkList

function LinkItem(props) {
  const { href, itemText, Icon, closeMenu } = props
  return (
    <Link href={`${href}`} passHref onClick={closeMenu}>
      <ListItemButton>
        <ListItemIcon>
          <Icon fontSize='large' />
        </ListItemIcon>
        <ListItemText primary={itemText} />
      </ListItemButton>
    </Link>
  )
}
