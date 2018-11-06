import React from 'react'
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
} from '../../storyutils'
import * as enums from '../../enums'
import README from './README.md'
import Icon from './'


const randomIcon = randomEnumValue(enums.Icon)
const randomColor = randomEnumValue(enums.Color, enums.Intent)
const ComponentUnderTest = withProps(() => ({
  color: randomColor(),
  name: randomIcon(),
}))(Icon)


storiesOf('Atoms|Icon/Arrangements', module)
  .addDecorator(withThemeProvider())
  .add('Variations', () => {
    const Component = nest(Spaced, ComponentUnderTest)
    return (
      <Arrangements label="Variations">
        <VariedArrangement
          label="Size"
          variations={[
            ['Extra small', {size: enums.Size.X_SMALL}],
            ['Small', {size: enums.Size.SMALL}],
            ['Default', {size: enums.Size.DEFAULT}],
            ['Large', {size: enums.Size.LARGE}],
            ['Extra large', {size: enums.Size.X_LARGE}]]}>
          {Component}
        </VariedArrangement>
      </Arrangements>
    )})


storiesOf('Atoms|Icon', module)
  .addDecorator(withThemeProvider())
  .addDecorator(withCentered())
  .addDecorator(withKnobs)
  .add('Knobs', () => (
    <Icon
      size={enumSelect('size', enums.Size, enums.Size.DEFAULT)}
      color={enumSelect('color', [enums.Color, enums.Intent], enums.Color.DEFAULT)}
      name={optional(enumSelect('icon', enums.Icon, enums.Icon.NONE))} />
  ))
