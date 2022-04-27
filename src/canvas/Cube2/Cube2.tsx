import { useCatalogues } from "@hooks/useCatalogues";
import type { Catalogues } from "@lib/three/types";
import {
  Mesh,
  PointLight,
  SphereBufferGeometry,
  MeshPhongMaterial,
  MeshPhysicalMaterial,
  BoxBufferGeometry,
} from "three";
import Model from "./Model";

const catalogues: Partial<Catalogues> = {
  Mesh,
  MeshPhongMaterial,
  SphereBufferGeometry,
  PointLight,
  MeshPhysicalMaterial,
  BoxBufferGeometry,
} as const;

export const Cube2 = () => {
  useCatalogues(catalogues);
  return <Model />;
};
