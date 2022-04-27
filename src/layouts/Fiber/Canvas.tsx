import type { ReactNode } from "react";
import type { RenderProps } from "@react-three/fiber";
import type { AmbientLight } from "three";
import { extend } from "@react-three/fiber";
import { useEffect, useRef, useState, startTransition } from "react";
import { mergeRefs } from "@lib/mergeRefs";
import { useRoot } from "./hooks/useRoot";
import { useMeasure } from "@hooks";
import {
  ErrorBoundary,
  type FallbackProps,
} from "@layouts/Error/ErrorBoundary";

export type CanvasProps = {
  children: ReactNode;
  errorFallbackRender: ({
    error,
    resetErrorBoundary,
  }: FallbackProps) => ReturnType<ErrorBoundary["render"]>;
};

export const Canvas = ({ children, errorFallbackRender }: CanvasProps) => {
  const { canvasRef, root } = useRoot();
  const [containerRef, { width, height }] = useMeasure(true);
  const rootConfig = useRef<RenderProps<HTMLCanvasElement>>(null!);
  const meshRef = useRef<HTMLDivElement>(null!);
  const [error, setError] = useState<FallbackProps | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!rootConfig.current) {
      rootConfig.current = {
        size: { width, height },
      };
    }

    if (!width && !height) return;

    rootConfig.current.size!.width = width;
    rootConfig.current.size!.height = height;

    root.current.configure(rootConfig.current);
  }, [width, height]);

  useEffect(() => {
    if (isLoaded) return;

    // lazy load deps that are not priority
    const getSecondaryDeps = () => {
      Promise.allSettled([
        import("@lib/react-three/fiber/events").then((mod) => mod.default),
        import("@lib/three/ambientLight").then((mod) => mod.default),
      ]).then(([events, catalog]) => {
        let ambientLight: typeof AmbientLight;

        if (events.status === "fulfilled") {
          rootConfig.current.events = events.value;
          rootConfig.current.onCreated = (state) => {
            state.events.connect?.(meshRef.current);
          };
        }

        if (catalog.status === "fulfilled") {
          ambientLight = catalog.value;
        }

        startTransition(() => {
          if (ambientLight) extend({ AmbientLight: ambientLight });
          setIsLoaded(true);
        });
      });
    };

    getSecondaryDeps();
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;

    root.current.configure(rootConfig.current);
    root.current.render(
      <ErrorBoundary fallbackRender={setError}>
        {children}
        {isLoaded && <ambientLight intensity={0.5} />}
      </ErrorBoundary>
    );
  }, [children, isLoaded]);

  return (
    <div
      ref={mergeRefs(meshRef, containerRef)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {error && errorFallbackRender(error)}
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
};

export default Canvas;
