import dynamic from "next/dynamic";
import type { NextPage } from "next";
import type { NextRouter } from "next/router";

const FiberSection = dynamic(() => import("@layouts/Fiber/FiberSection"));
const Box = dynamic(() => import("@canvas/Box"));
const OrbitControls = dynamic(
  () => import("@lib/react-three/drei/orbitControls")
);
type Props = NextPage & {
  router: NextRouter;
};

const Index = ({ router }: Props) => {
  return (
    <section style={{ background: "maroon" }}>
      <FiberSection>
        <Box router={router} route="/home" />
        <OrbitControls />
      </FiberSection>
      Example 1: Plain 3d components
    </section>
  );
};
export default Index;
