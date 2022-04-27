# Minimal React Three Fiber Next js

A minimal starter for React Three Fiber + Next js with single canvas instance for every page to enable seamless page navigation experience.

### Demo
[<img width="553" alt="preview" src="https://user-images.githubusercontent.com/34530664/165458901-02ef2603-0531-43bf-86fe-a46755b03116.png">](https://nextjs-react-three-fiber.vercel.app/)


### Features

- [&check;] Fast Refresh works out of the box
- [&check;] Automatically inject fiber component in the Canvas
- [&check;] Custom Canvas for better performance
- [&check;] Customizable Page layout. No fixed Page layout is used
- [&check;] Register Three js component in a type-safe way with **useCatalogues** hooks

### Register Three js component

```jsx
import { Mesh } from "three";

const catalogues = {
  Mesh, //Okay
  SomethingThatIsNotACatalogue, //Error
  // ...
};

const Component3d = () => {
  useCatalogues(catalogues);

  return <mesh>{/* .... */}</mesh>;
};
```

### Add 3d Component into a page

Simply add either **useRender** or **useRenderWithContext** hooks inside your component and put it into nextjs page normally.

```jsx
const NormalComponent = () => {
    useRenderWithContext(
        <>
            <Component3d>
            <OrbitControls>
            <ambientLight>
        </>
    )

    return (
        <h1>
            Welcome!
        </h1>
    )
}

export default NormalComponent
```

```jsx
const Page = () => {
  return (
    <>
      <div>Hello World !</div>
      {/* Simply add the component. */}
      <NormalComponent />
    </>
  );
};

export default Page;
```

### Deps

- [`threejs`](https://github.com/mrdoob/three.js/) [`@react-three/fiber`](https://github.com/pmndrs/react-three-fiber) [`@react-three/drei`](https://github.com/pmndrs/drei) &ndash; For developing 3d model on the web
- [`@parcel/css`](https://github.com/parcel-bundler/parcel-css) &ndash; For minifying css bundle
- [`@vanilla-extract/css`](https://github.com/seek-oss/vanilla-extract) [`@vanilla-extract/sprinkles`](https://github.com/seek-oss/vanilla-extract) &ndash; For DOM styling
- [`@yushijinhun/three-minifier-webpack`](https://github.com/yushijinhun/three-minifier) &ndash; For minifying three js bundle
