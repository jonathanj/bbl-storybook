import React from 'react'
import T from 'proptypes'
import {
  compose,
  defaultProps,
  setDisplayName,
  setPropTypes,
} from 'recompose'
import styled from 'react-emotion'
import {List} from 'immutable'


const Container = styled('div')`
  & > table {
    width: 100%;
  }
`


const columnHeader = column => (
  <th key={column.hashCode()}>{column.get('title')}</th>
)


const getIn = path => parent =>
  parent.getIn(List.isList(path) ? path : List.of(path))


const rowCellFactory = row => column => {
  const render = column.get('render', x => x)
  const accessor = typeof column.get('accessor') === 'function'
                 ? column.get('accessor')
                 : getIn(column.get('accessor'))
  const key = `${column.hashCode()}:${row.hashCode()}`
  return (<td key={key}>{render(accessor(row), row, column)}</td>)
}


const rowFactory = (columns, onRowClicked) => row => (
  <tr
    key={row.hashCode()}
    onClick={onRowClicked}>
    {columns.map(rowCellFactory(row))}
  </tr>
)


export const Table = compose(
  setDisplayName('BrownBagLunch.Table'),
  setPropTypes({
    //data: IT.listOf(...),
    //columns: IT.listOf(...),
    onRowClicked: T.func,
  }),
  defaultProps({
    onRowClicked: undefined,
  }),
)(({data, columns, onRowClicked}) => (
  <Container>
    <table>
      <thead>
        <tr>
          {columns.map(columnHeader)}
        </tr>
      </thead>
      <tbody>
        {data.map(rowFactory(columns, onRowClicked))}
      </tbody>
    </table>
  </Container>
))


export default Table
