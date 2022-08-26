import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
// Component
import { motion } from 'framer-motion';
import { StyledContainer } from './styles/Layout';
import { Spin } from 'antd';
// Icon
import { IoRefreshCircleOutline, IoSearchCircleOutline } from 'react-icons/io5';
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

const Process: React.FC<any> = (): JSX.Element => {
  const [role, setRole] = useRecoilState(roleSelector);
  const [scanFile, setScanFile] = useRecoilState(scanFileSelector);
  const [spinning, setSpinning] = useState<boolean>(false);

  /** [Event handler] Role 재설정 */
  const onReset = useCallback(() => setRole(undefined), []);
  /** [Event handler] 리소스 스캔 */
  const onScan = useCallback(async () => {
    // 스캔 파일명 생성
    const key: string = new Date().getTime().toString();
    // Loading UI 설정
    setSpinning(true);
    // Process
    try {
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
    } catch (err) {
      createNotification('error', 'Failed scan', <>내부적인 문제로 인해 작업을 실패하였습니다.<br/>다시 시도해주세요.</>);
      setScanFile('');
      setSpinning(false);
    }
    // setScanFile('1661413112011');
  }, [role]);
  // 스캔 완료 후, spinning 종료
  useEffect(() => scanFile ? setSpinning(false) : undefined, [scanFile]);

  // AWS 계정 ID 추출
  const account: string | undefined = useMemo(() => role ? role.split(':')[4] : '', [role]);
  // Role 이름 추출
  const roleName: string | undefined = useMemo(() => role ? role.split('/').pop() : '', [role]);

  // 컴포넌트 반환
  return (
    <StyledContainer>
      <StyledSection>
        <Spin size='large' tip='Scanning' spinning={spinning}>
          <div>
            <p>스캔 대상 Account: {account}</p>
            <p>현재 설정된 Role: {roleName}</p>
            <p>스캔 작업은 10초에서 최대 3분까지 소요됩니다.</p>
          </div>
          <StyledButtonForm>
            <FuncButton icon={<IoRefreshCircleOutline />} onClick={onReset} text='Reset' />
            <FuncButton icon={<IoSearchCircleOutline />} onClick={onScan} text='Scan' />
          </StyledButtonForm>
        </Spin>
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

export default Process;