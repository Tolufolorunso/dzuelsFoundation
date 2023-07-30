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
import { useSession } from 'next-auth/react'
import Button from '@mui/material/Button'

const DrawerLinkList = () => {
  const { status } = useSession()

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
      {status === 'authenticated' && (
        <li className='item'>
          <Button onClick={() => signOut()}>Log out</Button>
        </li>
      )}
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
