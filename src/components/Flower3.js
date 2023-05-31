import Image from "next/image";
import styled from "styled-components";

const Flower3Styled = styled.div`
position: absolute;
left:0;
top:0;
width: 100%;
height: 100%;
z-index:2;
object-fit: cover;
`

export default function Flower3({checked}) {
    let imageSrc
    if (checked <= 90) {
    imageSrc = `/assets/snowdrop00${checked}.webp`
    } else {
        imageSrc = `/assets/snowdrop0090.webp`
    }


  return (
      <>
      <Flower3Styled>
        <Image src = {imageSrc} alt = "snowdrop" fill="true" />
        </Flower3Styled>
    </>
    )
}