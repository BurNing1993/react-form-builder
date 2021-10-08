import React, { memo } from 'react'
import { Link } from 'react-router-dom'

const Home: React.FC = () => {
    return (
        <main className="container mx-auto pt-4 px-1">
            <div className="border-b border-gray-600 font-bold text-xl py-2">
                Home
            </div>
            <div className="mt-8">
                <div className="text-lg">
                    最近使用
                </div>
                <div className="py-4 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                    <Link to="/f/new" className="text-center border border-gray-600 cursor-pointer h-40 flex flex-col justify-center transform hover:scale-105">
                        <div>
                            +
                        </div>
                        <span>
                            new
                        </span>
                    </Link>
                    <div className="text-center cursor-pointer h-40">
                        1
                    </div>
                    <div className="text-center cursor-pointer h-40">
                        2
                    </div>
                    <div className="text-center cursor-pointer h-40">
                        3
                    </div>
                </div>
            </div>
        </main>
    )
}

export default memo(Home)
