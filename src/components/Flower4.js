import Image from "next/image";
import styled from "styled-components";

const Flower4Styled = styled.div`
position: relative;
left:0;
top:0;
width: 100%;
height: 100%;
z-index:2;
object-fit: cover;

`

export default function Flower4({checked}) {
    let imageSrc
    if (checked <= 90) {
    imageSrc = `/assets/sorrel00${checked}.webp`
    } else {
        imageSrc = `/assets/sorrel0090.webp`
    }

  return (
      <>
      <Flower4Styled>
        <Image src = {imageSrc} alt = "sorrel"  fill="true" />
        </Flower4Styled>
    </>
    )
}