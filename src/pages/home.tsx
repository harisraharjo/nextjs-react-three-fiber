import type { NextPage } from "next";
import { type Model, Square } from "@components/Square";
import { useState, startTransition } from "react";
import { useConstant } from "@lib/useConstant";

const Home: NextPage = () => {
  const [model, setModel] = useState<Model>("Cube1");
  const changeModel = useConstant(
    () => (model: Model) => () => startTransition(() => setModel(model))
  );

  return (
    <div style={{ background: "darkgreen", paddingLeft: "10px" }}>
      <Square key="square2" model={model}>
        Example 2: 3d components + useRouter
      </Square>
      <button
        style={{ position: "absolute", left: "5%", top: "50%", zIndex: 10 }}
        onClick={changeModel("Cube1")}
      >
        Cube1
      </button>
      <button
        style={{ position: "absolute", right: "5%", top: "50%", zIndex: 10 }}
        onClick={changeModel("Cube2")}
      >
        Cube2
      </button>
    </div>
  );
};

export default Home;
