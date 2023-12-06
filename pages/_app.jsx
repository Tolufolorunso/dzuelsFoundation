import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '@/styles/theme'
import createEmotionCache from '@/createEmotionCache'
import '@/styles/global.css'
import Toast from '@/components/layout/alert'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

import NextNProgress from 'nextjs-progressbar'
import Header from '../components/header/Header'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter()

  const auth = router.pathname.includes('auth')
  const dashboard = router.pathname.includes('dashboard')

  function renderHeader() {
    if (auth || dashboard) {
      return null
    } else {
      return <Header />
    }
  }

  // Check if it's the Christmas period (from Dec 1st to Dec 25th)
  const currentDate = new Date()
  const isChristmasPeriod =
    currentDate.getMonth() === 11 &&
    currentDate.getDate() >= 1 &&
    currentDate.getDate() <= 25

  function renderChristmasMessage() {
    if (false) {
      return (
        <div
          style={{
            background: 'red',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            marginTop: '-10px',
            position: 'fixed',
            // width: '100%',
          }}
        >
          It is Christmas time! 🎅🎄 Spread joy and happiness!
        </div>
      )
    }
    return null
  }

  React.useEffect(() => {
    const colors = ['rgb(182, 7, 10)', 'rgb(84, 227, 158)', 'rgb(255, 99, 71)']
    const animations = ['fall-1', 'fall-2', 'fall-3']

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
    const selectRandom = (items) => items[rand(0, items.length - 1)]

    const originPosition = { x: 0, y: 0 }

    const last = {
      starPosition: originPosition,
      mousePosition: originPosition,
    }

    const calcDistance = (a, b) => {
      const diffX = b.x - a.x
      const diffY = b.y - a.y
      return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2))
    }

    window.onmousemove = (e) => {
      const mouseX = e.clientX
      const mouseY = e.clientY + window.scrollY
      // star.className = 'star fa-solid fa-gift'
      // const star = document.createElement('span')
      const star = document.createElement('img')
      star.className = 'star'
      star.src = '/santa.svg'
      star.style.objectFit = 'cover'
      star.style.left = `${mouseX}px`
      star.style.top = `${mouseY}px`
      star.style.color = selectRandom(colors)
      star.style.animationName = selectRandom(animations)

      const glow = document.createElement('div')
      glow.className = 'glow-point'
      glow.style.left = `${mouseX}px`
      glow.style.top = `${mouseY}px`

      last.mousePosition = { x: e.clientX, y: e.clientY }

      document.body.appendChild(glow)
      setTimeout(() => document.body.removeChild(glow), 75)

      if (calcDistance(last.starPosition, last.mousePosition) >= 60) {
        document.body.appendChild(star)
        last.starPosition = last.mousePosition
        setTimeout(() => document.body.removeChild(star), 1000)
      }
    }
  }, [])

  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="description" content="Dzuels foundation" />
          <meta name="robots" content="noindex" />
          <title>Dzuels Foundation</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {renderHeader()}
          <div style={{ marginTop: '80px' }}>
            {renderChristmasMessage()}
            <Toast />
            <Toaster />
            <NextNProgress color="#6A0406" height={3} />
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}

export default MyApp
