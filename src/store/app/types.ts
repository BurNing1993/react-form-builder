export type Theme = 'system' | 'light' | 'dark'

const LOCAL_THEME = 'theme'

export function setLocalTheme(theme: Theme) {
    localStorage[LOCAL_THEME] = theme
    let darkThemeLink = document.querySelector('#theme-style') as HTMLLinkElement
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        darkThemeLink.href = './antd.dark.min.css'
        document.documentElement.classList.add('dark')
    } else {
        darkThemeLink.href = './antd.min.css'
        document.documentElement.classList.remove('dark')
    }
}

export function getLocalTheme(): Theme {
    const theme = localStorage[LOCAL_THEME] || 'system'
    return theme
}