import React, { memo } from 'react'
import ThemeSelect from './ThemeSelect'
import { Link } from 'react-router-dom'
import { Image } from 'antd'
import logo from './logo.png'

const Header: React.FC = () => {
  return (
    <header
      id="header"
      className="h-10 px-4 flex items-center justify-between w-full border-b border-gray-200 dark:border-gray-700"
    >
      <Link to="/" className="flex items-center">
        <Image
          src={logo}
          alt="react form builder logo"
          height={36}
          preview={false}
        />
        <span className="font-bold text-lg">FormBuilder</span>
      </Link>
      <ThemeSelect />
    </header>
  )
}

export default memo(Header)
