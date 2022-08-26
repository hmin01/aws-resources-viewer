import React from 'react';
import { useRecoilValue } from 'recoil';
// Component
import Pretreatment from './Pretreatment';
import Viewer from './Viewer';
// State
import { scanFileSelector } from '../models/state';

const Main: React.FC<any> = (): JSX.Element => {
  const scanFile: string | undefined = useRecoilValue(scanFileSelector);
  // 컴포넌트 반환
  return (
    <>
      {scanFile && scanFile !== '' ? (<Viewer />) : (<Pretreatment />)}
    </>
  );
}

export default Main;