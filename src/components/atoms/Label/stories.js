import React from 'react'
import {storiesOf} from '@storybook/react'
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
  TinySwatch,
} from '../../storyutils'
import defaultTheme, {themed} from '../../theme'
import * as enums from '../../enums'
import README from './README.md'
import Label from './'
import Input from '../Input'


const ComponentUnderTest = withProps(() => ({
  //value: text('value', randomVerbs()),
  //color: randomColor(),
  //name: randomIcon(),
}))(Label)


const componentTheme = defaultTheme.component.label


storiesOf('Atoms|Label/Arrangements', module)
  .addDecorator(withThemeProvider())
  .addDecorator(withKnobs)
  .add('Variations', () => {
    const WrappedComponent = props => (
      <ComponentUnderTest
        label="Label"
        isRequired={boolean('isRequired')}
        isOptional={boolean('isOptional')}
        {...props}>
        <Input {...props} />
      </ComponentUnderTest>
    )
    const Component = nest(Spaced, WrappedComponent)
    const WithSupplemental = withProps(
      {supplemental: 'Supplemental information'}
    )(Component)
    const WithError = withProps(
      {error: 'Inline validation error'}
    )(Component)
    return (
      <Arrangements label="Variations">
        <VariedArrangement
          label="Normal state"
          variations={[
            ['Normal', {}],
            ['Active', {isActive: true}],
            ['Disabled', {isDisabled: true}],
          ]}>
          {Component}
        </VariedArrangement>
        <VariedArrangement
          label="State with supplemental"
          variations={[
            ['Normal', {}],
            ['Active', {isActive: true}],
            ['Disabled', {isDisabled: true}],
          ]}>
          {WithSupplemental}
        </VariedArrangement>
        <VariedArrangement
          label="State with error"
          variations={[
            ['Normal', {}],
            ['Active', {isActive: true}],
            ['Disabled', {isDisabled: true}],
          ]}>
          {WithError}
        </VariedArrangement>
      </Arrangements>
    )})
  .add('Swatches', () => {
    const Component = nest(Spaced, TinySwatch)
    return (
      <Arrangements label="Swatches">
        <VariedArrangement
          label="Text"
          variations={[
            ['Base', {color: componentTheme.text.color.base}],
            ['Disabled', {color: componentTheme.text.color.disabled}],
          ]}>
          {Component}
        </VariedArrangement>
      </Arrangements>
    )
  })


const Placeholder = styled('div')`
  width: 15rem;
  height: 38px;
  background: repeating-linear-gradient(
    -45deg,
    transparent, transparent 6px,
    #ddd 6px, #ddd 12px);
  box-shadow: ${themed('shadow.elevation_2')};
`


const Component = ({children, ...props}) => (
  <ComponentUnderTest {...props}>
    {children(props)}
  </ComponentUnderTest>
)


storiesOf('Atoms|Label', module)
  .addDecorator(withThemeProvider())
  .addDecorator(withCentered())
  .addDecorator(withKnobs)
  .add('README', () => <Markdown>{README}</Markdown>, {isCentered: false})
  .add('Knobs', () => (
    <Component
      isDisabled={boolean('isDisabled', false)}
      isRequired={boolean('isRequired', false)}
      isOptional={boolean('isOptional', false)}
      error={text('error', '')}
      supplemental={text('supplemental', 'Supplemental information')}
      label={text('label', 'Label')}>
      {Input}
    </Component>
  ))
