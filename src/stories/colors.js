import React from 'react'
import styled from 'react-emotion'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {nest, withProps} from 'recompose'

import {
  enumSelect,
  optional,
  randomEnumValue,
  withThemeProvider,
  withCentered,
  VariedArrangement,
  Arrangements,
  Spaced,
} from '../components/storyutils'
import * as enums from '../components/enums'
import {themed, themedBy} from '../components/theme'
//import README from './README.md'


const Swatch = styled('div')`
  width: 3rem;
  height: 3rem;
  background-color: ${themedBy('palette', 'color')};
  box-shadow: ${themed('shadow.elevation_4')};
`


const variationsForEnum = e => propName => {
  const xs = Object.entries(e)
  //xs.sort(([a], [b]) => a > b ? 1 : a < b ? -1 : 0)
  return xs.map(([k, v]) => [k, {[propName]: v}])
}


storiesOf('Design|Colors', module)
  .addDecorator(withThemeProvider())
  .add('Swatches', () => {
    const Component = nest(Spaced, Swatch)
    return (
      <Arrangements label="Colors">
        <VariedArrangement
          label="Intent"
          variations={variationsForEnum(enums.Intent)('color')}>
          {Component}
        </VariedArrangement>
      </Arrangements>
    )})
