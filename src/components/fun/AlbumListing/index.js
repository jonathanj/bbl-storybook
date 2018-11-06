import React from 'react'
import T from 'proptypes'
import {
  compose,
  defaultProps,
  mapProps,
  setDisplayName,
  setPropTypes,
  withProps,
} from 'recompose'
import styled from 'react-emotion'
import ImagePalette from 'react-palette'
import {readableColor, tint, shade, darken, opacify} from 'polished'
import {fromJS, Map} from 'immutable'

import Table from '../../Table'


const simpleRelease = release =>
  Map({
    artist: release.getIn(['artist-credit', 0, 'name']),
    title: release.get('title'),
    date: release.get('date', '').split('-')[0],
    trackCount: release.getIn(['media', 0, 'track-count']),
    tracks: release.getIn(['media', 0, 'tracks']),
  })


const Container = styled('div')`
  display: inline-block;
  margin: 3rem 2rem;
  padding: 1rem;
  background: linear-gradient(
    150deg,
    ${props => tint(1, props.primaryColor)},
    ${props => tint(0.9, props.primaryColor)});
  border: 4px solid ${props => props.primaryColor};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
  color: ${props => darken(0.1, shade(0.4, props.primaryColor))};
  transition: 300ms ease-in-out box-shadow;
  min-width: 600px;

  --border-radius: 0.25rem;

  & img {
    border: 8px solid ${props => props.secondaryColor};
    box-shadow: 0 4px 24px ${props => opacify(-0.5, darken(0.2, props.secondaryColor))};
  }

  & table {
    border-collapse: collapse;
  }

  & table td, & table th {
    padding: 0.5rem 0.5rem;
  }

  & tbody td:first-child {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  & tbody td:last-child {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }

  & table th {
    padding-bottom: 0.3rem;
    text-align: left;
    text-transform: uppercase;
    font-size: 85%;
    font-weight: 800;
  }

  & table th:last-child {
    text-align: right;
  }

  & tbody tr {
    cursor: pointer;
  }

  & tbody tr:hover {
    color: ${props => readableColor(props.secondaryColor)};
    background: ${props => tint(0.4, props.secondaryColor)};
  }
`


const Title = styled('div')`
  display: flex;
  padding-bottom: 1rem;

  & img {
    cursor: pointer;
    background: #fff;
    display: inline-block;
    margin-left: -3rem;
    margin-top: -3rem;
    width: 200px;
    height: 200px;
    transform: perspective(900px);
    transition: 300ms ease-in-out;
    transition-property: transform, box-shadow;
  }

  & img:hover {
    transform: perspective(900px) rotate3d(1, 2, 0, 10deg);
  }
`


const TitleInfo = styled('div')`
  flex: 1;
  vertical-align: top;
  padding-left: 1rem;

  h1, h2, h3 {
    font-weight: 400;
    margin: 0;
    margin-bottom: 0.125rem;
    text-align: right;
  }

  h1 {
    font-weight: 600;
  }

  h3 {
    font-weight: 300;
  }
`


const humanReadableLength = value => {
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value % 3600) / 60)
  const seconds = Math.round((value % 3600) % 60)
  const components_ = [hours, minutes, seconds].filter(x => x)
  const first = components_.shift()
  const components = components_.map(x => x.toString().padStart(2, '0'))
  return [first, ...components].join(':')
}


const TrackLength = mapProps(
  ({children}) => ({
    children: humanReadableLength(children / 1000),
  })
)(styled('div')`
  text-align: right;
`)


const columns = fromJS([
  {
    title: '#',
    accessor: 'number',
    render: value => (<strong>{value}.</strong>)
  },
  {
    title: 'Title',
    accessor: 'title',
  },
  {
    title: 'Length',
    accessor: 'length',
    render: value => (<TrackLength>{value}</TrackLength>)
  },
])


export const AlbumListing = compose(
  setDisplayName('Fun.AlbumListing'),
  setPropTypes({
    //data: IT...,
    coverArt: T.string.isRequired,
  }),
  withProps(
    ({release}) => ({
      release: simpleRelease(release),
    }))
)(({release, coverArt}) => (
  <ImagePalette image={coverArt}>
    {
      palette => (
        <Container primaryColor={palette.lightMuted} secondaryColor={palette.vibrant}>
          <Title>
            <img src={coverArt} />
            <TitleInfo>
              <h1>{release.get('artist')}</h1>
              <h2>{release.get('title')}</h2>
              <h3>{release.get('date')}</h3>
            </TitleInfo>
          </Title>
          <Table
            columns={columns}
            data={release.get('tracks')} />
        </Container>
      )
    }
  </ImagePalette>
))


export default AlbumListing
