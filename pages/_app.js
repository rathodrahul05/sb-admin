import Head from "next/head";
import $ from "jquery";
import { SessionProvider } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import FullLayout from "../src/layouts/FullLayout";
import Script from "next/script";
import "../styles/sb-admin-2.min.css";
import "../styles/sb-admin-2.css";



import "react-toastify/dist/ReactToastify.css";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  if (Component.getLayout) {
    return Component.getLayout(
      <>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      <Script
        type="text/javaScript"
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"
      ></Script>
      </>
    );
  }
  return (
    <>
      <Script src="vendor/jquery/jquery.min.js"></Script>
      <Script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></Script>

      {/* Core plugin JavaScript */}
      <Script src="vendor/jquery-easing/jquery.easing.min.js"></Script>

      {/* Custom Scripts for all pages */}
      <Script src="js/sb-admin-2.min.js"></Script>

      {/* Page level plugins */}
      <Script src="vendor/chart.js/Chart.min.js"></Script>

      <Script src="vendor/jquery/jquery.min.js"></Script>
      <Script
        type="text/javaScript"
        src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"
      ></Script>
      <SessionProvider session={session}>
        <ToastContainer />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

export default MyApp;
