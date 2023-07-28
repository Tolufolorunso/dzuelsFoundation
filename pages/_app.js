import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import theme from '@/styles/theme'
import createEmotionCache from '@/createEmotionCache'
import '@/styles/global.css'
import Header from '@/components/header/header'
import Toast from '@/components/layout/alert'
import fetchApi from '@/utils/fetchApi'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
        <meta name='description' content='The page for all' />
        <title>Dzuels Foundation</title>
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <div style={{ marginTop: '80px' }}>
          <Toast />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
