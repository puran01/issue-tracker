'use client';

import React from 'react'
import Link from 'next/link'
import { FaBug } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();

    const links = [
        {label: 'Dashboard', href:"/"},
        {label: 'Issues', href:"/issues"}
    ]
  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><FaBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link =>
                <Link 
                    key={link.href} 
                    className = {classNames({
                       'text-zinc-400' : link.href === currentPath,
                       'text-zinc-100' : link.href !== currentPath,
                       'hover:text-zinc-600' : true
                    })}
                    href={link.href}>{link.label}</Link> )}
        
        </ul>
    </nav>
  )
}

export default NavBar