import React from 'react'
import T from 'proptypes'
import {
  compose,
  defaultProps,
  setDisplayName,
  setPropTypes,
} from 'recompose'
import styled from 'react-emotion'


const Container = styled('div')`
`


export const AlbumCover = compose(
  setDisplayName('BrownBagLunch.AlbumCover'),
  setPropTypes({
    image: T.string,
  }),
)(({image}) => (
  <Container>
    <img src={image} />
  </Container>
))


export default AlbumCover
