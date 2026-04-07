import React from 'react'
import DomeGallery from '../react-bits/DomeGallery';

const DemoImges = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <DomeGallery
        fit={1}
        minRadius={350}
        maxVerticalRotationDeg={0}
        segments={34}
        dragDampening={2}
        grayscale
      />
    </div>
  );
}

export default DemoImges
