import React, { useRef } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import texture_8k_earth_specular_map from "../../images/EarthNormal.png";
import texture_8k_earth_normal_map from "../../images/EarthSpec.png";
import texture_8k_earth_daymap from "../../images/Solarsystemscope_texture_8k_earth_daymap.jpeg";
import texture_8k_earth_clouds from "../../images/Solarsystemscope_texture_8k_earth_clouds.jpeg";
import { OrbitControls, Stars } from "@react-three/drei";
const Earth = () => {
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
    TextureLoader,
    [
      texture_8k_earth_daymap,
      texture_8k_earth_normal_map,
      texture_8k_earth_specular_map,
      texture_8k_earth_clouds,
    ]
  );
  const earthRef = useRef();
  const cloudRef = useRef();
  // 8. 地球自轉動畫使用
  useFrame(({ clock }) => {
    const elaspedTime = clock.getElapsedTime();
    earthRef.current.rotation.y = elaspedTime / 6;
    cloudRef.current.rotation.y = elaspedTime / 6;
  });
  return (
    <>
      {/* 3.環境光線(intensity光線強度)  */}
      <ambientLight intensity={1} />
      {/* 7.星星當背景 radis(星星的半徑大小)、depth(景的深度)、count 星星數、factor(粒度系數)、saturation飽和度、fade淡入淡出  */}
      <Stars
        radius={100}
        depth={60}
        count={10000}
        factor={7}
        saturation={0}
        fade={true}
      />
      {/* 6.製作雲層  side:用於設置顯示面。屬性可設置爲雙面DoubleSide，前面FontSide，後面BackSide*/}
      <mesh ref={cloudRef}>
        <sphereGeometry args={[2.006, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        {/* 1.製作球體  args[球體半徑參數,寬度,高度]*/}
        <sphereGeometry args={[2, 32, 32]} />
        {/* 2.材料色澤(地球高光圖) */}
        <meshPhongMaterial specularMap={specularMap} />
        {/* 4.基本材料、法線貼圖（3D模擬凹凸處光照效果的技術)
              metalness金屬特性、roughness粗糙程度 */}
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          metalness={0.4}
          roughness={0.6}
        />
      </mesh>
      {/* 5.使用軌道控制器、使目標球體可移動、平移、旋轉 */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.6}
        panSpeed={0.5}
        rotateSpeed={0.4}
      />
    </>
  );
};

export default Earth;
