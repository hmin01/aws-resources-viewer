import React from 'react';
import { lazy, useCallback, useEffect, useRef, useState } from 'react';
// Component
import { StyledContainer } from './styles/Layout';
const Regions = lazy(() => import('./Regions'));
const Resources = lazy(() => import('./Resources'));
const Services = lazy(() => import('./Services'));
// Data
import regionDF from '../static/regions';
import serviceDF from '../static/services';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
// State
import { scanFileSelector } from '../models/state';

/** [Component] 메인 컴포넌트 */
const Viewer: React.FC<any> = (): JSX.Element => {
  // 스캔 파일명
  const { contents, state } = useRecoilValueLoadable(scanFileSelector);
  // 스캔 데이터
  const [data, setData] = useState<any>({});
  // 선택된 리전
  const [region, setRegion] = useState<string>('');
  // 선택된 서비스
  const [service, setService] = useState<string>('');
  // 스크롤 이벤트 처리를 위한 Ref
  const ref = useRef<any>(undefined);

  // 스캔 데이터 불러오기
  useEffect(() => {
    if (contents && state === 'hasValue') {
      fetch(`${import.meta.env.VITE_API_SERVER}/scan/${contents}`).then((res: any) => {
        if (res.status < 400) return res.json();
        else return {};
      }).then((data: any) => {
        if ('message' in data) {
          setData(JSON.parse(data.message));
        } else {
          console.error('[ERROR] Failed to fetch');
        }
      });
    }
  }, [contents, state]);

  /** [Event handler] 리전 선택 초기화 */
  const onClearForRegion = useCallback(() => { setRegion(''); setService('') }, []);
  /** [Event handler] 서비스 선택 초기화 */
  const onClearForService = useCallback(() => { setService('') }, []);
  /** [Event handler] 리전 선택 */
  const onSelectToRegion = useCallback((value: string) => { setRegion(value); setService(''); scrollTop(ref) }, [ref]);
  /** [Event handler] 서비스 선택 */
  const onSelectToService = useCallback((value: string) => { setService(value); scrollTop(ref) }, [ref]);
  
  // 컴포넌트 반환
  return (
    <div ref={ref}>
      <StyledContainer>
        {region === '' ? (
          <Regions data={data} onSelectToRegion={onSelectToRegion} regionDF={regionDF} />
        ) : service === '' ? (
          <Services data={data[region].resources} onClearForRegion={onClearForRegion} onSelectToService={onSelectToService} region={region} regionDF={regionDF} serviceDF={serviceDF} usage={data[region].usage} />
        ) : (
          <Resources data={data[region].resources[service]} onClearForService={onClearForService} service={service} serviceDF={serviceDF} />
        )}
      </StyledContainer>
    </div>
  );
}

/** [Internal Function] Document 상단으로 스크롤 이동 */
const scrollTop = (ref: React.MutableRefObject<any>) => {
  if (ref !== undefined) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
}

export default Viewer;