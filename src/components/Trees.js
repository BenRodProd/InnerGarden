import Image from "next/image";
import styled from "styled-components";

const TreesStyled = styled.div`
position: absolute;
left:0;
top:0;
width: 100%;
height: 100%;
z-index:2;
object-fit: cover;
`

export default function Trees({checked}) {
    let imageSrc
    if (checked <= 90) {
    imageSrc = `/assets/trees00${checked}.webp`
    } else {
        imageSrc = `/assets/trees0090.webp`
    }


  return (
      <>
      <TreesStyled>
        <Image src = {imageSrc} alt = "trees" fill="true" />
        </TreesStyled>
    </>
    )
}