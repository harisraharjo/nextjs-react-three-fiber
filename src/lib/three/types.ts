import type * as THREE from "three";
import { FunctionPropertyNames } from "@customTypes";

type Three = typeof THREE;

export type CataloguesNames = FunctionPropertyNames<Three>;
export type Catalogues = {
  [K in CataloguesNames]: Three[K];
};
