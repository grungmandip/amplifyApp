import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  height: 100vh;
  padding: 10px;

  background: #83a4d4; /* fallback for old browsers */
  background: linear-gradient(to left, #b6fbff, #83a4d4);

  color: #171212;
`;

const ItemCenter = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`;

const ItemRight = styled.div`
  display: grid;
  align-items: right;
  justify-content: right;
`;

const ItemLeft = styled.div`
  display: grid;
  align-items: left;
  justify-content: left;
`;

const Card = styled.div`
  margin: 5px;
  padding: 15px;
  box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2); 
  border-radius: 5px;
  background-color: rgba(255, 255, 255, .15);
  
  backdrop-filter: blur(5px);
`;

const H4 = styled.h4`
  font-size: 38px;
  font-weight: 300;
  letter-spacing: 2px;
  margin: 0 30px;
  text-align: center;
`;

export {
    StyledContainer,
    Card,
    ItemCenter,
    ItemLeft,
    ItemRight,
    H4,
}