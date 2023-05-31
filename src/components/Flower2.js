import Image from "next/image";
import styled from "styled-components";

const Flower2Styled = styled.div`
position: absolute;
left:0;
top:0;
width: 100%;
height: 100%;
z-index:2;
object-fit: cover;
`

export default function Flower2({checked}) {
    let imageSrc
    if (checked <= 90) {
    imageSrc = `/assets/rosebush00${checked}.webp`
    } else {
        imageSrc = `/assets/rosebush0090.webp`
    }


  return (
      <>
      <Flower2Styled>
        <Image src = {imageSrc} alt = "rosebush" fill="true" />
        </Flower2Styled>
    </>
    )
}