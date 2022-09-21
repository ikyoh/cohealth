import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MenuButton from '../components/buttons/MenuButton'
import { MdDashboard } from "react-icons/md";
import { MdMenu } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { MdSchedule } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdSupervisedUserCircle } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { RiStethoscopeFill } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa";
import { BsFileEarmarkRuled } from "react-icons/bs";
import { GiHealthNormal } from "react-icons/gi";
import ReactLogo from '../assets/logo-horizontal.svg';


const Menu = () => {

	const [show, setShow] = useState(false)

	return (
		<div className='z-40 md:z-auto w-screen md:w-64 flex flex-col md:relative fixed top-0'>
			<div className='flex justify-between items-center p-3 bg-white md:h-24'>
				<NavLink className="" to="/dashboard">
					<img src={ReactLogo} className='md:pl-2' alt="React Logo" style={{ width: 180 }} />
				</NavLink>
				<button className='md:hidden' onClick={() => setShow(!show)}>
					{show ?
						<MdClose className='text-action' size={45} />
						:
						<MdMenu className='text-action' size={45} />
					}
				</button>
			</div>
			<div className='text-zinc-400 pl-5'>Beta v.1.0</div>
			<div className={`flex-1 bg-white p-3 md:w-64 ${show ? 'block' : 'hidden md:block'}`}>
				<div className='pt-3 md:pt-0 text-xl md:text-sm'>
					<div className='text-zinc-400 font-light uppercase mt-5 pl-2 pb-2'>
						mon activité
					</div>
					<MenuButton link='/dashboard' roles='ROLE_USER'>
						<MdDashboard size={25} /> Tableau de bord
					</MenuButton>
					<MenuButton link='/missions' roles='ROLE_NURSE'>
						<MdPendingActions size={25} /> Missions
					</MenuButton>
					<MenuButton disabled={true} roles='ROLE_NURSE'>
						<MdSchedule size={25} />Planning
					</MenuButton>
					<MenuButton disabled={true} roles='ROLE_NURSE'>
						<BsFileEarmarkRuled size={25} />Factures
					</MenuButton>
					<MenuButton disabled={true} roles='ROLE_NURSE'>
						<AiOutlineBarChart size={25} />Statistiques
					</MenuButton>
					<div className='text-zinc-400 font-light uppercase mt-5 pl-2 pb-2'>
						contacts
					</div>
					<MenuButton link='/patients' roles={['ROLE_NURSE','ROLE_ORGANIZATION']}>
						<IoPersonCircleOutline size={25} /> Patients
					</MenuButton>
					<MenuButton link='/doctors' roles='ROLE_USER'>
						<RiStethoscopeFill size={25} /> Médecins
					</MenuButton>
					<MenuButton link='/assurances' roles='ROLE_USER'>
						<MdOutlineHealthAndSafety size={25} />Assurances
					</MenuButton>
					<MenuButton link='/partners' roles={['ROLE_NURSE','ROLE_ORGANIZATION']}>
						<FaHandshake size={25} />Partenaires
					</MenuButton>
					<div className='text-zinc-400 font-light uppercase mt-5 pl-2 pb-2'>
						paramètres
					</div>
					<MenuButton link='/services' roles='ROLE_ADMIN'>
						<GiHealthNormal size={25} />Prestations
					</MenuButton>
					<MenuButton link='/account' roles={['ROLE_NURSE','ROLE_ORGANIZATION']}>
						<MdOutlineSettings size={25} />Mon compte
					</MenuButton>
					<MenuButton link='/users' roles='ROLE_ADMIN'>
						<MdSupervisedUserCircle size={25} />Utilisateurs
					</MenuButton>
				</div>
			</div>
		</div>
	)
}

export default Menu