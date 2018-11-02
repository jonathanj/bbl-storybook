import React from 'react'
import {storiesOf} from '@storybook/react'
import {withKnobs, select, text} from '@storybook/addon-knobs'

import {AlbumCover} from './'


const image = 'https://ia800301.us.archive.org/21/items/mbid-f47cb625-4ab7-3aa2-9f43-0dc3dc9543eb/mbid-f47cb625-4ab7-3aa2-9f43-0dc3dc9543eb-15488789443_thumb500.jpg'


storiesOf('AlbumCover', module)
  .addDecorator(withKnobs)
  .add('Knobs', () => (
    <AlbumCover
      image={image}
    />
  ))
