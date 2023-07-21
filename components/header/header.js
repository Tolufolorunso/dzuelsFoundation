import Image from 'next/image'
import Link from 'next/link'

import classes from './header.module.css'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import RightDrawer from './mobile-nav'
import { useState, useEffect } from 'react'

function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768) // Adjust the breakpoint as needed
    }

    // Initial check
    handleResize()

    // Event listener to check when the screen size changes
    window.addEventListener('resize', handleResize)

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <nav className={classes.topNav}>
          <div className='logo'>
            <Link href='/'>
              <Image
                src='/images/logo.png'
                alt='Logo'
                width={100}
                height={60}
                quality={100}
              />
            </Link>
          </div>
          <ul
            className={classes.links}
            style={{ display: isMobile ? 'none' : 'block' }}
          >
            <li class='item'>
              <Link href='/' className='active'>
                Home
              </Link>
            </li>
            <li className='item'>
              <Link href='/catalogs'>Cataloging</Link>
            </li>
            <li className='item'>
              <Link href='/cohort'>Cohort Class</Link>
            </li>
            <li className='item'>
              <Link href='/inventory'>Inventory</Link>
            </li>
            <li className='item'>
              <Link href='/patrons'>Patrons</Link>
            </li>
          </ul>
          <button
            onClick={handleDrawerToggle}
            style={{ display: isMobile ? 'block' : 'none' }}
          >
            Toggle Right Drawer
          </button>
          <RightDrawer open={isDrawerOpen} onClose={handleDrawerToggle} />
        </nav>
      </div>
      <div className='bottomNav'></div>
    </header>
  )
}

export default Header
