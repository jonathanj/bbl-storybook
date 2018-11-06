import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs} from '@storybook/addon-knobs'
import {nest, withProps} from 'recompose'
import styled from 'react-emotion'

import {
  enumSelect,
  optional,
  randomEnumValue,
  withThemeProvider,
  withCentered,
  VariedArrangement,
  Arrangements,
  Spaced,
} from '../../storyutils'
import * as enums from '../../enums'
//import README from './README.md'
import Spacer from './'


const ComponentUnderTest = styled(Spacer)`
  border: 1px solid black;
`


storiesOf('Atoms|Spacer/Arrangements', module)
  .addDecorator(withThemeProvider())
  .add('Variations', () => {
    const Component = nest(Spaced, ComponentUnderTest)
    return (
      <Arrangements label="Variations">
        <VariedArrangement
          label="Spacing"
          variations={[
            ['XXX-Small', {spacing: enums.Spacing.XXX_SMALL}],
            ['XX-Small', {spacing: enums.Spacing.XX_SMALL}],
            ['X-Small', {spacing: enums.Spacing.X_SMALL}],
            ['Small', {spacing: enums.Spacing.SMALL}],
            ['Medium', {spacing: enums.Spacing.MEDIUM}],
            ['Large', {spacing: enums.Spacing.LARGE}],
            ['X-Large', {spacing: enums.Spacing.X_LARGE}],
            ['XX-Large', {spacing: enums.Spacing.XX_LARGE}],
            ['XXX-Large', {spacing: enums.Spacing.XXX_LARGE}]]}>
          {ComponentUnderTest}
        </VariedArrangement>
      </Arrangements>
    )})


storiesOf('Atoms|Spacer', module)
  .addDecorator(withThemeProvider())
  .addDecorator(withCentered())
  .addDecorator(withKnobs)
  .add('Knobs', () => (
    <ComponentUnderTest
      spacing={enumSelect('spacing', enums.Spacing, enums.Spacing.MEDIUM)} />
  ))
