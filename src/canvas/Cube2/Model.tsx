const Model = () => {
  return (
    <>
      <mesh position={[0, 3, 0]}>
        <pointLight castShadow />
        <sphereBufferGeometry args={[0.2, 30, 10]} />
        <meshPhongMaterial emissive={"yellow"} />
      </mesh>
      <mesh receiveShadow={true} castShadow={true}>
        <boxBufferGeometry />
        <meshPhysicalMaterial color={"white"} />
      </mesh>
      <mesh position={[0, -1, 0]} receiveShadow={true}>
        <boxBufferGeometry args={[5, 1, 5]} />
        <meshPhysicalMaterial color="white" />
      </mesh>
    </>
  );
};
export default Model;
