import { useEffect, useRef, useMemo, startTransition, useState } from "react";

declare type ResizeObserverCallback = (
  entries: any[],
  observer: ResizeObserver
) => void;
declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  observe(target: Element, options?: any): void;
  unobserve(target: Element): void;
  disconnect(): void;
  static toString(): string;
}

export type Bounds = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
};

type HTMLOrSVGElement = HTMLElement | SVGElement;

type Result = [(element: HTMLOrSVGElement | null) => void, Bounds, () => void];

type State = {
  element: HTMLOrSVGElement | null;
  scrollContainers: HTMLOrSVGElement[] | null;
  resizeObserver: ResizeObserver | null;
  lastBounds: Bounds;
};

export function useMeasure(
  scroll = false,
  offsetSize = false,
  polyfill?: { new (cb: ResizeObserverCallback): ResizeObserver }
): Result {
  const ResizeObserver =
    polyfill ||
    (typeof window === "undefined"
      ? class ResizeObserver {}
      : (window as any).ResizeObserver);

  if (!ResizeObserver) {
    throw new Error(
      "This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills"
    );
  }

  const [bounds, setBounds] = useState({
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  // keep all state in a ref
  const state = useRef<State | null>(null);
  if (!state.current) {
    state.current = {
      element: null,
      scrollContainers: null,
      resizeObserver: null,
      lastBounds: bounds,
    };
  }

  // make sure to update state only as long as the component is truly mounted
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // memoize handlers, so event-listeners know when they should update
  const [forceRefresh, onChange] = useMemo(() => {
    const callback =
      (transition = false) =>
      () => {
        if (!state.current?.element) return;

        const { element, lastBounds } = state.current;
        let { left, top, width, height, bottom, right, x, y } =
          element.getBoundingClientRect();
        let size = {
          left,
          top,
          width,
          height,
          bottom,
          right,
          x,
          y,
        };

        if (offsetSize && element instanceof HTMLElement) {
          size.height = element.offsetHeight;
          size.width = element.offsetWidth;
        }

        Object.freeze(size);
        if (mounted.current && !areBoundsEqual(lastBounds, size)) {
          let bounds = (state.current.lastBounds = size);
          if (transition) {
            startTransition(() => {
              setBounds(bounds);
            });
          } else setBounds(bounds);
        }
      };

    const cb = callback();

    return [cb, callback(true)];
  }, [offsetSize]);

  // cleanup current scroll-listeners / observers
  function removeListeners() {
    if (!state.current) return;

    if (state.current.scrollContainers) {
      state.current.scrollContainers.forEach((element) =>
        element.removeEventListener("scroll", onChange, true)
      );
      state.current.scrollContainers = null;
    }

    if (state.current.resizeObserver) {
      state.current.resizeObserver.disconnect();
      state.current.resizeObserver = null;
    }
  }

  // add scroll-listeners / observers
  function addListeners() {
    if (!state.current?.element) return;

    state.current.resizeObserver = new ResizeObserver(onChange);
    state.current.resizeObserver!.observe(state.current.element);
    if (scroll && state.current.scrollContainers) {
      state.current.scrollContainers.forEach((scrollContainer) =>
        scrollContainer.addEventListener("scroll", onChange, {
          capture: true,
          passive: true,
        })
      );
    }
  }

  // the ref we expose to the user
  const ref = (node: HTMLOrSVGElement | null) => {
    if (!state.current) return;

    if (!node || node === state.current.element) return;
    removeListeners();
    state.current.element = node;
    state.current.scrollContainers = getScrollContainers(node);
    addListeners();
  };

  // add general event listeners
  useOnWindowScroll(onChange, Boolean(scroll));
  useOnWindowResize(onChange);

  // respond to changes that are relevant for the listeners
  useEffect(() => {
    removeListeners();
    addListeners();
  }, [scroll, onChange]);

  // remove all listeners when the components unmounts
  useEffect(() => removeListeners, []);

  return [ref, bounds, forceRefresh];
}

// Adds native resize onChange to window
function useOnWindowResize(onWindowResize: (event: Event) => void) {
  useEffect(() => {
    const cb = onWindowResize;
    window.addEventListener("resize", cb);
    return () => {
      window.removeEventListener("resize", cb);
    };
  }, [onWindowResize]);
}
function useOnWindowScroll(onScroll: () => void, enabled: boolean) {
  useEffect(() => {
    if (enabled) {
      const cb = onScroll;
      window.addEventListener("scroll", cb, { capture: true, passive: true });
      window.removeEventListener("scroll", cb, true);
    }
  }, [onScroll, enabled]);
}

// Returns a list of scroll offsets
function getScrollContainers(
  element: HTMLOrSVGElement | null
): HTMLOrSVGElement[] {
  const result: HTMLOrSVGElement[] = [];
  if (!element || element === document.body) return result;
  let { overflow, overflowX, overflowY } = window.getComputedStyle(element);
  for (const prop in { overflow, overflowX, overflowY }) {
    if (prop === "auto" || prop === "scroll") {
      result.push(element);
      break;
    }
  }

  result.push(...getScrollContainers(element.parentElement));
  return result;
}

function areBoundsEqual(a: Bounds, b: Bounds) {
  let isEqual = true;
  for (let key in a) {
    if (a[key as keyof Bounds] !== b[key as keyof Bounds]) {
      isEqual = false;
      break;
    }
  }

  return isEqual;
}
