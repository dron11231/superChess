import React from 'react';
import { IFigure } from 'types';
import whiteKnight from '../../images/whiteKnight2.png';
import blackKnight from '../../images/blackKnight.png';

export const KnightFigure: React.FC<IFigure> = (props) => {
  const { color } = props;

  const imagesMap = {
    white: whiteKnight,
    black: blackKnight,
  };

  return <img src={imagesMap[color]} />;
};
