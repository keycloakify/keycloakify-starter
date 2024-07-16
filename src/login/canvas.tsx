import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { MeshBasicMaterial, MirroredRepeatWrapping, PlaneGeometry, Texture } from 'three';
//import { DEG2RAD } from 'three/src/math/MathUtils';
import { useSpring, animated } from '@react-spring/three';
import { DEG2RAD } from 'three/src/math/MathUtils.js';

//import PostProcessing from './post-processing';

const warp0 = '/img/odessey1.jpg';
//const warp1 = '/path/to/odessey1.jpg';

const MyComponent = ({  }) => {
  const [opacity, setOpacity] = useSpring(() => ({ value: 0 }));
  const warpTexture = useTexture(warp0);
  const [clonedTexture, setClonedTexture] = useState<Texture | undefined>(undefined);

  useEffect(() => {
    if (warpTexture) {
      warpTexture.colorSpace = 'srgb';
      warpTexture.wrapS = MirroredRepeatWrapping;
      warpTexture.wrapT = MirroredRepeatWrapping;

      const cloned = warpTexture.clone();
      cloned.colorSpace = 'srgb';
      cloned.wrapS = MirroredRepeatWrapping;
      cloned.wrapT = MirroredRepeatWrapping;
      setClonedTexture(cloned);

      setOpacity({ value: 1, config: { duration: 750 } });
    }
  }, [warpTexture]);

  const getWarpTexture = () => warpTexture;
  const getClonedTexture = () => clonedTexture;

  useFrame((_, delta) => {
    const speed = 0.1;
    const wt = getWarpTexture();
    if (wt) wt.offset.x += speed * delta;
    const ct = getClonedTexture();
    if (ct) ct.offset.x += speed * delta;
  });

  const heightIterations = 5;
  const height = 40;
  const offset = 0.2;
  const gap = 4.55;
  const rotationInDegrees = 85;

  const MyGeometry = useMemo(() => {
    const geom = new PlaneGeometry(100, height);
    if (geom.attributes.uv) {
      geom.attributes.uv.array[2] = 0.125;
      geom.attributes.uv.array[6] = 0.125;
      geom.attributes.uv.needsUpdate = true;
    }
    return geom;
  }, [height]);

  const RightMaterial = useMemo(() => {
    return new MeshBasicMaterial({
        map: getWarpTexture(),
        transparent: true
    });
  }, [getWarpTexture]);

    const LeftMaterial = useMemo(() => {
        return new MeshBasicMaterial({
            map: getClonedTexture(),
            transparent: true
        });
    }, [getClonedTexture]);

  if (!warpTexture || !clonedTexture) {
    return null;
  }

  return (
    <>
        <color attach="background" args={['black']} />
        <group>
          {Array.from({ length: heightIterations }).map((_, i) => {
            const isOdd = i % 2 === 0;
            return (
              <animated.mesh
                key={`left-${i}`}
                position={[-gap + offset, height * i, 0]}
                rotation-y={rotationInDegrees * DEG2RAD}
                scale-y={isOdd ? -1 : 1}
              >
                <primitive object={MyGeometry} />
                <primitive object={LeftMaterial} opacity={1} />
              </animated.mesh>
            );
          })}
          {Array.from({ length: heightIterations }).map((_, i) => {
            const isOdd = i % 2 === 0;
            return (
              <animated.mesh
                key={`right-${i}`}
                position={[gap - offset, height * i, 0]}
                rotation-y={-rotationInDegrees * DEG2RAD}
                scale-y={isOdd ? -1 : 1}
                scale-x={-1}
              >
                <primitive object={MyGeometry} />
                <primitive object={RightMaterial} opacity={1} />
                {/*<meshBasicMaterial map={warpTexture} transparent opacity={opacity.value.get()} />*/}
              </animated.mesh>
            );
          })}
        </group>
    </>
  );
};

export default MyComponent;
