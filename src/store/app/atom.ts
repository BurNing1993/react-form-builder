import { atom } from 'recoil'
import { Theme, setLocalTheme, getLocalTheme } from './types'

export const themeState = atom<Theme>({
  key: 'themeState',
  default: getLocalTheme(),
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet((theme) => {
        setLocalTheme(theme)
      })
    },
  ],
})
