import Image from 'next/image'
import Link from 'next/link'

import classes from './header.module.css'
import RightDrawer from './MobileNav'
import { useState, useEffect } from 'react'
import useAppStore from '@/store/applicationStateStore'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import Profile from './Profile'

const links = [
  { href: '/', label: 'Home' },
  { href: '/catalogs', label: 'Cataloging' },
  { href: '/patrons', label: 'Patrons' },
  { href: '/circulation', label: 'Circulation' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/cohort', label: 'Cohort Class' },
]

function Header() {
  const { data, status } = useSession()

  const closeMenu = useAppStore((state) => state.closeMenu)
  const isMenuOpen = useAppStore((state) => state.appState.isMenuOpen)
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)

  console.log(data?.user)

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

  if (status === 'unauthenticated') {
    router.replace('/auth/login')
  }

  return (
    <>
      <header className={classes.header}>
        <nav>
          <div className={classes.container}>
            <div className={classes.nav_items}>
              <div className="logo">
                <Link href="/" className={classes.logo_link}>
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
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
                {links.map((link) => {
                  return (
                    <li className="item" key={link.href}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  )
                })}
                {data?.user?.role === 'ict' || data?.user?.role === 'ima' ? (
                  <li className="item">
                    <Link href={`dashboard/${data?.user?.role}`}>
                      Dashboard
                    </Link>
                  </li>
                ) : null}
              </ul>
              <Profile data={data} />
              <input
                type="checkbox"
                className={classes.navigationCheckbox}
                id="navi-toggle"
                checked={isMenuOpen}
                onChange={closeMenu}
              />
              <label
                htmlFor="navi-toggle"
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
