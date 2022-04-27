import { type RootContextValue, useRootContext } from "./useRootContext";
import { useEffect } from "react";
import type { PropsWithChildren } from "react";

export type UseRender = PropsWithChildren<{
  render: RootContextValue;
}>;
export function useRender(
  children: UseRender["children"],
  render: UseRender["render"]
) {
  useEffect(() => {
    render(children);
  }, [children]);

  useEffect(() => {
    return () => {
      render(null);
    };
  }, []);
}

export function useRenderWithContext(children: UseRender["children"]) {
  const render = useRootContext();
  useRender(children, render);
}
