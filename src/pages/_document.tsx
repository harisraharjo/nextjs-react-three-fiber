import { Html, Head, Main, NextScript } from "next/document";
import { darkMode } from "../styles/constants";

const Document = () => {
  return (
    <Html className={darkMode}>
      <Head>
        <meta name="color-scheme" content="dark light" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
