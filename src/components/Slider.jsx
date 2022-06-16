import React from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label`
  position: relative;
  width: 36px;
  height: 20px;
  top: 3px;
  left: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-fg-${props => props.theme.theme});
    transition: all 0.4s;
    border-radius: 15px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 4px;
    top: 3px;
    background-color: var(--color-bg-${props => props.theme.theme});
    transition: all 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--color-fg-accent-${props => props.theme.theme});
  }

  input:checked + .slider:before {
    transform: translateX(15px);
    background-color: var(--color-bg-${props => props.theme.theme});
  }
`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;

  .label {
    font: 700 1.2rem var(--font-secondary);
    white-space: nowrap;
  }
`

const Slider = React.forwardRef(({ onChange, onBlur, name, label }, ref) => {
  return (
    <Container>
      <StyledLabel>
        <input type='checkbox' ref={ref} onChange={onChange} onBlur={onBlur} name={name} />
        <span className='slider' />
      </StyledLabel>
      <span className='label'>{label}</span>
    </Container>
  )
})

export default Slider
