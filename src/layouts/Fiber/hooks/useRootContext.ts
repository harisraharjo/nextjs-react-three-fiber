import type { ReconcilerRoot } from "@react-three/fiber";
import { createContext, useContext } from "react";
import type { Context, Dispatch, SetStateAction, ReactNode } from "react";

export type RootContext = Context<ReconcilerRoot<HTMLCanvasElement>>;
export type RootContextValue = Dispatch<SetStateAction<ReactNode>>;

const RootContext = /*#__PURE__*/ createContext<RootContextValue>(null!);
export const RootContextProvider = RootContext.Provider;
export function useRootContext() {
  return useContext(RootContext);
}
