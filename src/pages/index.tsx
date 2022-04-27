import dynamic from "next/dynamic";
import type { NextPage } from "next";
import type { NextRouter } from "next/router";

const FiberSection = dynamic(() => import("@layouts/Fiber/FiberSection"));
const Cube1 = dynamic(() => import("@canvas/Cube1"));
const OrbitControls = dynamic(
  () => import("@lib/react-three/drei/orbitControls")
);
type Props = NextPage & {
  router: NextRouter;
};

const Index = ({ router }: Props) => {
  return (
    <section style={{ background: "maroon", textAlign: "center" }}>
      <FiberSection>
        <Cube1 router={router} route="/home" />
        <OrbitControls />
      </FiberSection>
      Plain 3d component
    </section>
  );
};
export default Index;
