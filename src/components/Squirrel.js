import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

const ButterflyStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: transparent;
  background: transparent;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  background-color: transparent;
  background: transparent;
`;

export default function Squirrel({ checked }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [zIndex, setZIndex] = useState(10);

  useEffect(() => {
    let interval;

    if (checked >= 60) {
      setImageSrc("/assets/squirrel0001.webp");

      interval = setInterval(() => {
        setImageSrc((prevImageSrc) =>
          prevImageSrc === "/assets/squirrel0001.webp"
            ? "/assets/squirrel0000.webp"
            : "/assets/squirrel0001.webp"
        );
        setZIndex(prevZIndex => 
            prevZIndex === 10 ? 8 : 10);
      }, 30000); 
    }

    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
  }, [checked]);

  if (checked < 60 || !imageSrc) {
    return null;
  }

  return (
    <>
      <ButterflyStyled zIndex={zIndex}>
        <StyledImage src={imageSrc} alt="butterfly" fill="true" loop={false} />
      </ButterflyStyled>
    </>
  );
}
