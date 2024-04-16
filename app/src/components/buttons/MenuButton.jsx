import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useGetCurrentAccount } from '../../queryHooks/useAccount'

const MenuButton = ({ children, title = false, disabled = false, link = false, badge = false, roles = [], onClick }) => {

	const location = useLocation();

	const { data: account, isLoading, error } = useGetCurrentAccount()

	if (account && account.roles.some(role => roles.includes(role))) return (
		<NavLink className="" to={link} onClick={onClick}>
			<button
				disabled={disabled}
				className={`scaledown font-light text-left w-full px-2 py-1 rounded-lg flex items-center gap-2 mb-1 ${link === location.pathname ? 'bg-primary text-white' : 'text-primary '} ${disabled ? "hover:bg-slate-400 cursor-not-allowed" : "hover:bg-action"}`}
			>
				{children}
				<div className=''>
					{title}
				</div>
				{badge &&
					<div className="badge badge-info">{badge}</div>
				}
			</button>
		</NavLink>
	)
	else return null
}

export default MenuButton


