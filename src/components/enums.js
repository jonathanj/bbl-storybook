import * as Feather from 'react-feather'


export const Size = {
  X_SMALL: 'x_small',
  SMALL: 'small',
  DEFAULT: 'default',
  LARGE: 'large',
  X_LARGE: 'x_large',
}

export const Spacing = {
  XXX_SMALL: 'xxx_small',
  XX_SMALL: 'xx_small',
  X_SMALL: 'x_small',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  X_LARGE: 'x_large',
  XX_LARGE: 'xx_large',
  XXX_LARGE: 'xxx_large',
}

export const Color = {
  DEFAULT: 'default',
}

export const Intent = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  SUCCESS: 'success',
  // XXX: This isn't an intent, this is an "importance" or something.
  PRIMARY: 'primary',
}

/*
export const Icon = {
  NONE: '',
  CAMERA: 'Camera',
  ALERT_CIRCLE: 'AlertCircle',
  BELL: 'Bell',
  DOWNLOAD: 'Download',
  FILE: 'File',
  HELP_CIRCLE: 'HelpCircle',
  INBOX: 'Inbox',
}
*/

export const Icon = (() => {
  const ks = Object.keys(Feather)
  ks.sort()
  const res = {NONE: ''}
  for (const k of ks) {
    const name = k.replace(/([a-z])([A-Z])/, '$1_$2')
    res[name.toUpperCase()] = k
  }
  return res
})()

export const ButtonType = {
  DEFAULT: 'default',
}
