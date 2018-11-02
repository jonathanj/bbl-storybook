import React from 'react'
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
  GeneratedArrangement,
  Arrangements,
} from '../../storyutils'
import * as enums from '../../enums'
import Spinner from './'


const ComponentUnderTest = Spinner


storiesOf('Atoms|Spinner/Arrangements', module)
  .addDecorator(withThemeProvider())
  .add('Variations', () => (
      <Arrangements label="Variations">
        <Arrangement label="Size">
          <ComponentUnderTest size={enums.Size.X_SMALL} />
          <ComponentUnderTest size={enums.Size.SMALL} />
          <ComponentUnderTest size={enums.Size.DEFAULT} />
          <ComponentUnderTest size={enums.Size.LARGE} />
          <ComponentUnderTest size={enums.Size.X_LARGE} />
        </Arrangement>
      </Arrangements>
    ))
