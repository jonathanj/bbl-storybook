import React from 'react'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, text, boolean} from '@storybook/addon-knobs'
import {nest, withProps} from 'recompose'
import styled from 'react-emotion'
import Markdown from 'react-markdown'

import {
  enumSelect,
  optional,
  randomEnumValue,
  randomVerbs,
  withThemeProvider,
  withCentered,
  VariedArrangement,
  Arrangements,
  Spaced,
} from '../../storyutils'
import defaultTheme, {themed} from '../../theme'
import * as enums from '../../enums'
import README from './README.md'
import Input from './'
import Button from '../Button'
import Spacer from '../Spacer'


const onChange = action('onChange')
const ComponentUnderTest = withProps(({value=null}) => ({
  onChange,
  placeholder: randomVerbs(),
  value: value === null ? randomVerbs() : value,
}))(Input)


const TinySwatch = styled('div')`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: ${themed('shadow.elevation_2')};
  background: ${props => props.color};
`


storiesOf('Atoms|Input/Arrangements', module)
  .addDecorator(withThemeProvider())
  .addDecorator(withKnobs)
  .add('Variations', () => {
    const Component = withProps({
      placeholder: randomVerbs(),
    })(nest(Spaced, ComponentUnderTest))
    return (
      <Arrangements label="Variations">
        <VariedArrangement
          label="State"
          variations={[
            ['Normal', {}],
            ['Active', {isActive: true}],
            ['Placeholder', {value: ''}],
            ['Read-only', {isReadOnly: true}],
            ['Disabled', {isDisabled: true}],
            ['Error', {isError: true}],
          ]}>
          {Component}
        </VariedArrangement>
      </Arrangements>
    )})
  .add('Swatches', () => {
    const Component = nest(Spaced, TinySwatch)
    return (
      <Arrangements label="Swatches">
        <VariedArrangement
          label="Background"
          variations={[
            ['Base', {color: defaultTheme.component.input.background.color.base}],
            ['Disabled', {color: defaultTheme.component.input.background.color.disabled}],
            ['Read-only', {color: defaultTheme.component.input.background.color.disabled}],
            ['Error', {color: defaultTheme.component.input.background.color.error}],
          ]}>
          {Component}
        </VariedArrangement>
        <VariedArrangement
          label="Border"
          variations={[
            ['Base', {color: defaultTheme.component.input.border.color.base}],
            ['Active', {color: defaultTheme.component.input.border.color.active_}],
            ['Disabled', {color: defaultTheme.component.input.border.color.disabled}],
            ['Read-only', {color: defaultTheme.component.input.border.color.disabled}],
            ['Error', {color: defaultTheme.component.input.border.color.error}],
          ]}>
          {Component}
        </VariedArrangement>
        <VariedArrangement
          label="Text"
          variations={[
            ['Base', {color: defaultTheme.component.input.text.color.base}],
            ['Disabled', {color: defaultTheme.component.input.text.color.disabled}],
          ]}>
          {Component}
        </VariedArrangement>
      </Arrangements>
    )
  })


storiesOf('Atoms|Input', module)
  .addDecorator(withThemeProvider())
  .addDecorator(withCentered())
  .addDecorator(withKnobs)
  .add('README', () => <Markdown>{README}</Markdown>, {isCentered: false})
  .add('Knobs', () => (
    <Input
      onChange={onChange}
      isActive={boolean('isActive', false)}
      isDisabled={boolean('isDisabled', false)}
      isReadOnly={boolean('isReadOnly', false)}
      isError={boolean('isError', false)}
      placeholder={text('placeholder', '')}
      value={text('value', '')} />
  ))
  .add('Context', () => (
    <div>
      <Input
        onChange={onChange}
        isActive={boolean('isActive', false)}
        isDisabled={boolean('isDisabled', false)}
        isReadOnly={boolean('isReadOnly', false)}
        isError={boolean('isError', false)}
        placeholder={text('placeholder', '')}
        value={text('value', '')} />
      <Spacer spacing={enums.Spacing.MEDIUM} />
      <Button>Click me</Button>
    </div>
  ))
