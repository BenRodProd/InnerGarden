"use client"
import Image from "next/image";
import styled from "styled-components";

const StyledBackground = styled.div`

position: absolute;
left:0;
top:0;
width:100%;
height:100%;
z-index: -1;
object-fit: cover;
`

const StyledImage = styled(Image)`
object-fit: cover;
`


export default function Background() {
  const currentHour = new Date().getHours();
  const isDaytime = currentHour >= 6 && currentHour < 18;


  const imageFilename = isDaytime ? `/assets/sun${currentHour.toString().padStart(4, '0')}.webp` : `/assets/moon${currentHour.toString().padStart(4, '0')}.webp`;

  return (
    <>
    <StyledBackground>
      <StyledImage
        src={imageFilename}
        alt={isDaytime ? "Daytime image" : "Nighttime image"}
        fill="true"
        
      />
      </StyledBackground>
    </>
  );
}
