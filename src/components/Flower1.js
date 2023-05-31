import Image from "next/image";
import styled from "styled-components";

const Flower1Styled = styled.div`
position: absolute;
left:0;
top:0;
width: 100%;
height: 100%;
z-index:2;
object-fit: cover;
`

export default function Flower1({checked}) {
    let imageSrc
    if (checked <= 90) {
    imageSrc = `/assets/dandelion00${checked}.webp`
    } else {
        imageSrc = `/assets/dandelion0090.webp`
    }


  return (
      <>
      <Flower1Styled>
        <Image src = {imageSrc} alt = "dandelion" fill="true" />
        </Flower1Styled>
    </>
    )
}