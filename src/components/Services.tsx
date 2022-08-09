import React, { Suspense, useMemo } from 'react';
// Component
import { Col, Row } from 'antd';
import { Card, PageHeader } from './Layout';
import { StyledContainerMargin } from './styles/Layout';
import { useCallback } from 'react';
import { StyledServiceCard } from './styles/Card';
// Icon
import { IconApiGateway, IconCloudFront, IconCognito, IconDynamoDB, IconEBS, IconEC2, IconECR, IconECS, IconEFS, IconElasticache, IconElasticBeanstalk, IconELB, IconEventBridge, IconLambda, IconQLDB, IconRDS, IconS3, IconSES, IconSNS, IconSQS } from './ServiceIcons';
import { StyledItemEmpty } from './styles/List';

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
    <Col key={service} span={6}>
      <ServiceListItem onSelect={onSelect} resourceCount={resources[service] === null ? 0 : resources[service].length} service={service} serviceFullName={serviceDF[service].full} serviceName={serviceDF[service].main} />
    </Col>
  )), [resources]);

  // 컴포넌트 반환
  return (
    <>
      {/* {serviceDF ? (
        <StyledList>
          {usage ? items : (<div className='empty'>해당 리전에서 이용 중인 서비스가 없습니다.</div>)}
        </StyledList>
      ) : (<></>)} */}
      {serviceDF ? (
        <Row gutter={[16, 16]}>
          {usage ? items : (<StyledItemEmpty>해당 리전에서 이용 중인 서비스가 없습니다.</StyledItemEmpty>)}
        </Row>
      ) : (<></>)}
    </>
  );
}
/** [Internal Component] 서비스 목록 아이템 */
const ServiceListItem: React.FC<any> = ({ onSelect, resourceCount, service, serviceFullName, serviceName }): JSX.Element => {
  /** [Event handler] 클릭 이벤트 */
  const onClick = useCallback(() => onSelect(service), [service, onSelect]);
  // Icon
  const icon: JSX.Element = useMemo(() => {
    switch (service) {
      case 'apigateway':
        return IconApiGateway;
      case 'cloudfront':
        return IconCloudFront;
      case 'cognito':
        return IconCognito;
      case 'dynamodb':
        return IconDynamoDB;
      case 'ebs':
        return IconEBS;
      case 'ec2':
        return IconEC2;
      case 'ecs':
        return IconECS;
      case 'ecr':
        return IconECR;
      case 'efs':
        return IconEFS;
      case 'elb':
        return IconELB;
      case 'elasticache':
        return IconElasticache;
      case 'elasticbeanstalk':
        return IconElasticBeanstalk;
      case 'eventbridge':
        return IconEventBridge;
      case 'lambda':
        return IconLambda;
      case 'qldb':
        return IconQLDB;
      case 'rds':
        return IconRDS;
      case 's3':
        return IconS3;
      case 'ses':
        return IconSES;
      case 'sns':
        return IconSNS;
      case 'sqs':
        return IconSQS;
      default:
        return (<></>);
    }
  }, [service]);

  // 컴포넌트 반환
  return (
    <StyledServiceCard onClick={onClick}>
      <Suspense fallback={(<></>)}>
        <div className='icon'>{icon}</div>
        <div className='content'>
            <h4 className='title'>{serviceName}</h4>
            <>{serviceFullName ? (<p className='subTitle'>{serviceFullName}</p>): (<></>)}</>
        </div>
        <div className='count'>
          {resourceCount}
        </div>
      </Suspense>
    </StyledServiceCard>
  );
}

export default Services;