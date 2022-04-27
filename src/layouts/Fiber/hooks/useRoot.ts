import type { ReconcilerRoot } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";
import { createRoot } from "@react-three/fiber";

export type Root = ReconcilerRoot<HTMLCanvasElement>;
export type CanvasRef = MutableRefObject<HTMLCanvasElement>;

export function useRoot() {
  const canvasRef: CanvasRef = useRef(null!);
  const root = useRef<Root>(null!);

  useEffect(() => {
    if (!root.current) {
      root.current = createRoot(canvasRef.current);
    }
  }, []);

  useEffect(() => {
    return () => {
      //To make react-three-fiber get along with strictMode
      process.env.NODE_ENV !== "development" && root.current.unmount();
    };
  }, [root]);

  return { canvasRef, root };
}
