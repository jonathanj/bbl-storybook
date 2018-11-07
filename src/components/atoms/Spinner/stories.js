import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, boolean, select, text} from '@storybook/addon-knobs'
import {nest, withProps} from 'recompose'
import Markdown from 'react-markdown'

import {
  enumSelect,
  optional,
  randomEnumValue,
  randomVerbs,
  withThemeProvider,
  withCentered,
  Arrangement,
  VariedArrangement,
  Arrangements,
  Spaced,
} from '../../storyutils'
import * as enums from '../../enums'
import README from './README.md'
import Spinner from './'


const ComponentUnderTest = Spinner


storiesOf('Atoms|Spinner/Arrangements', module)
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


storiesOf('Atoms|Spinner', module)
  .addDecorator(withThemeProvider())
  .addDecorator(withCentered())
  .addDecorator(withKnobs)
  .add('README', () => <Markdown>{README}</Markdown>, {isCentered: false})
  .add('Knobs', () => (
    <Spinner
      size={enumSelect('size', enums.Size, enums.Size.DEFAULT)}
      color={enumSelect('color', [enums.Color, enums.Intent], enums.Color.DEFAULT)}
    />
  ))
