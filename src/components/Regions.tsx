import React, { useMemo } from 'react';
// Component
import { Col, Divider, Row, Tag } from 'antd';
import { Card, PageHeader } from './Layout';
import { StyledContainerMargin } from './styles/Layout';
import { StyledList, StyledListItem, StyledListItemLabel } from './styles/List';
import { useCallback } from 'react';

/** [Component] 계정 내 리전 페이지 */
const Regions: React.FC<any> = ({ data, onSelectToRegion, regionDF }): JSX.Element => {
  // 글로벌 서비스 사용 유무
  const useGlobal: boolean = useMemo(() => ("global" in data) && ("usage" in data.global) ? data.global.usage : false, [data]);
  // 리전 목록
  const regions: any[] = useMemo(() => Object.keys(data).filter((region: string): boolean => region !== 'global').map((region: string): any => ({ name: region, usage: data[region].usage })), [data]);
  // 사용 중인 리전 수
  const inUse: number = useMemo(() => regions.filter((region: any): boolean => region.usage).length, [regions]);
  // 미사용 리전 수
  const notUse: number = useMemo(() => regions.length - inUse, [regions, inUse]);
  
  // 컴포넌트 반환
  return (
    <StyledContainerMargin>
      <PageHeader title='Regions'>
        <Row gutter={16}>
          <Col span={6}>
            <Card label='사용 가능한 총 리전' value={regions.length} />
          </Col>
          <Col span={6}>
            <Card label='사용 리전' value={inUse} />
          </Col>
          <Col span={6}>
            <Card label='미사용 리전' value={notUse} />
          </Col>
        </Row>
      </PageHeader>
      <RegionList onSelect={onSelectToRegion} regionDF={regionDF} regions={regions} useGlobal={useGlobal} />
    </StyledContainerMargin>
  );
}

/** [Internal Component] 리전 목록 */
const RegionList: React.FC<any> = ({ onSelect, regionDF, regions, useGlobal }): JSX.Element => {
  // 목록 아이템
  const items: JSX.Element[] = useMemo(() => regions.map((region: any): JSX.Element => (
    <RegionListItem key={region.name} onSelect={onSelect} regionName={region.name} regionNameKor={regionDF[region.name]} usage={region.usage} />
  )), [onSelect, regionDF, regions]);

  // 컴포넌트 반환
  return (
    <>
      {regionDF ? (
        <StyledList>
          {useGlobal ? (
            <>
              <RegionListItem key='global' onSelect={onSelect} regionName='global' regionNameKor={regionDF['global']} usage={true} />
              <Divider key='divider' />
            </>
          ) : (<></>)}
          <>{items}</>
        </StyledList>
      ) : (<></>)}
    </>
  )
}
/** [Internal Component] 리전 목록 아이템 */
const RegionListItem: React.FC<any> = ({ onSelect, regionName, regionNameKor, usage }): JSX.Element => {
  /** [Event handelr] 클릭 이벤트 */
  const onClick = useCallback(() => onSelect(regionName), [onSelect, regionName]);

  // 컴포넌트 반환
  return (
    <li className='pr-sm' onClick={onClick}>
      <StyledListItem>
        <StyledListItemLabel>
          {regionName === 'global' ? (
            <>
              <span className='label'>{regionNameKor}</span>
            </>
          ) : (
            <>
              <span className='label'>{regionNameKor}</span>
              <span className='subLabel'>{regionName}</span>
            </>
          )}
        </StyledListItemLabel>
        <>{usage ? (<Tag color='green'>Use</Tag>) : (<Tag color='red'>Not use</Tag>)}</>
      </StyledListItem>
    </li>
  );
}

export default Regions;