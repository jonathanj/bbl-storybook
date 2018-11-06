import React from 'react'
import T from 'proptypes'
import {
  branch,
  compose,
  defaultProps,
  renderNothing,
  setDisplayName,
  setPropTypes,
  withProps,
  withState,
  withHandlers,
  withStateHandlers,
} from 'recompose'
import styled, {cx, css} from 'react-emotion'
import {withTheme} from 'emotion-theming'
import * as Feather from 'react-feather'

import * as enums from '../../enums'
import {
  themed,
  themedBy,
  readableColor,
  shadeBy,
  transparentizeBy,
} from '../../theme'


const activeState = props => css`
  border-color: ${themed('component.input.border.color.active')(props)};
  box-shadow: ${themed('component.input.shadow.active')(props)};
`


const readOnlyState = props => css`
  background-color: ${themed('component.input.background.color.readonly')(props)};
  border-color: ${themed('component.input.border.color.readonly')(props)};
`


const disabledState = props => css`
  color: ${themed('component.input.text.color.disabled')(props)};
  background-color: ${themed('component.input.background.color.disabled')(props)};
  border-color: ${themed('component.input.border.color.disabled')(props)};
`


const errorState = props => css`
  border-color: ${themed('component.input.border.color.error')(props)};
  border-width: ${themed('component.input.border.width.error')(props)};
  background-color: ${themed('component.input.background.color.error')(props)};
`


const dynamicStyle = props => cx(
  props.isActive && activeState(props),
  props.isReadOnly && readOnlyState(props),
  props.isDisabled && disabledState(props),
  !props.isActive && props.isError && errorState(props),
)


export const StyledInput = styled('input')`
  min-width: ${themed('component.input.min_width.medium')};
  padding: ${themed('component.input.padding')};
  color: ${themed('component.input.text.color.base')};
  background: ${themed('component.input.background.color.base')};
  border-radius: ${themed('component.input.border.radius')};
  border: ${themed('component.input.border.width.base')}
          solid
          ${themed('component.input.border.color.base')};
  font-size: ${themed('component.input.font.size.base')};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${themed('component.input.text.color.placeholder')};
  }

  ${dynamicStyle}
`


export const Input = compose(
  setDisplayName('Atom.Input'),
  setPropTypes({
    //name: T.string.isRequired,
    isActive: T.bool,
    isDisabled: T.bool,
    isReadOnly: T.bool,
    isError: T.bool,
  }),
  defaultProps({
    isActive: undefined,
    isDisabled: false,
    isReadOnly: false,
    isError: false,
  }),
  withStateHandlers(
    ({isActive}) => ({
      _isActive: isActive,
    }),
    {
      onFocus: ({isActive_}, {isActive}) => () => ({
        _isActive: true,
      }),
      onBlur: ({isActive_}, {isActive}) => () => ({
        _isActive: false,
      }),
    }
  ),
  withProps(
    ({isActive, _isActive, isDisabled, isReadOnly, isError}) => ({
      isActive: (isActive || _isActive) && !isDisabled && !isReadOnly,
      disabled: isDisabled,
      readOnly: isReadOnly,
    })
  ),
)(StyledInput)


export default Input
