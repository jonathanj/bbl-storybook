import React from 'react'
import T from 'proptypes'
import {
  compose,
  defaultProps,
  setDisplayName,
  setPropTypes,
} from 'recompose'
import styled, {keyframes} from 'react-emotion'

import * as enums from '../../enums'
import {
  themed,
  themedBy,
  readableColor,
  shadeBy,
  transparentizeBy,
} from '../../theme'


const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`


const sizeToWidth = size => ({
  [enums.Size.X_SMALL]: '1rem',
  [enums.Size.SMALL]: '1.25rem',
  [enums.Size.LARGE]: '3rem',
  [enums.Size.X_LARGE]: '4rem',
})[size] || '1.75rem';


const sizeToBorderWidth = size => ({
  [enums.Size.X_SMALL]: '0.1333rem',
  [enums.Size.SMALL]: '0.1666rem',
  [enums.Size.LARGE]: '0.3333rem',
  [enums.Size.X_LARGE]: '0.4333rem',
})[size] || '0.2333rem';


const StyledSpinner = styled('div')`
  display: inline-block;
  vertical-align: middle;

  &, &:after {
    border-radius: 50%;
    width: ${props => sizeToWidth(props.size)};
    height: ${props => sizeToWidth(props.size)};
  }

  position: relative;
  border: ${props => sizeToBorderWidth(props.size)}
          solid
          ${compose(transparentizeBy(0.75), themedBy('palette', 'color'))};
  border-left-color: ${compose(shadeBy(0.25), themedBy('palette', 'color'))};
  transform: translateZ(0) translate(-50%);
  animation: ${spin} 3.1s infinite linear;
`


export const Spinner = compose(
  setDisplayName('Atom.Spinner'),
  defaultProps({
    color: enums.Color.DEFAULT,
    size: enums.Size.DEFAULT,
  }),
)(StyledSpinner)

export default Spinner
