import styled from 'styled-components';

export const StyledBody = styled.div`
  padding-top: 72px;
  position: relative;
  width: 100%;
`;
/** [Styled Component] 소개페이지 내 버튼 폼 */
export const StyledButtonForm = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 32px;
`;
/** [Styled Component] 소개페이지 헤더 */
export const StyledHeader = styled.h2`
  color: #8c8c8c;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 16px;
  margin-top: 0;
  b {
    color: #262626;
    font-size: 36px;
    font-weight: 800;
    margin-left: 8px;
  }
  b:first-child {
    margin-left: 0;
  }
`;
/** [Styled Component] 소개페이지 내 모달 콘텐츠 */
export const StyledModalContent = styled.div`
  .ant-input-group .ant-form-item {
    width: calc(100% - 57px);
  }
  .ant-form-item {
    margin-bottom: 0;
  }
  .ant-form-item-explain {
    font-size: 12px;
    font-weight: 500;
    margin-top: 4px;
    padding-left: 2px
  }
`;
/** [Styled Component] 소개페이지 내 Notion 모달 */
export const StyledNotion = styled.div`
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
/** [Styled Component] 소개페이지 내 Role 생성 방법 텍스트 */
export const StyledQuestion = styled.a`
  align-items: center;
  color: #08979c;
  display: flex;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: underline;
  &:hover {
    text-decoration: underline;
  }
  .icon {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-right: 4px;
  }
  .text {
    cursor: pointer;
  }
`;
/** [Styled Component] 소개페이지 섹션 */
export const StyledSection = styled.div`
  margin-bottom: 16px;
  h5 {
    color: #595959;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.4;
    margin-bottom: 6px;
  }
  p {
    color: #595959;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.4;
    margin-bottom: 6px;
    margin-top: 0;
  }
  .box {
    border: 1px solid #E7EAEC;
    border-radius: 2px;
    padding: 16px;
  }
`;