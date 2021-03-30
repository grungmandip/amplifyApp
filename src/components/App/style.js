import React from 'react';
import styled from 'styled-components';

const StyledContainerPc = styled.div`
  display: flex;
  flex: auto;
  flex-direction: column;
  width: 100%;
  min-width: 1024px;
  min-height: 100vh;
  align-items: stretch;
  margin: 0 auto;
  padding: 10px;
  font-size: 1.4rem;

  background: #83a4d4; /* fallback for old browsers */
  background: linear-gradient(to left, #b6fbff, #83a4d4);

  color: #171212;
`;

const StyledContainerSp = styled.div`
  display: block;
  width: 100%;
  min-height: 100vh;
  align-items: stretch;
  margin: 0 auto;
  padding: 10px;
  font-size: 1.3rem;

  background: #83a4d4; /* fallback for old browsers */
  background: linear-gradient(to left, #b6fbff, #83a4d4);

  color: #171212;
`;

const ItemCenter = styled.div`
  margin: 10px;
  font-size: 1.7rem;
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
  border-radius: 15px;
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
    StyledContainerPc,
    StyledContainerSp,
    Card,
    ItemCenter,
    ItemLeft,
    ItemRight,
    H4,
}