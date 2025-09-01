import { Canvas, useThree } from "@react-three/fiber";
import { XR, createXRStore } from "@react-three/xr";
import { useState, useEffect } from "react";
import { RotatingModel } from "./components/RotatingModel";

const store = createXRStore();

function CameraAdjust() {
  const { camera } = useThree();

  useEffect(() => {
    if (!store.isPresenting) {
      camera.position.set(0, 1, 2);
      camera.fov = 12;
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  return null;
}

export function App() {
  const [active, setActive] = useState(false);

  return (
    <>
      <button onClick={() => store.enterAR()}>Enter AR</button>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <CameraAdjust />
        <XR store={store}>
          <RotatingModel onClick={() => setActive(!active)} scale={[1, 1, 1]} />
        </XR>
      </Canvas>
    </>
  );
}
