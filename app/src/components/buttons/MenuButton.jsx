import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { getAccount } from '../../features/account/accountSlice'
import { useGetCurrentAccount } from '../../queryHooks/useAccount'
import { useSelector } from "react-redux"

const MenuButton = ({ children, title=false, disabled = false, link = "/", roles = [false] }) => {

	// const location = useLocation();
	// const account = useSelector(getAccount)

	const { data:account, isLoading, error } = useGetCurrentAccount()

	if (account && account.roles.some(role => roles.includes(role))) return (
		<NavLink className="" to={link}>
			<button
				disabled={disabled}
				className={`scaledown font-light text-left hover:bg-action w-full px-2 py-1 rounded-lg flex items-center gap-2 mb-1 ${link === location.pathname ? 'bg-primary text-white' : 'text-primary '}`}
			>
				{children}
				<span className='hidden md:block'>
				{title}
				</span>
			</button>
		</NavLink>
	)
	else return null
}

export default MenuButton


