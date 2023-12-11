import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStateProvider } from '../context/GlobalState';
import styles from '../styles/global.module.css';
import { useEffect } from 'react';
import { Poppins } from 'next/font/google'


const poppins = Poppins({ 
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})


function MyApp({ Component, pageProps }) {


  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <GlobalStateProvider>
      <div className= {poppins.className}>
      {/* <div > */}
        <Component {...pageProps} />
      </div>
    </GlobalStateProvider>
  );
}
export default MyApp;
