import React from 'react';
import { useRecoilValue } from 'recoil';
// Component
import Pretreatment from './Pretreatment';
import Viewer from './Viewer';
// State
import { transformSelector } from '../models/state';

const Main: React.FC<any> = (): JSX.Element => {
  const transform: boolean = useRecoilValue(transformSelector);
  // 컴포넌트 반환
  return (
    <>
      {transform ? (<Viewer />) : (<Pretreatment />)}
    </>
  );
}

export default Main;