import React from 'react';
import { Board } from 'common/Board/Board';
import s from './style.module.scss';

export const App: React.FC = () => {
  return (
    <div className={s.mainContainer}>
      <Board />
    </div>
  );
};
