import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          {/* <link rel='shortcut icon' href='/favicon.ico' /> */}

          <link rel='icon' href='/favicon.ico' />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
          <link
            rel='icon'
            type='image/png'
            sizes='192x192'
            href='/android-chrome-192x192.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='512x512'
            href='/android-chrome-512x512.png'
          />

          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;0,700;0,900;1,400&display=swap'
            rel='stylesheet'
          ></link>
          <link
            rel='stylesheet'
            href='https://fonts.googleapis.com/icon?family=Material+Icons'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
