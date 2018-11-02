import React from 'react'
import styled from 'react-emotion'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, boolean, select, text} from '@storybook/addon-knobs'
import {nest, withProps} from 'recompose'

import {
  enumSelect,
  optional,
  randomEnumValue,
  randomVerbs,
  withThemeProvider,
  withCentered,
  Arrangement,
  RepeatedArrangement,
  VariedArrangement,
  Label,
  Arrangements,
} from '../../storyutils'
import * as enums from '../../enums'
import README from './README.md'
import Button from './'


const randomIcon = randomEnumValue(enums.Icon)
const randomColor = randomEnumValue(enums.Color, enums.Intent)
const randomText = randomVerbs
const onClick = action('onClick')
const ComponentUnderTest = withProps(() => ({
  onClick,
  color: randomColor(),
  children: randomText(),
}))(Button)


const SpacedInline = styled('div')`
  display: inline-block;
  margin: 0 0.5rem;
`

const Spaced = styled('div')`
  margin: 0.5rem 0;
`


const ButtonArrangements = Component => () => (
  <React.Fragment>
    <Arrangements label="Horizontal">
      <RepeatedArrangement label="No spacing">
        {Component}
      </RepeatedArrangement>
      <RepeatedArrangement label="With spacing">
        {nest(SpacedInline, Component)}
      </RepeatedArrangement>
    </Arrangements>
    <Arrangements label="Vertical">
      <RepeatedArrangement label="No spacing">
        {nest('div', Component)}
      </RepeatedArrangement>
      <RepeatedArrangement label="With spacing">
        {nest(Spaced, Component)}
      </RepeatedArrangement>
    </Arrangements>
  </React.Fragment>
)


storiesOf('Atoms|Button/Arrangements', module)
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
        <VariedArrangement
          label="State"
          variations={[
            ['Normal', {}],
            ['Disabled', {isDisabled: true}],
            ['Busy', {isBusy: true}],
            ['Busy and disabled', {isDisabled: true, isBusy: true}]]}>
          {Component}
        </VariedArrangement>
      </Arrangements>
    )})
  .add('No icons', ButtonArrangements(
    ComponentUnderTest))
  .add('Left icons', ButtonArrangements(
    withProps(() => ({icon: randomIcon()}))(ComponentUnderTest)))


const Markdown = ({children}) => (
  <div dangerouslySetInnerHTML={{__html: children}} />
)


storiesOf('Atoms|Button', module)
  .addDecorator(withThemeProvider())
  .addDecorator(withCentered())
  .addDecorator(withKnobs)
  .add('README', () => <Markdown>{README}</Markdown>)
  .add('Knobs', () => (
    <Button
      onClick={onClick}
      isBusy={boolean('isBusy', false)}
      isDisabled={boolean('isDisabled', false)}
      size={enumSelect('size', enums.Size, enums.Size.DEFAULT)}
      color={enumSelect('color', [enums.Color, enums.Intent], enums.Color.DEFAULT)}
      type={enumSelect('type', enums.ButtonType, enums.ButtonType.DEFAULT)}
      icon={optional(enumSelect('icon', enums.Icon, enums.Icon.None))}
      rightIcon={optional(enumSelect('rightIcon', enums.Icon, enums.Icon.None))}
    >
      {text('children', 'Click this')}
    </Button>
  ))
  .add('Context', () => (
    <Button>XXX</Button>
  ))
