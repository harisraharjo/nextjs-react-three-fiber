import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { useRenderWithContext } from "@layouts/Fiber/hooks/useRender";
import { useRouter } from "next/router";

const Cube1 = dynamic(() => import("@canvas/Cube1"));
const Cube2 = dynamic(() => import("@canvas/Cube2"));
const OrbitControls = dynamic(
  () => import("@lib/react-three/drei/orbitControls")
);

export type Model = "Cube2" | "Cube1";
export type Props = { children: ReactNode; model: Model };
export const Square = ({ children, model = "Cube1" }: Props) => {
  const router = useRouter();

  useRenderWithContext(
    <>
      {model === "Cube1" && <Cube1 router={router} route="/" />}
      {model === "Cube2" && <Cube2 />}
      <OrbitControls />
    </>
  );

  return <div>{children}</div>;
};

export default Square;
