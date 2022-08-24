import React, { useCallback, useMemo, useState } from 'react';
// Component
import { motion } from 'framer-motion';
import { StyledContainer } from './styles/Layout';
// Icon
import { IoRefreshCircleOutline, IoSearchCircleOutline } from 'react-icons/io5';
// State
import { roleSelector, transformSelector } from '../models/state';

import styled from 'styled-components';
import { Form, Input, notification } from 'antd';
import { useRecoilState, useSetRecoilState } from 'recoil';
const StyledSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;
const StyledForm = styled(motion.div)`
  overflow: hidden;
  width: 340px;
  .header {
    margin-bottom: 32px;
    text-align: center;
    .title {
      color: #434343;
      font-size: 24px;
      font-weight: 700;
      line-height: 1.4;
      margin-bottom: 8px;
      margin-top: 0;
    }
    .subtitle {
      color: #8C8C8C;
      font-size: 15px;
      font-weight: 400;
      line-height: 1.2;
      margin: 0;
    }
  }
`;
const StyledButtonForm = styled(motion.div)`
  display: flex;
  justify-content: center;
`;
const StyledButton = styled(motion.button)`
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #E7EAEC;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 24px;
  padding: 32px 48px;
  &:first-child {
    margin-left: 0;
  }
  .icon {
    align-items: center;
    display: flex;
    font-size: 48px;
    justify-content: center;
  }
  .text {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.3;
    margin-bottom: 0;
    margin-top: 4px;
  }
`;

const Pretreatment: React.FC<any> = (): JSX.Element => {
  const [role, setRole] = useRecoilState(roleSelector);
  const setTransform = useSetRecoilState(transformSelector);

  const [step, setStep] = useState<number>(1);
  const [validate, setValidate] = useState<any>(undefined);

  /** [Event handler] Input 데이터 변경 */
  const onChange = useCallback((e: any) => !checkBlank(e.target.value) ? setValidate(undefined): undefined, []);
  /** [Event handler] Role 재설정 */
  const onReset = useCallback(() => setStep(1), []);
  /** [Event handler] 리소스 스캔 */
  const onScan = useCallback(async () => {

  }, []);
  /** [Event handler] Role ARN 설정 */
  const onSetting = useCallback((value: string) => {
    if (!checkPattern(value)) {
      // Setting
      setValidate('error');
      // Notification
      notification.error({
        message: 'Invalid ARN',
        description: 'The role arn format is not valid. Please check it again and enter it.'
      });
    } else {
      // Setting
      setRole(value);
      setValidate('success');
      // Notification
      notification.success({
        message: 'Successful',
        description: 'Setup completed with the entered arn.'
      });
      // Set step
      setStep(2);
    }
  }, []);

  // 컴포넌트 반환
  return (
    <StyledContainer>
      <StyledSection>
        <div>
          <StyledForm hidden={step > 1}>
            <div className='header'>
              <h3 className='title'>Enter a role arn</h3>
              <p className='subtitle'>This input is not stored separately as a one-time operation.</p>
            </div>
            <div className='content'>
              <Form>
                <Form.Item hasFeedback validateStatus={validate}>
                  <Input.Search placeholder='Your iam role arn' enterButton='Setting' onSearch={onSetting} onChange={onChange} />
                </Form.Item>
              </Form>
            </div>
          </StyledForm>
          <StyledButtonForm hidden={step < 2}>
            <FuncButton icon={<IoRefreshCircleOutline />} onClick={onReset} text='Reset' />
            <FuncButton icon={<IoSearchCircleOutline />} onClick={onScan} text='Scan' />
          </StyledButtonForm>
        </div>
      </StyledSection>
    </StyledContainer>
  );
}

const FuncButton: React.FC<any> = ({ icon, onClick, text }): JSX.Element => {
  return (
    <StyledButton onClick={onClick} whileHover={{ scale: 1.06 }} >
      <span className='icon'>{icon}</span>
      <p className='text'>{text}</p>
    </StyledButton>
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