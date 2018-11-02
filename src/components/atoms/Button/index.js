import React from 'react'
import T from 'proptypes'
import {
  compose,
  defaultProps,
  setDisplayName,
  setPropTypes,
} from 'recompose'
import styled from 'react-emotion'

import * as enums from '../../enums'
import {
  themed,
  themedBy,
  readableColor,
  shadeBy,
  transparentizeBy,
} from '../../theme'
import Spinner from '../Spinner'


const sizeToVerticalPadding = size => ({
  [enums.Size.X_SMALL]: enums.Spacing.XX_SMALL,
  [enums.Size.SMALL]: enums.Spacing.XX_SMALL,
  [enums.Size.LARGE]: enums.Spacing.SMALL,
  [enums.Size.X_LARGE]: enums.Spacing.SMALL,
})[size] || enums.Spacing.X_SMALL


const sizeToHorizontalPadding = size => ({
  [enums.Size.X_SMALL]: enums.Spacing.X_SMALL,
  [enums.Size.SMALL]: enums.Spacing.SMALL,
  [enums.Size.LARGE]: enums.Spacing.X_LARGE,
  [enums.Size.X_LARGE]: enums.Spacing.XXX_LARGE,
})[size] || enums.Spacing.MEDIUM


const sizeToFontSize = size => ({
  [enums.Size.X_SMALL]: '0.6rem',
  [enums.Size.SMALL]: '0.7rem',
  [enums.Size.LARGE]: '0.85rem',
  [enums.Size.X_LARGE]: '1.1rem',
})[size] || '0.75rem';


const StyledButton = styled('button')`
  cursor: pointer;
  display: inline-block;
  position: relative;
  border: 2px solid;
  overflow: hidden;

  padding: ${themedBy('spacing', 'size', sizeToVerticalPadding)}
           ${themedBy('spacing', 'size', sizeToHorizontalPadding)};
  border-radius: ${themed('border.radius.slight')};
  font-size: ${props => sizeToFontSize(props.size)};
  font-weight: 600;
  text-transform: uppercase;
  transition: ${themed('animation.timing.very_fast')} ease-in-out;
  transition-property: transform, color, background-color, box-shadow;

  &:not([disabled]) {
    color: ${themed('component.button.color.base')};
    background: ${themed('component.button.background.base')};
    border-color: ${themedBy('palette', 'color')};
    box-shadow: ${themed('shadow.elevation_2')};
  }

  &:focus:not([disabled]) {
    outline: none;
    box-shadow: 0 0
                0
                ${themed('border.width.thicker')}
                ${compose(transparentizeBy(0.75),
                          shadeBy(0.3),
                          themedBy('palette', 'color'))};
  }

  &:hover:not([disabled]) {
    color: ${compose(readableColor, themedBy('palette', 'color'))};
    background: ${themedBy('palette', 'color')};
  }

  &:active:not([disabled]) {
    color: ${compose(readableColor, shadeBy(0.2), themedBy('palette', 'color'))};
    background: ${compose(shadeBy(0.2), themedBy('palette', 'color'))};
    box-shadow: none;
    transform: scale(0.98);
  }

  &[disabled] {
    cursor: not-allowed;
    color: ${themed('component.button.color.disabled')};
    background: ${themed('component.button.background.disabled')};
    border-color: ${themed('component.button.border.disabled')};
    text-shadow: ${themed('component.button.text_shadow.disabled')};
  }
`


const SpinnerContainer = styled('div')`
  position: absolute;
  display: inline-block;
  opacity: ${props => props.isBusy ? 1 : 0};
  transition: ${themed('animation.timing.very_fast')} ease-in-out;
  transition-property: opacity, transform;
  transform: translateZ(0)
             translateX(-50%)
             translateY(${props => props.isBusy ? '-100%' : '100%'});
`


const StyledSpinner = styled(Spinner)`
  display: inline-block;
`


const ButtonContent = styled('div')`
  opacity: ${props => props.isBusy ? 0 : 1};
  transition: ${themed('animation.timing.very_fast')} ease-in-out;
  transition-property: opacity, transform;
  transform: translateZ(0) translateY(${props => props.isBusy ? '-100%' : 0});
`


export const Button = compose(
  setDisplayName('Atom.Button'),
  defaultProps({
    isDisabled: false,
    isBusy: false,
    color: enums.Color.DEFAULT,
    size: enums.Size.DEFAULT,
    icon: enums.Icon.NONE,
    rightIcon: enums.Icon.NONE,
    onClick: null,
  }),
)(({
  children,
  isDisabled,
  isBusy,
  color,
  size,
  icon,
  rightIcon,
  onClick,
}) => (
  <StyledButton
    disabled={isDisabled}
    color={color}
    size={size}
    onClick={onClick}
  >
    <ButtonContent isBusy={isBusy}>
      {icon && <Icon name={icon} />}
      {icon && ' '}
      {children}
    </ButtonContent>
    <SpinnerContainer isBusy={isBusy}>
    <StyledSpinner
      isBusy={isBusy}
      color={enums.Intent.INFO}
      size={enums.Size.X_SMALL} />
    </SpinnerContainer>
  </StyledButton>
))


export default Button
