import React, { forwardRef } from 'react'
import StyledForm from './styles'
import PropTypes from 'prop-types'

const Select = forwardRef(({ children, onChange, onBlur, name, label }, ref) => {
  return (
    <>
      <label htmlFor='countries'>{label}</label>
      <StyledForm.SelectWrapper>
        <select name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
          {children}
        </select>
      </StyledForm.SelectWrapper>
    </>
  )
})

Select.displayName = 'Select'

const Form = ({ children, onSubmit, title, ...rest }) => {
  return (
    <>
      <StyledForm.Container>
        {title ? <h1>{title}</h1> : null}
        <StyledForm.Form onSubmit={onSubmit} {...rest}>
          <StyledForm.InputFields>
            {children}
          </StyledForm.InputFields>
        </StyledForm.Form>
      </StyledForm.Container>
    </>
  )
}

export default Form
export { Select }

Form.propTypes = {
  onSubmit: PropTypes.func,
  title: PropTypes.string
}
