import type * as THREE from "three";
import { FunctionPropertyNames } from "@typings";

type Three = typeof THREE;

export type CataloguesNames = FunctionPropertyNames<Three>;
export type Catalogues = {
  [K in CataloguesNames]: Three[K];
};
