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
} from 'recompose'
import styled from 'react-emotion'
import {withTheme} from 'emotion-theming'

import * as enums from '../../enums'
import {
  themed,
  themedBy,
  readableColor,
  shadeBy,
  transparentizeBy,
} from '../../theme'


const sizeToIconSize = size => ({
  [enums.Size.X_SMALL]: '1rem',
  [enums.Size.SMALL]: '1.5rem',
  [enums.Size.LARGE]: '3rem',
  [enums.Size.X_LARGE]: '5rem',
})[size] || '2rem'


const sizeToVertical = spacing => ({
  [enums.Spacing.XXX_SMALL]: '1rem',
  [enums.Spacing.XX_SMALL]: '1rem',
  [enums.Spacing.X_SMALL]: '1rem',
  [enums.Spacing.SMALL]: '1.5rem',
  [enums.Spacing.LARGE]: '3rem',
  [enums.Spacing.X_LARGE]: '5rem',
  [enums.Spacing.XX_LARGE]: '5rem',
  [enums.Spacing.XXX_LARGE]: '5rem',
})[spacing] || '1.5rem'


const StyledSpacer = styled('div')`
  display: inline-block;
  width: ${themedBy('spacing', 'spacing')};
  height: ${themedBy('spacing', 'spacing')};
`


export const Spacer = compose(
  setDisplayName('Atom.Spacer'),
  setPropTypes({
    //size: T.string.isRequired,
  }),
)(StyledSpacer)


export default Spacer
