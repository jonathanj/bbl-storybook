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
import * as Feather from 'react-feather'

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


export const Icon = compose(
  setDisplayName('Atom.Icon'),
  setPropTypes({
    name: T.string.isRequired,
  }),
  defaultProps({
    //size: enums.Size.DEFAULT,
  }),
  branch(
    ({name}) => !name,
    renderNothing),
  withTheme,
  withProps(
    ({name, size, ...props}) => ({
      Component: Feather[name],
      color: props.color && themedBy('palette', 'color')(props),
      size: sizeToIconSize(size)
    })
  ),
)(({Component, ...props}) => (
  <Component
    style={{verticalAlign: 'middle'}}
    {...props} />
))


export default Icon
