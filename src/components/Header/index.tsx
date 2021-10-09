import React, { memo } from 'react'
import ThemeSelect from './ThemeSelect'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header
      id="header"
      className="h-10 px-4 flex items-center justify-between w-full border-b border-gray-500"
    >
      <Link to="/">LOGO</Link>
      <ThemeSelect />
    </header>
  )
}

export default memo(Header)
