import {configure, addDecorator} from '@storybook/react';
import {withOptions} from '@storybook/addon-options'

import '../src/index.css'

function dynamicStories(req) {
  req.keys().forEach(filename => req(filename))
}

function loadStories() {
  dynamicStories(require.context('../src/', true, /stories\.js$/))
  dynamicStories(require.context('../src/', true, /stories\/.*\.js$/))
}

addDecorator(
  withOptions({
    hierarchySeparator: /\//,
    hierarchyRootSeparator: /\|/,
    addonPanelInRight: true,
  })
)

configure(loadStories, module)
