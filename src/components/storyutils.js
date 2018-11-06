import React from 'react'
import styled from 'react-emotion'
import {ThemeProvider} from 'emotion-theming'
import {select} from '@storybook/addon-knobs'
import {renderComponent} from 'recompose'

import defaultTheme, {themed} from './theme'
import verbs from './verbs.json'


/** Flatten nested arrays to depth 1. */
const flatten = xs => xs.reduce((acc, x) => acc.concat(x), [])


export function* chooseInfinite(xs) {
  while (true) {
    yield xs[Math.floor(Math.random() * xs.length)]
  }
}


/** Create a function that pick a random value from any of the given enums. */
export const randomEnumValue = (...enums) => () => {
  const xs = flatten(enums.map(Object.values))
  return chooseInfinite(xs).next().value
}


export const randomVerbs = (limit=15) => {
  const f = chooseInfinite(verbs)
  let res = f.next().value
  while (true) {
    const newres = res + ' ' + f.next().value
    if (newres.length > limit) {
      break
    }
    res = newres
  }
  return res.trim()
}


/** Invert an object's keys and values. */
export const invert = (...os) => {
  const res = {}
  for (const o of os) {
    for (const k of Object.getOwnPropertyNames(o)) {
      res[o[k]] = k
    }
  }
  return res
}


/** Create a "select" knob from an enum. */
export const enumSelect = (name, values, ...args) => {
  if (!Array.isArray(values)) {
    values = [values]
  }
  return select(name, Object.assign({}, ...values), ...args)
}


/**
 * Indicate a Storybook knob is optional.
 *
 * For example: `optional(select(...))`
 */
export const optional = v => v === '' ? undefined : v


/** Storybook decorator to wrap a story in an emotion theme provider. */
export const withThemeProvider = (theme=defaultTheme) => story => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
)


const Container = styled('div')`
  display: inline-block;
  vertical-align: top;
  margin: 1rem;
  padding: 1rem;
  padding-top: 0;
  background: #fff;
  box-shadow: 0 1px 4px #2B303A60;
  border-radius: 0.15rem;

  & > h4 {
    padding: 0;
    margin: 0.75rem 0;
    font-size: 85%;
    text-transform: uppercase;
    text-align: center;
  }
`

const ArrangementContent= styled('div')`
`


export const Label = styled('div')`
  font-size: 0.75em;
  padding-top: 1ex;
  margin-bottom: -1ex;
  color: #a7a7a7;
`


export const SpacedInline = styled('div')`
  display: inline-block;
  margin: 0 0.5rem;
`

export const Spaced = styled('div')`
  margin: 0.5rem 0;
`


export const Arrangement = ({label, children}) => (
  <Container>
    {label && <h4>{label}</h4>}
    <ArrangementContent>
      {children}
    </ArrangementContent>
  </Container>
)


export const VariedArrangement = ({label, variations, children: Component}) => (
  <Arrangement label={label}>
    {
      variations.map(([label, props]) => (
        <React.Fragment>
          <Label>{label}</Label>
          <Component {...props} />
        </React.Fragment>
      ))
    }
  </Arrangement>
)


export const RepeatedArrangement = ({label, count=3, children: Component}) => (
  <Arrangement label={label}>
    {
      Array(count).fill(count).map(_ => <Component />)
    }
  </Arrangement>
)


const GroupContainer = styled('div')`
  box-shadow: 0 2px 8px #2B303A20;
  background: #F2F6F7;
  padding: 1rem;
  margin: 1rem;

  & > h3 {
    padding: 0;
    margin: 0.75rem 0;
    margin-left: 1rem;
    font-size: 115%;
    font-weight: 500;
  }
`


const GroupContent = styled('div')`
`


export const Arrangements = ({label, children}) => (
  <GroupContainer>
    {label && <h3>{label}</h3>}
    <GroupContent>
      {children}
    </GroupContent>
  </GroupContainer>
)


export const BlockCentered = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`


export const Padded = styled('div')`
  margin: 2rem;
`


export const withCentered = () => (story, {parameters: {isCentered=true}}) => {
  if (isCentered) {
    return (<BlockCentered>{story()}</BlockCentered>)
  } else {
    return (<Padded>{story()}</Padded>)
  }
}


export const TinySwatch = styled('div')`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: ${themed('shadow.elevation_2')};
  background: ${props => props.color};
`
