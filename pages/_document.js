import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {/*Bootstrap core JavaScript*/}
          {/* <Script src="vendor/jquery/jquery.min.js"></Script>
          <Script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></Script> */}

          {/* Core plugin JavaScript */}
          {/* <Script src="vendor/jquery-easing/jquery.easing.min.js"></Script> */}

          {/* Custom Scripts for all pages */}
          {/* <Script src="js/sb-admin-2.min.js"></Script> */}

          {/* Page level plugins */}
          {/* <Script src="vendor/chart.js/Chart.min.js"></Script>

          <Script src="vendor/jquery/jquery.min.js"></Script> */}
          {/* <link
            href="vendor/fontawesome-free/css/all.min.css"
            rel="stylesheet"
            type="text/css"
          /> */}
          <link
            href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&display=optional"
            rel="stylesheet"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          />
          {/* Custom styles for this template*/}

          {/* <link href="css/sb-admin-2.min.css" rel="stylesheet" /> */}
          {/* <Script
            type="text/javaScript"
            src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.min.js"
          ></Script> */}
        </body>
      </Html>
    );
  }
}
