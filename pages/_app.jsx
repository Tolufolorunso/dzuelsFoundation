import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '@/styles/theme'
import createEmotionCache from '@/createEmotionCache'
import '@/styles/global.css'
import Header from '@/components/header/Header'
import Toast from '@/components/layout/alert'
import { useRouter } from 'next/router'
import { SessionProvider } from 'next-auth/react'

import NextNProgress from 'nextjs-progressbar'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const router = useRouter()

  const auth = router.pathname.includes('auth')

  return (
    <SessionProvider session={pageProps.session}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name='viewport' content='initial-scale=1, width=device-width' />
          <meta name='description' content='Dzuels foundation' />
          <meta name='robots' content='noindex' />
          <title>Dzuels Foundation</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {!auth ? <Header /> : null}
          <div style={{ marginTop: '80px' }}>
            <Toast />
            <NextNProgress color='#6A0406' height={3} />
            <Component {...pageProps} />
          </div>
        </ThemeProvider>
      </CacheProvider>
    </SessionProvider>
  )
}

export default MyApp
