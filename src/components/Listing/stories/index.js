import React from 'react'
import styled from 'react-emotion'
import {withProps} from 'recompose'
import {fromJS, List} from 'immutable'
import {storiesOf} from '@storybook/react'
import {action} from '@storybook/addon-actions'
import {withKnobs, select, boolean} from '@storybook/addon-knobs'
import ImagePalette from 'react-palette'

import {Listing} from '../'

const _reqmbid = require.context('./', true, /\.(json|jpg)$/)


const BlockCentered = ({children}) => (
  <div style={{transform: 'translateX(-50%)', position: 'absolute', left: '50%'}}>
    {children}
  </div>
)


const SwatchContainer = styled('div')`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 1rem 0;
  background: #fff;
`

const Swatch = styled('div')`
  font-size: 75%;
  margin: 1rem 2rem;
  max-width: 3rem;

  &::before {
    display: block;
    content: '';
    width: 3rem;
    height: 3rem;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.24);
    background: ${props => props.color};
    margin-bottom: 0.25rem;
`


const Swatches = ({swatches}) => (
  <SwatchContainer>
    {
      Object.entries(swatches).map(([k, v]) => (
        <Swatch color={v}>
          {k}
        </Swatch>
      ))
    }
  </SwatchContainer>
)


const Component = ({mbid, debugPalette}) => {
  const release = fromJS(_reqmbid(`./${mbid}.json`))
  const coverArt = _reqmbid(`./${mbid}.jpg`)
  return (
    <React.Fragment>
      {
        debugPalette &&
        <ImagePalette image={coverArt}>
          {palette => <Swatches swatches={palette} />}
        </ImagePalette>
      }
      <BlockCentered>
        <Listing
          coverArt={coverArt}
          release={release} />
      </BlockCentered>
    </React.Fragment>
  )
}


const mbids = {
  "Electric Light Orchestra - Out of the Blue": "f47cb625-4ab7-3aa2-9f43-0dc3dc9543eb",
  "Michael Jackson - Dangerous": "65fd65e8-f271-35f5-b839-c12725aab5a5",
  "Kayne West - 808s & Heartbreak": "6cf64bc8-c7c8-34fe-ad15-b8b92f1a197d",
  "Jimi Hendrix - Band of Gypses": "819462db-a29e-4517-aa23-df607fecf832",
}


storiesOf('Listing', module)
  .addDecorator(withKnobs)
  .add('Knobs', () => (
    <Component
      debugPalette={boolean('debugPalette?')}
      mbid={select('mbid', mbids, "f47cb625-4ab7-3aa2-9f43-0dc3dc9543eb")} />
  ))
