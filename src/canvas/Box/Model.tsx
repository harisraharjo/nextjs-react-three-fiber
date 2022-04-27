import type { Color, MeshProps } from "@react-three/fiber";
import { forwardRef } from "react";
import type { Mesh } from "three";

export type Props = MeshProps & {
  color: Color;
};
const Model = forwardRef<Mesh, Props>(({ color, ...props }, ref) => {
  return (
    <mesh ref={ref} {...props}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial color={color} />
    </mesh>
  );
});

Model.displayName = "BoxModel";

export default Model;
