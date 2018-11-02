import {configure} from '@storybook/react';
import {setOptions} from '@storybook/addon-options'

import '../src/index.css'

function dynamicStories(req) {
  req.keys().forEach(filename => req(filename))
}

function loadStories() {
  dynamicStories(require.context('../src/', true, /stories\.js$/))
  dynamicStories(require.context('../src/', true, /stories\/.*\.js$/))
}

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/,
})

configure(loadStories, module)
