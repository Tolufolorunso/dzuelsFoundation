import React from 'react'
import Drawer from '@mui/material/Drawer'
import DrawerLinkList from './DrawerLinkList'
import Image from 'next/image'
import Link from 'next/link'
import useAppStore from '@/store/applicationStateStore'

const RightDrawer = ({ open, onClose }) => {
  const isMenuOpen = useAppStore((state) => state.appState.isMenuOpen)

  const drawerWidth = 240

  return (
    <Drawer
      anchor='left'
      open={isMenuOpen}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <div style={{ width: '100%', margin: '0 auto' }}>
        <Link href='/'>
          <Image
            src='/images/logo.png'
            alt='Logo'
            width={100}
            height={60}
            quality={100}
            style={{ width: '100%', margin: '0 auto' }}
          />
        </Link>
      </div>
      <DrawerLinkList />
    </Drawer>
  )
}

export default RightDrawer
