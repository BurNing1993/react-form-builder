import React, { memo } from 'react'
import { Select } from 'antd';
import { useRecoilState } from 'recoil'
import { themeState } from '../../store/app/atom'
import { Theme } from '../../store/app/types'

interface ThemeOption {
    label: string,
    value: Theme
}

const themes: ThemeOption[] = [
    {
        label: '🖥️系统',
        value: 'system'
    },
    {
        label: '☀️亮色',
        value: 'light'
    },
    {
        label: '🌙暗色',
        value: 'dark'
    },
]

const { Option } = Select;
const ThemeSelect: React.FC = () => {
    const [theme, setTheme] = useRecoilState(themeState)
    return (
        <section>
            <Select defaultValue={theme} style={{ width: 120 }} onChange={setTheme}>
                {
                    themes.map(t => <Option key={t.value} value={t.value}>{t.label}</Option>)
                }
            </Select>
        </section>
    )
}

export default memo(ThemeSelect)
