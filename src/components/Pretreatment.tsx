import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
// Component
import { motion } from 'framer-motion';
import { StyledContainer } from './styles/Layout';
import { Button, Form, Input, Modal, Spin } from 'antd';
import { NotionRenderer } from 'react-notion';
// Icon
import { IoChevronForward, IoRefreshCircleOutline, IoSearchCircleOutline } from 'react-icons/io5';
// State
import { roleSelector, scanFileSelector } from '../models/state';
// Style
import 'react-notion/src/styles.css'
// Util
import { createNotification } from '../utils/notification';

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
  .ant-form-item {
    margin-bottom: 8px;
  }
  .howto {
    align-items: center;
    color: #08979c;
    display: flex;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.4;
    text-decoration: underline;
    .icon {
      align-items: center;
      display: flex;
      justify-content: center;
    }
    .text {
      cursor: pointer;
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
const StyledNotion = styled.div`
  .empty {
    padding: 32px;
  }
  .notion-code {
    font-size: 14px;
    padding: 16px 20px;
  }
  .notion-h3 {
    font-size: 18px;
  }
  .notion-h3:first-child {
    margin-top: 0;
  }
  .notion-text {
    font-size: 14px;
  }
`;

const Pretreatment: React.FC<any> = (): JSX.Element => {
  const [role, setRole] = useRecoilState(roleSelector);
  const [scanFile, setScanFile] = useRecoilState(scanFileSelector);

  const [notion, setNotion] = useState<any>(undefined);
  const [spinning, setSpinning] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [validate, setValidate] = useState<any>(undefined);
  const [visible, setVisible] = useState<boolean>(false);

  /** [Event handler] 팝업 닫기 */
  const onClose = useCallback(() => setVisible(false), []);
  /** [Event handler] Input 데이터 변경 */
  const onChange = useCallback((e: any) => !checkBlank(e.target.value) ? setValidate(undefined): undefined, []);
  /** [Event handler] 팝업 열기 */
  const onOpen = useCallback(() => setVisible(true), []);
  /** [Event handler] Role 재설정 */
  const onReset = useCallback(() => setStep(1), []);
  /** [Event handler] 리소스 스캔 */
  const onScan = useCallback(async () => {
    // 스캔 파일명 생성
    const key: string = new Date().getTime().toString();
    // Set spinning
    setSpinning(true);
    // 스캔 API 호출
    const response = await fetch(`${import.meta.env.VITE_API_SERVER}/scan`, {
      body: JSON.stringify({ key: `${key}.json`, role }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    });
    // Process
    if (response.status >= 400) {
      createNotification('error', 'Failed scan', (await response.json()).message);
      setScanFile('');
    } else {
      setScanFile(key);
    }
    // setScanFile('1661413112011');
  }, [role]);
  /** [Event handler] Role ARN 설정 */
  const onSetting = useCallback((value: string) => {
    if (!checkPattern(value)) {
      // Setting
      setValidate('error');
      // Notification
      createNotification('error', 'Invalid ARN', 'The role arn format is not valid. Please check it again and enter it.');
    } else {
      // Setting
      setRole(value);
      setValidate('success');
      // Notification
      createNotification('success', 'Successful', 'Setup completed with the entered arn.');
      // Set step
      setStep(2);
    }
  }, []);
  // 스캔 완료 후, spinning 종료
  useEffect(() => scanFile ? setSpinning(false) : undefined, [scanFile]);

  useEffect(() => {
    fetch(`https://notion-api.splitbee.io/v1/page/Set-a-role-for-scan-4fd28d108f0c4bed85acf9de9e1cc07b`).then((res: any) => res.json()).then((data: any) => setNotion(data));
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
              <a className='howto' onClick={onOpen}>
                <span className='icon'>
                  <IoChevronForward />
                </span>
                <label className='text'>How to set a role?</label>
              </a>
            </div>
          </StyledForm>
          <div hidden={step < 2}>
            <Spin size='large' tip='Scanning' spinning={spinning}>
              <StyledButtonForm>
                <FuncButton icon={<IoRefreshCircleOutline />} onClick={onReset} text='Reset' />
                <FuncButton icon={<IoSearchCircleOutline />} onClick={onScan} text='Scan' />
              </StyledButtonForm>
            </Spin>
          </div>
        </div>
      </StyledSection>
      <Modal footer={[<Button key='submit' onClick={onClose} type='primary'>OK</Button>]} onCancel={onClose} title='How to set a role' visible={visible} width={768}>
        <Spin size='large' spinning={notion === undefined} tip='Loading'>
          <StyledNotion>
            {notion ? (<NotionRenderer blockMap={notion} />) : (<div className='empty'></div>)}
          </StyledNotion>
        </Spin>
      </Modal>
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