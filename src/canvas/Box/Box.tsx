import { useCatalogues } from "@hooks/useCatalogues";
import type { Catalogues } from "@lib/three/types";
import { useFrame } from "@react-three/fiber";
import type { NextRouter } from "next/router";
import { useRef, useState } from "react";
import { Mesh, MeshPhysicalMaterial, BoxBufferGeometry } from "three";
import Model from "./Model";

const catalogues: Partial<Catalogues> = {
  Mesh,
  MeshPhysicalMaterial,
  BoxBufferGeometry,
} as const;

type Props = {
  router: NextRouter;
  route: NextRouter["route"];
};
export const Box = ({ route, router }: Props) => {
  useCatalogues(catalogues);

  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);

  useFrame(() =>
    mesh.current
      ? //@ts-ignore
        (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
      : null
  );

  return (
    <Model
      ref={mesh}
      onClick={() => router.push(route)}
      color={route === "/" ? "orange" : "hotpink"}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.1 : 1}
    />
  );
};
