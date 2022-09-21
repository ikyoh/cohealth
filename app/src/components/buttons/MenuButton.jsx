import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { getAccount } from '../../features/account/accountSlice'
import { useSelector } from "react-redux"

const MenuButton = ({ children, disabled = false, link = "/", roles = [false] }) => {

	const location = useLocation();

	const account = useSelector(getAccount)

	if (account && account.roles.some(role => roles.includes(role))) return (
		<NavLink className="" to={link}>
			<button
				disabled={disabled}
				className={`font-light text-left hover:bg-action w-full px-2 py-1 rounded-lg flex items-center gap-2 mb-1 ${link === location.pathname ? 'bg-primary text-white' : 'text-primary '}`}
			>
				{children}
			</button>
		</NavLink>
	)
	else return null
}

export default MenuButton


