import styled from 'styled-components';

/** [Styled Component] 목록 */
export const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  user-select: 0;
  li {
    background-color: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    box-shadow: 0 0 1px 0 rgba(0, 0, 4, 0.1);
    cursor: pointer;
    margin-bottom: 16px;
    padding: 12px 18px;
    transition: all 0.34s;
    &:hover {
      background-color: #fafafa;
      box-shadow: 1px 1px 3px 0 rgba(0, 0, 4, 0.3);
      transform: scale(1.016);
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  li.pr-sm {
    padding-right: 9px;
  }
  .empty {
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    margin: 0;
    padding: 0 4px;
  }
`;
/** [Styled Component] 목록 아이템 */
export const StyledListItem = styled.div`
  align-items: center;
  color: #434343;
  display: flex;
  justify-content: space-between;
`;
/** [Styled Component] 목록 아이템 라벨 */
export const StyledListItemLabel = styled.div`
  position: relative;
  .label {
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
  }
  .subLabel {
    color: #bfbfbf;
    font-size: 13px;
    font-weight: 600;
    line-height: 20px;
    margin-left: 8px;
  }
`;
/** [Styled Component] 빈 아이템  */
export const StyledItemEmpty = styled.div`
  padding: 0 10px;
`;
/** [Styled Component] 목록 아이템 Extra */
export const StyledListItemExtra = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  .count {
    color: #061178;
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
  }
  .label {
    color: #8c8c8c;
    font-size: 13px;
    font-weight: 400;
    line-height: 24px;
    margin-left: 3px;
  }
`;

/** [Styled Component] 리소스 목록 */
export const StyledResourceList= styled.div`
  border: 1px solid #d9d9d9;
  position: relative;
`;
/** [Styled Component] 리소스 아이템 */
export const StyledResourceItem = styled.div`
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  padding: 16px 0;
  &:last-child {
    border-bottom: none;
  }
  .icon {
    align-items: center;
    display: flex;
    justify-content: center;
    width: 128px;
  }
  .content {
    flex: 1;
    .subject {
      color: #262626;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      margin-bottom: 6px;
    }
  }
`;
/** [Styled Component] 리소스 설명 */
export const StyledResourceDescription = styled.div`
  color: #595959;
  font-size: 13px;
  font-weight: 400;
  line-height: 20px;
  .label {
    font-weight: 700;
    margin-bottom: 1px;
  }
  .content {
    margin-bottom: 0;
  }
`;