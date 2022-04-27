import "../styles/globals.css.ts";
import type { AppProps } from "next/app";
import { FiberRoot } from "@layouts/Fiber/FiberRoot";
import { ButtonLink } from "@components/Button/ButtonLink";

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "7px 0 7px",
        }}
      >
        <ButtonLink href="/">Index</ButtonLink>
        <ButtonLink href="/home">Home</ButtonLink>
        <ButtonLink href="/about">About</ButtonLink>
      </header>
      <FiberRoot>
        <Component {...pageProps} router={router} />
      </FiberRoot>
    </>
  );
};

export default App;
