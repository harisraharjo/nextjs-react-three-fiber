import type { Catalogues } from "@lib/three/types";
import { extend } from "@react-three/fiber";
import { useRef } from "react";

export function useCatalogues(catalogues: Partial<Catalogues>) {
  const ref = useRef<boolean>(false);
  if (!ref.current) {
    extend(catalogues);

    ref.current = process.env.NODE_ENV !== "development" ? false : true;
  }
}
