import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

const ButterflyStyled = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.zIndex};
  background-color: transparent;
  background: transparent;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  background-color: transparent;
  background: transparent;
`;

export default function Butterfly({ checked }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [zIndex, setZIndex] = useState(1);

  useEffect(() => {
    let interval;

    if (checked >= 30) {
      setImageSrc("/assets/butter0001.webp");

      interval = setInterval(() => {
        setImageSrc((prevImageSrc) =>
          prevImageSrc === "/assets/butter0000.webp"
            ? "/assets/butter0001.webp"
            : "/assets/butter0000.webp"
        );
        setZIndex(prevZIndex => 
            prevZIndex === 1 ? 10 : 1);
      }, 60000); 
    }

    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
  }, [checked]);

  if (checked < 30 || !imageSrc) {
    return null;
  }

  return (
    <>
      <ButterflyStyled zIndex={zIndex}>
        <StyledImage src={imageSrc} alt="butterfly" fill="true" />
      </ButterflyStyled>
    </>
  );
}
