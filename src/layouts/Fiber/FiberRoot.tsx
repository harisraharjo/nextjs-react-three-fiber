import { useState, startTransition } from "react";
import type { ReactNode, SetStateAction } from "react";
import { RootContextProvider } from "./hooks/useRootContext";
import dynamic from "next/dynamic";
import type { FallbackProps } from "@layouts/Error/ErrorBoundary";
import { useConstant } from "@lib/useConstant";
const Canvas = dynamic(
  () =>
    import(
      /* webpackPreload: true */
      "./Canvas"
    )
);

type FiberRoot = {
  children: ReactNode;
};

const errorFallbackRender = ({ error, resetErrorBoundary: _ }: FallbackProps) =>
  `Oops, something went wrong! ${error}`;

export const FiberRoot = ({ children }: FiberRoot) => {
  const [fiberChildren, setFiberChildren] = useState<ReactNode>(null);
  const render = useConstant(
    () => (fiberElements: SetStateAction<ReactNode>) => {
      startTransition(() => {
        setFiberChildren(fiberElements);
      });
    }
  );

  return (
    <>
      <RootContextProvider value={render}>{children}</RootContextProvider>
      <Canvas errorFallbackRender={errorFallbackRender}>{fiberChildren}</Canvas>
    </>
  );
};
