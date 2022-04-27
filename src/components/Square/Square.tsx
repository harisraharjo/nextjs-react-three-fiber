import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useRenderWithContext } from "@layouts/Fiber/hooks/useRender";
import { useRouter } from "next/router";

const Box = dynamic(() => import("@canvas/Box"));
const LongBox = dynamic(() => import("@canvas/LongBox"));
const OrbitControls = dynamic(
  () => import("@lib/react-three/drei/orbitControls")
);

export type Model = "LongBox" | "Box";
export type Props = { children: ReactNode; model: Model };
export const Square = ({ children, model = "Box" }: Props) => {
  const router = useRouter();

  useRenderWithContext(
    <>
      {model === "Box" && <Box router={router} route="/" />}
      {model === "LongBox" && <LongBox />}
      <OrbitControls />
    </>
  );

  return <div>{children}</div>;
};

export default Square;
