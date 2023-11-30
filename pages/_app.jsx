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
    if (true) {
      return (
        <div
          style={{
            background: 'red',
            color: 'white',
            textAlign: 'center',
            padding: '10px',
            marginTop: '-10px',
          }}
        >
          It is Christmas time! 🎅🎄 Spread joy and happiness!
        </div>
      )
    }
    return null
  }

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
