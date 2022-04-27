import { useState, startTransition } from "react";
import type { ReactNode, SetStateAction } from "react";
import { RootContextProvider } from "./hooks/useRootContext";
import dynamic from "next/dynamic";
import { useConstant } from "@lib/useConstant";
import type { CanvasProps } from "./Canvas";
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

const errorFallbackRender: CanvasProps["errorFallbackRender"] = (error) =>
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
