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

const DrawerLinkList = () => {
  return (
    <List>
      <LinkItem href='/' itemText='Home' Icon={HomeIcon} />
      <LinkItem
        href='/catalogs'
        itemText='Cataloging'
        Icon={LibraryBooksIcon}
      />
      <LinkItem href='/patrons' itemText='Patrons' Icon={PortraitIcon} />
      <LinkItem
        href='/circulation'
        itemText='Circulation'
        Icon={ShoppingBasketIcon}
      />
    </List>
  )
}

export default DrawerLinkList

function LinkItem(props) {
  const { href, itemText, Icon, children } = props
  return (
    <Link href={`${href}`} passHref>
      <ListItemButton>
        <ListItemIcon>
          <Icon fontSize='large' />
        </ListItemIcon>
        <ListItemText primary={itemText} />
      </ListItemButton>
    </Link>
  )
}
