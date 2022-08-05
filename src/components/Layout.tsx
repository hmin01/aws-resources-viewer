import React from 'react';
// Component
import { StyledPageHeader } from './styles/Layout';
// Icon
import { IoChevronBack } from 'react-icons/io5';
import { StyledCard } from './styles/Card';

/** [Internal Component] 아이템 카드 */
export const Card: React.FC<any> = ({ label, value }): JSX.Element => {
  return (
    <StyledCard>
      <label className='label'>{label}</label>
      <label className='value'>{value}</label>
    </StyledCard>
  )
}
export const PageHeader: React.FC<any> = ({ children, onBack, subtitle, title }): JSX.Element => {
  return (
    <StyledPageHeader>
      <div className='header'>
        <>
          {onBack ? (
            <span className='back' onClick={onBack}>
              <IoChevronBack />
            </span>
          ) : (<></>)}
        </>
        <h2 className='title'>{title}</h2>
        <>
          {subtitle ? (
            <h4 className='subtitle'>{subtitle}</h4>
          ) : (<></>)}
        </>
      </div>
      <div className='extra'>{children}</div>
    </StyledPageHeader>
  )
}