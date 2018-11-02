import React from 'react'
import {fromJS, List} from 'immutable'
import {storiesOf} from '@storybook/react'
import {withKnobs, select, text} from '@storybook/addon-knobs'

import {Table} from './'


const simpleColumns = fromJS([
  {
    title: 'One',
    accessor: 'one'
  },
  {
    title: 'Two',
    accessor: 'two',
  },
])


const complexColumns = fromJS([
  {
    title: 'One',
    accessor: 'one',
  },
  {
    title: 'Three',
    accessor: ['three', 0, 'four'],
  },
])


const customColumns = fromJS([
  {
    title: 'One',
    accessor: 'one',
    render: value => (<strong>{value} x {value}</strong>)
  },
  {
    title: 'Two',
    accessor: x => x.get('two'),
  },
])


const data = fromJS([
  {
    one: 'a',
    two: 42,
  },
  {
    one: 'b',
    two: 21,
    three: [
      {four: 'xyz'},
    ],
  },
])


storiesOf('Table', module)
  .addDecorator(withKnobs)
  .add('Empty', () => (
    <Table columns={List()} data={List()} />
  ))
  .add('No rows', () => (
    <Table columns={simpleColumns} data={List()} />
  ))
  .add('Simple accessors', () => (
    <Table columns={simpleColumns} data={data} />
  ))
  .add('Complex accessors', () => (
    <Table columns={complexColumns} data={data} />
  ))
  .add('Custom renderer', () => (
    <Table columns={customColumns} data={data} />
  ))
