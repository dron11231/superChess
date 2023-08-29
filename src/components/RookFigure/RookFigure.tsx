import React from 'react';
import whiteRook from '../../images/whiteRook.png';
import blackRook from '../../images/blackRook.png';
import { IFigure } from 'types';

export const RookFigure: React.FC<IFigure> = (props) => {
  const { color } = props;

  const imagesMap = {
    white: whiteRook,
    black: blackRook,
  };

  return <img src={imagesMap[color]} />;
};
