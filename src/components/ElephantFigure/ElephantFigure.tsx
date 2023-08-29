import React from 'react';
import { IFigure } from 'types';
import whiteElephant from '../../images/whiteElephant.png';
import blackElephant from '../../images/blackElephant.png';

export const ElephantFigure: React.FC<IFigure> = (props) => {
  const { color } = props;

  const imagesMap = {
    white: whiteElephant,
    black: blackElephant,
  };

  return <img src={imagesMap[color]} />;
};
