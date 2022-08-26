import React from 'react';
import { useRecoilValue } from 'recoil';
// Component
import Pretreatment from './Pretreatment';
import Process from './Process';
import Viewer from './Viewer';
// State
import { roleSelector, scanFileSelector } from '../models/state';

const Main: React.FC<any> = (): JSX.Element => {
  // Role 설정 상태
  const role: string | undefined = useRecoilValue(roleSelector);
  // 스캔 파일
  const scanFile: string | undefined = useRecoilValue(scanFileSelector);

  // 컴포넌트 반환
  return (
    <>
      {role ? scanFile && scanFile !== '' ? (<Viewer />) : (<Process />) : (<Pretreatment />)}
    </>
  );
}

export default Main;