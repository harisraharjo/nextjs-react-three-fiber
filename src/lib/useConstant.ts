import { useRef } from "react";

// https://github.com/Andarist/use-constant
type ResultBox<T> = { v: T };
export function useConstant<T>(fn: () => T): T {
  const ref = useRef<ResultBox<T>>();

  if (!ref.current) {
    ref.current = { v: fn() };
  }

  return ref.current.v;
}
