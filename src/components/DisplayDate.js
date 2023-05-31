import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledDate = styled.h2`
  z-index: 15;
  position: absolute;
  top: 7rem;
  color: rgba(255,255,255,0.8);
  font-size: 4rem;
`;

export default function DisplayDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      setCurrentDate(date.toDateString());
    };

  
    updateDate();

    const interval = setInterval(updateDate, 100000);

    return () => clearInterval(interval);
  }, []);

  return <StyledDate>{currentDate}</StyledDate>;
}
