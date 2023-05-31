import Image from "next/image";
import styled from "styled-components";

const GroundStyled = styled.div`
display:flex;
position: absolute;
left:0;
bottom:0;
width: 100%;
height: 100%;
z-index:0;
object-fit: contain;
`

export default function Ground({checked}) {
    let imageSrc
    if (checked <= 90) {
    imageSrc = `/assets/00${checked}.webp`
    } else {
        imageSrc = `/assets/0090.webp`
    }


  return (
      <>
      <GroundStyled>
        <Image src = {imageSrc} alt = "ground"fill="true" />
        </GroundStyled>
    </>
    )
}