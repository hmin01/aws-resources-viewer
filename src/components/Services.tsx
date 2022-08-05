import React, { useMemo } from 'react';
// Component
import { Col, Row } from 'antd';
import { Card, PageHeader } from './Layout';
import { StyledList, StyledListItem, StyledListItemExtra, StyledListItemLabel } from './styles/List';
import { StyledContainerMargin } from './styles/Layout';
import { useCallback } from 'react';

/** [Component] 리전별 서비스 페이지 */
const Services: React.FC<any> = ({ data, onClearForRegion, onSelectToService, region, regionDF, serviceDF, usage }): JSX.Element => {
  // 사용 중인 서비스 개수
  const usageServiceCount: number = useMemo(() => Object.keys(data).filter((service: string): boolean => data[service] !== null).length, [data]);
  // 전체 리소스 개수
  const resourceCount: number = useMemo(() => Object.keys(data).reduce((acc: number, service: string): number => data[service] !== null ? acc + data[service].length : acc, 0), [data]);

  // 컴포넌트 반환
  return (
    <StyledContainerMargin>
      <PageHeader onBack={onClearForRegion} subtitle={region !== 'global' ? region : undefined} title={regionDF[region]}>
        <Row gutter={16}>
          <Col span={6}>
            <Card label='사용 중인 서비스' value={usageServiceCount} />
          </Col>
          <Col span={6}>
            <Card label='전체 리소스' value={resourceCount} />
          </Col>
        </Row>
      </PageHeader>
      <ServiceList onSelect={onSelectToService} resources={data} serviceDF={serviceDF} usage={usage} />
    </StyledContainerMargin>
  );
}

/** [Internal Component] 서비스 목록 */
const ServiceList: React.FC<any> = ({ onSelect, resources, serviceDF, usage }): JSX.Element => {
  // 목록 아이템
  const items: JSX.Element[] = useMemo(() => Object.keys(resources).filter((service: string): boolean => resources[service] !== null).map((service: string): JSX.Element => (
    <ServiceListItem key={service} onSelect={onSelect} resourceCount={resources[service] === null ? 0 : resources[service].length} service={service} serviceFullName={serviceDF[service].full} serviceName={serviceDF[service].main} />
  )), [resources]);

  // 컴포넌트 반환
  return (
    <>
      {serviceDF ? (
        <StyledList>
          {usage ? items : (<div className='empty'>해당 리전에서 이용 중인 서비스가 없습니다.</div>)}
        </StyledList>
      ) : (<></>)}
    </>
  );
}
/** [Internal Component] 서비스 목록 아이템 */
const ServiceListItem: React.FC<any> = ({ onSelect, resourceCount, service, serviceFullName, serviceName }): JSX.Element => {
  /** [Event handler] 클릭 이벤트 */
  const onClick = useCallback(() => onSelect(service), [service, onSelect]);

  // 컴포넌트 반환
  return (
    <li onClick={onClick}>
      <StyledListItem>
        <StyledListItemLabel>
          <span className='label'>{serviceName}</span>
          <>{serviceFullName ? (<span className='subLabel'>{serviceFullName}</span>): (<></>)}</>
        </StyledListItemLabel>
        <StyledListItemExtra>
          <span className='count'>{resourceCount}</span>
          <span className='label'>개</span>
        </StyledListItemExtra>
      </StyledListItem>
    </li>
  );
}

export default Services;