import React, { forwardRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  h1 { text-align: center; }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  alignt-items: center;
  justify-content: space-evenly;
  label {
    margin-bottom: 0.5rem;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
    color: var(--color-fg-accent-${props => props.theme.theme});
  }
  input[type="text"], input[type="password"], input[type="email"] {
    appearance: none;
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--color-bg-${props => props.theme.theme});
    background-color: var(--color-fg-${props => props.theme.theme});
    border: none;
    border-radius: 10px;
    padding: 0.75rem 1.5rem;
  }
  input[type="file"] { display: none; }
  button { margin-top: 2rem; }
  select {
    appearance: none;
    width: min-content;
    font: 2rem var(--font-primary);
    color: var(--color-bg-${props => props.theme.theme});
    background-color: var(--color-fg-${props => props.theme.theme});
    border: none;
    border-radius: 10px;
    height: 2.5em;
    padding: 0 3rem 0 1.5rem;
  }
  textarea {
    font: 2rem var(--font-primary);
    outline: none;
    resize: none;
    color: var(--color-bg-${props => props.theme.theme});
    background-color: var(--color-fg-${props => props.theme.theme});
    border: none;
    border-radius: 10px;
    padding: 1.5rem;
  }
  .error {
    font-size: 1.2rem;
    color: black;
    background-color: var(--color-error-${props => props.theme.theme});
    border-radius: 10px;
    padding: 0.5rem;
    width: min-content;
    white-space: nowrap;
    position: relative;
  }
  .error::before {
    display: block;
    content: '▲';
    font-size: 2rem;
    position: absolute;
    left: 20%;
    top: -20px;
    color: var(--color-error-${props => props.theme.theme});
  }
  @media only screen and (min-width: 60em) {
    input, select, textarea { font-size: 1.5rem !important; }
  }
`

const SelectWrapper = styled.div`
  position: relative;
  width: min-content;
  margin-bottom: 1rem;
  &::after {
    color: var(--color-bg-${props => props.theme.theme});
    content: "▼";
    font-size: 1rem;
    top: 30%;
    right: 15px;
    position: absolute;
    pointer-events: none;
  }
`

const Select = forwardRef(({ children, onChange, onBlur, name, label }, ref) => {
  return (
    <>
      <label htmlFor='countries'>{label}</label>
      <SelectWrapper>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {children}
        </select>
      </SelectWrapper>
    </>
  )
})

Select.displayName = 'Select'

const Form = ({ children, onSubmit, title }) => {
  return (
    <>
      <FormContainer>
        {title ? <h1>{title}</h1> : null}
        <StyledForm onSubmit={onSubmit}>
          <InputFields>
            {children}
          </InputFields>
        </StyledForm>
      </FormContainer>
    </>
  )
}

export default Form
export { Select }

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
  onSubmit: PropTypes.func,
  title: PropTypes.string
}
