import React, { useEffect } from 'react';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
// Component
import { Button, Form, Input, Modal, Spin } from 'antd';
import { NotionRenderer } from 'react-notion';
import { StyledBody, StyledButtonForm, StyledModalContent, StyledHeader, StyledQuestion, StyledSection, StyledNotion } from './styles/Pretreatment';
import { StyledContainer } from './styles/Layout';
// Icon
import { IoChevronForward } from 'react-icons/io5';
// State
import { roleSelector } from '../models/state';
// Style
import 'react-notion/src/styles.css'
// Util
import { createNotification } from '../utils/notification';

const Pretreatment: React.FC<any> = (): JSX.Element => {
  // 팝업 표시 상태 (Notion 팝업)
  const [visibleH, setVisibleH] = useState<boolean>(false);
  // 팝업 표시 상태 (Input 팝업)
  const [visibleI, setVisibleI] = useState<boolean>(false);
  // Notion 불러오기 상태
  const [notion, setNotion] = useState<any>(undefined);
  // Role 설정 함수
  const setRole = useSetRecoilState(roleSelector);
  // Form 객체
  const [form] = Form.useForm();

  /** [Event handler] 팝업 닫기 (Input 팝업) */
  const onCancelI = useCallback(() => {
    // 팝업 표시 상태 (false)
    setVisibleI(false);
    // Form 초기화
    form.resetFields();
  }, []);
  /** [Event handler] 팝업 닫기 (Notion 팝업) */
  const onCancelH = useCallback(() => setVisibleH(false), []);
  /** [Event handler] 팝업 열기 (Input 팝업) */
  const onOpenI = useCallback(() => setVisibleI(true), []);
  /** [Event handler] 팝업 열기 (Notion 팝업) */
  const onOpenH = useCallback(() => setVisibleH(true), []);
  /** [Event handler] Role ARN 설정 */
  const onSetting = useCallback((values: any) => {
    // Setting
    setRole(values.role);
    setVisibleI(false);
    // Notification
    createNotification('success', 'Successful', 'Role ARN을 설정하였습니다.');
  }, []);

  /** [Fetch] Notion 페이지 Invoke */
  useEffect(() => {
    fetch(import.meta.env.VITE_NOTION).then((res: any) => res.json()).then((data: any) => setNotion(data));
  }, []);

  // 컴포넌트 반환
  return (
    <StyledContainer>
      <StyledBody>
        <StyledHeader>
          <b>A</b>ws <b>R</b>esources <b>S</b>canner
        </StyledHeader>
        <StyledSection>
          <p>AWS 계정 내에서 사용 중인 리소스들을 조회하고,<br/>조회된 결과를 목록화하여 시각화된 데이터를 제공해주는 서비스입니다.</p>
        </StyledSection>
        <StyledSection>
          <h5>Store</h5>
          <p>조회 결과는 하루(24시간)동안 보존되며, 조회를 다시 진행할 경우에 이전 작업 결과는 즉시 삭제됩니다.</p>
        </StyledSection>
        <StyledSection>
          <h5>Required</h5>
          <p>계정 내의 리소스들을 조회할 수 있는 권한(정책)을 가진 AWS IAM Role이 필요합니다.</p>
          <StyledQuestion onClick={onOpenH}>
            <span className='icon'>
              <IoChevronForward />
            </span>
            <label className='text'>서비스 사용을 위한 Role 설정 방법</label>
          </StyledQuestion>
        </StyledSection>
        <StyledButtonForm>
          <Button onClick={onOpenI} type='primary'>시작하기</Button>
        </StyledButtonForm>
      </StyledBody>
      <Modal centered footer={[<Button key='submit' onClick={onCancelH} type='primary'>확인</Button>]} onCancel={onCancelH} title='How to set a role' visible={visibleH} width={768}>
        <Spin size='large' spinning={notion === undefined} tip='Loading'>
          <StyledNotion>
            {notion ? (<NotionRenderer blockMap={notion} />) : (<div className='empty'></div>)}
          </StyledNotion>
        </Spin>
      </Modal>
      <Modal onCancel={onCancelI} footer={false} title='Role ARN 입력' visible={visibleI}>
        <StyledModalContent>
          <Form form={form} onFinish={onSetting}>
            <Input.Group compact>
              <Form.Item name='role' rules={[{ required: true, message: 'Role ARN을 입력하세요.' }, { pattern: new RegExp('^arn:aws:iam::[0-9]{12}:role\/[a-zA-Z0-9+=,.@-_/]+'), message: 'Role ARN 형식이 올바르지 않습니다.' }]}>
                <Input placeholder='AWS IAM Role ARN' />
              </Form.Item>
              <Button htmlType='submit' type='primary'>설정</Button>
            </Input.Group>
          </Form>
        </StyledModalContent>
      </Modal>
    </StyledContainer>
  );
}

/** [Internal Function] 공백 확인 함수 */
const checkBlank = (value: string): boolean => {
  return value.replace(/^\s|\s$/g, '') === '';
}
/** [Internal Function] Role Arn 패턴 확인 함수 */
const checkPattern = (value: string): boolean => {
  if (checkBlank(value)) return false;
  // Arn 패턴 확인
  const arnPattern: RegExp = new RegExp('^arn:aws:iam::[0-9]{12}:role\/[a-zA-Z0-9+=,.@-_/]+');
  return arnPattern.test(value);
}

export default Pretreatment;