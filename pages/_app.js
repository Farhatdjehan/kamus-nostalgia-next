import Script from 'next/script'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
    <Component {...pageProps} />
    <Script
      id="lazyOnload1"
      strategy="lazyOnload"
      src={`https://www.googletagmanager.com/gtag/js?id=G-VRQXV82CTZ`}
    />
    <Script id="lazyOnload2" strategy="lazyOnload">
      {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VRQXV82CTZ', {
              page_path: window.location.pathname,
            });
                `}
    </Script>
  </>
}

export default MyApp
