import styled from 'styled-components';

/** [Styled Component] 컨테이너 */
export const StyledContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  position: relative;
  width: 1048px;
`;
/** [Styled Component] 컨테이너 여백 */
export const StyledContainerMargin = styled.div`
  padding-bottom: 64px;
  padding-top: 64px;
`;
/** [Styled Component] 페이지 헤더 */
export const StyledPageHeader = styled.div`
  position: relative;
  margin-bottom: 36px;
  user-select: none;
  .header {
    align-items: center;
    display: flex;
    margin-bottom: 16px;
    position: relative;
    .back {
      align-items: center;
      cursor: pointer;
      display: flex;
      font-size: 24px;
      margin-right: 16px;
    }
    .title {
      font-size: 22px;
      font-weight: 600;
      line-height: 28px;
      margin: 0;
    }
    .subtitle {
      color: #bfbfbf;
      font-size: 18px;
      font-weight: 00;
      line-height: 24px;
      margin: 4px 0 0 12px;
    }
  }
`;