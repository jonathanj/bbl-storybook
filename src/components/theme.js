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
  font-family: "Basier Circle", sans-serif;
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


const border = {
  width: {
    thin: '1px',
    thick: '2px',
    thicker: '3px',
  },
  radius: {
    slight: '3px',
  },
}


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
      },
    },

    input: {
      font: {
        size: {
          base: '16px',
        },
      },
      min_width: {
        medium: '15rem',
      },
      background: {
        color: {
          base: colors.white,
          disabled: '#F1F2F4',
          readonly: '#F1F2F4',
          error: '#FFEDED',
        },
      },
      text: {
        color: {
          base: '#212B36',
          disabled: '#637381',
          placeholder: '#CFD8DC'
        },
      },
      padding: '0.5625rem',
      border: {
        radius: border.radius.slight,
        color: {
          base: '#ABB3C0',
          active: 'transparent',
          active_: '#03A9F4',
          disabled: '#DDE0E5',
          readonly: '#DDE0E5',
          error: '#FF4C4C',
        },
        width: {
          base: border.width.thin,
          active: border.width.thick,
        },
      },
      shadow: {
        active: '0 0 0 2px #03A9F4',
      },
    },

    label: {
      font: {
        size: '14px',
        weight: 500,
      },

      text: {
        color: {
          base: '#212B36',
          active: '#03A9F4',
          disabled: '#ABB3C0',
        },
      },

      supplemental: {
        font: {
          size: '14px',
        },
      },
    }
  },

  animation: {
    timing: {
      very_fast: '175ms',
      fast: '250ms',
    },
  },

  border,

  //spacing: {
  //  xxx_small: '0.1rem',
  //  xx_small: '0.2rem',
  //  x_small: '0.4rem',
  //  small: '0.6rem',
  //  medium: '1rem',
  //  large: '1.4rem',
  //  x_large: '1.6rem',
  //  xx_large: '1.8rem',
  //  xxx_large: '2.0rem',
  //},


  spacing: {
    xxx_small: '0.375rem',
    xx_small: '0.5625rem',
    x_small: '0.9375rem',
    small: '1.5rem',
    medium: '1.875rem',
    large: '3rem',
    x_large: '3.5rem',
    xx_large: '4.125rem',
    xxx_large: '4.875rem',
  },

  shadow: {
    elevation_2: '0 1px 3px rgba(0, 0, 0, 0.15)',
    elevation_4: '0 1px 6px rgba(0, 0, 0, 0.15)',
  },

  transform: {
    perspective: {
      'default': 'perspective(1px)',
    },
  },
}


export default defaultTheme
