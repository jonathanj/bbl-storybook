import {injectGlobal} from 'react-emotion'
import {
  saturate,
  desaturate,
  darken,
  lighten,
  shade,
  tint,
  getLuminance,
  transparentize,
} from 'polished'


injectGlobal`
* {
  box-sizing: border-box;
}

body {
  font-family: "Open sans", sans-serif;
  font-size: 16px;
  padding: 0;
  margin: 0;
}
`

/** Resolve a path name against an object. */
export const resolve = attr => obj =>
  attr && attr.split('.').reduce(
    (res, name) => res !== undefined && res[name], obj)


const themedOne = attr => props => resolve(attr)(props.theme)


/** Find a theme value from a dotted path string. */
export const themed = (...attrs) => {
  const fs = attrs.map(themedOne)
  return props => {
    const res = fs.map(f => f(props))
    return res.length === 1 ? res[0] : res
  }
}


const identity = x => x


/** Find a theme value by using the value of another prop, transforming it via `f`. */
export const themedBy = (attr, propName, f=identity) => {
  const t = themed(attr)
  return props => {
    const res = t(props)
    return res !== undefined ? res[f(props[propName])] : null
  }
}


export const shadeBy = n => value => shade(n, value)
export const transparentizeBy = n => value => transparentize(n, value)


const colors = {
  white: '#fff',
  black: '#000',
  sunglow: '#FFCB47',
  light_sky_blue: '#96CDFF',
  lapis_lazuli: '#2374AB',
  mountain_meadow: '#22D68E',
  infra_red: '#EF476F',
  japanese_indigo: '#2A3D45',
  pastel_grey: '#CED0CE',
  light_slate_grey: '#7B8996',
}


/** Determine a readable constrast color for a given color. */
export const readableColor = color =>
  getLuminance(color) > 0.204 ? colors.black : colors.white


export const defaultTheme = {
  palette: {
    'default': colors.pastel_grey,
    primary: colors.lapis_lazuli,
    info: colors.japanese_indigo,
    error: colors.infra_red,
    warning: colors.sunglow,
    success: colors.mountain_meadow,
  },

  component: {
    button: {
      color: {
        base: colors.black,
        disabled: shade(0.2, colors.light_slate_grey),
      },
      background: {
        base: colors.white,
        disabled: tint(0.8, colors.light_slate_grey),
      },
      border: {
        disabled: colors.light_slate_grey,
      },
      text_shadow: {
        disabled: `0 1px ${colors.white}`,
      }
    }
  },

  animation: {
    timing: {
      very_fast: '175ms',
      fast: '250ms',
    },
  },

  border: {
    width: {
      thin: '1px',
      thick: '2px',
      thicker: '3px',
    },
    radius: {
      slight: '0.2rem',
    },
  },

  spacing: {
    xxx_small: '0.1rem',
    xx_small: '0.2rem',
    x_small: '0.4rem',
    small: '0.6rem',
    medium: '1rem',
    large: '1.4rem',
    x_large: '1.6rem',
    xx_large: '1.8rem',
    xxx_large: '2.0rem',
  },

  shadow: {
    elevation_2: '0 1px 2px rgba(0, 0, 0, 0.24)',
  },
}


export default defaultTheme
