import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getSelectedPicture, picturesSelector } from '../reducer';
import ModalPortal from './modal';

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;
const Pictures = () => {
  const pictures = useSelector(picturesSelector);

  const selectedPicture = useSelector(getSelectedPicture);
 
  const dispatch = useDispatch();

  return <>

    <Container>
      {pictures.map((picture, index) => (
        <Image key={index} src={picture.previewFormat} alt={picture.author} onClick={
          () => {
            dispatch({ type: 'SELECT_PICTURE', picture: picture });
          }
        } />
      ))}
    </Container>
    {selectedPicture && <ModalPortal largeFormat={selectedPicture.largeFormat} close={() => {dispatch({type: 'CLOSE_MODAL'}) }} />}

  </>;
};

export default Pictures;
