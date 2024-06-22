import "@/styles/globals.css";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  const slug = typeof window !== 'undefined' ? window.location.pathname : '/'
  return (
    <>
      {/* Feel free to add your own styling! */}
      {pageProps.preview && (
        <div>
          You are in preview-mode
          {/* This link will logout of Tina and exit preview mode */}
          <a
            href={`/admin/index.html#/logout?slug=/api/preview/exit?slug=${slug}`}
          >
            Click here
          </a>{' '}
          to exit
        </div>
      )}

      <Component {...pageProps} />
    </>
  )
}

export default App