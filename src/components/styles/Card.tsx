import styled from 'styled-components';

/** [Styled Component] 카드 */
export const StyledCard = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  position: relative;
  .label {
    color: #434343;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    margin: 0;
  }
  .value {
    color: #262626;
    font-size: 15px;
    font-weight: 700;
    line-height: 20px;
    margin: 0;
  }
`;
/** [Styled Component] 카드 (For ECS Cluster) */
export const StyledECSClusterCard = styled.div`
  border: 1px solid #d9d9d9;
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
  .header {
    align-items: center;
    border-bottom: 1px dashed #d9d9d9;
    display: flex;
    justify-content: space-between;
    padding: 12px 18px;
    .name {
      color: #434343;
      font-size: 18px;
      font-weight: 600;
      line-height: 24px;
      margin: 0;
    }
    .desc {
      color: #bfbfbf;
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      margin: 0;
    }
  }
  .empty {
    font-size: 13px;
    font-weight: 400;
    line-height: 17px;
    margin: 0;
    padding: 12px 18px;
  }
`;
/** [Styled Component] 서비스 카드 */
export const StyledServiceCard = styled.div`
  background-color: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 1px 0 rgba(0, 0, 4, 0.1);
  cursor: pointer;
  display: flex;
  height: 100%;
  padding: 12px 14px 12px 16px;
  position: relative;
  transition: all 0.33s;
  &:hover {
    background-color: #fafafa;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 4, 0.3);
    transform: scale(1.04);
  }
  .icon {
    align-items: center;
    display: flex;
    justify-content: center;
    margin-right: 16px;
  }
  .content {
    flex: 1;
    .title {
      font-size: 15px;
      font-weight: 600;
      line-height: 20px;
      margin-bottom: 1px;
    }
    .subTitle {
      color: #bfbfbf;
      font-size: 12px;
      font-weight: 600;
      line-height: 13px;
      margin-bottom: 0;
    }
  }
  .count {
    align-items: end;
    color: #434343;
    display: flex;
    justify-content: flex-end;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    margin-left: 12px;
  }
`;