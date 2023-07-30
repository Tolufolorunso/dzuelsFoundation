import Image from 'next/image'
import Link from 'next/link'

import classes from './header.module.css'
import RightDrawer from './mobile-nav'
import { useState, useEffect } from 'react'
import useAppStore from '@/store/applicationStateStore'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import Button from '@mui/material/Button'
import Loading from '../layout/Loading'

function Header() {
  const { data, status } = useSession()

  const closeMenu = useAppStore((state) => state.closeMenu)
  const isMenuOpen = useAppStore((state) => state.appState.isMenuOpen)
  const router = useRouter()
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

  if (status === 'loading') {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <Loading />
      </div>
    )
  }

  if (status === 'unauthenticated') {
    router.replace('/auth/login')
  }

  return (
    <>
      <header className={classes.header}>
        <nav>
          <div className={classes.container}>
            <div className={classes.nav_items}>
              <div className='logo'>
                <Link href='/' className={classes.logo_link}>
                  <Image
                    src='/images/logo.png'
                    alt='Logo'
                    width={80}
                    height={40}
                    quality={60}
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
                {data?.user && (
                  <li className='item'>
                    <Button onClick={() => signOut()}>Log out</Button>
                  </li>
                )}
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
        {/* {bottomNav} */}
      </header>
      <RightDrawer open={isMenuOpen} onClose={closeMenu} />
    </>
  )
}

export default Header
