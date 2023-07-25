import Image from 'next/image'
import Link from 'next/link'

import classes from './header.module.css'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import RightDrawer from './mobile-nav'
import { useState, useEffect } from 'react'
import useAppStore from '@/store/applicationStateStore'

function Header() {
  const closeMenu = useAppStore((state) => state.closeMenu)
  const isMenuOpen = useAppStore((state) => state.appState.isMenuOpen)

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

  // const handleDrawerToggle = () => {
  //   setIsDrawerOpen(!isDrawerOpen)
  // }

  return (
    <>
      <header className={classes.header}>
        <nav>
          <div className={classes.container}>
            <div className={classes.nav_items}>
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
                <li className='item'>
                  <Link href='/' className='active'>
                    Home
                  </Link>
                </li>
                <li className='item'>
                  <Link href='/catalogs'>Cataloging</Link>
                </li>
                <li className='item'>
                  <Link href='/patrons'>Patrons</Link>
                </li>
                <li className='item'>
                  <Link href='/circulation'>Circulation</Link>
                </li>
                <li className='item'>
                  <Link href='/cohort'>Cohort Class</Link>
                </li>
                <li className='item'>
                  <Link href='/inventory'>Inventory</Link>
                </li>
              </ul>
              <input
                type='checkbox'
                className={classes.navigationCheckbox}
                id='navi-toggle'
                checked={isMenuOpen}
                onChange={closeMenu}
              />
              <label
                htmlFor='navi-toggle'
                className={classes.navigationButton}
                style={{ display: isMobile ? 'flex' : 'none' }}
              >
                <span className={classes.navigationIcon}>&nbsp;</span>
              </label>
            </div>
          </div>
        </nav>
        <div className='bottomNav'></div>
      </header>
      <RightDrawer open={isMenuOpen} onClose={closeMenu} />
    </>
  )
}

export default Header
