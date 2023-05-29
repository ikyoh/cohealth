import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import MenuButton from '../components/buttons/MenuButton'
import { MdDashboard } from "react-icons/md";
import { MdSchedule } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { MdSupervisedUserCircle } from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { RiStethoscopeFill } from "react-icons/ri";
import { IoPersonCircleOutline, IoApps } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa";
import { BsFileEarmarkRuled } from "react-icons/bs";
import { GiHealthNormal } from "react-icons/gi";
import ReactLogo from '../assets/logo-horizontal.svg';


const Menu = () => {

	const [show, setShow] = useState(false)

	return (
		<div className='w-screen md:w-64 md:h-screen md:sticky md:top-0'>
			<div className='flex justify-between items-center p-3 bg-white md:h-24'>
				<NavLink className="hidden md:block" to="/dashboard">
					<img src={ReactLogo} className='md:pl-2' alt="React Logo" style={{ width: 180 }} />
				</NavLink>
				<button className='md:hidden' onClick={() => setShow(!show)}>
					{show ?
						<IoApps className='text-action' size={45} />
						:
						<IoApps className='text-action' size={45} />
					}
				</button>
			</div>
			<div className={`flex-1 bg-white p-3 md:w-64 ${show ? 'block' : 'hidden md:block'}`}>
				<div className='pt-3 md:pt-0 text-xl md:text-sm'>
					<div className='text-zinc-400 font-light uppercase mt-5 pl-2 pb-2'>
						mon activité
					</div>
					<MenuButton link='/dashboard' title="Tableau de bord" roles='ROLE_USER'>
						<MdDashboard size={25} /> 
					</MenuButton>
					<MenuButton link='/missions'  title="Missions" roles='ROLE_NURSE'>
						<MdPendingActions size={25} />
					</MenuButton>
					<MenuButton link='/collaborations'  title="Collaborations" roles='ROLE_NURSE'>
						<MdPendingActions size={25} />
					</MenuButton>
					<MenuButton disabled={true} title="Planning" roles='ROLE_NURSE'>
						<MdSchedule size={25} />
					</MenuButton>
					<MenuButton disabled={true} title="Factures" roles='ROLE_NURSE'>
						<BsFileEarmarkRuled size={25} />
					</MenuButton>
					<MenuButton disabled={true} title="Statistiques" roles='ROLE_NURSE'>
						<AiOutlineBarChart size={25} />
					</MenuButton>
					<div className='text-zinc-400 font-light uppercase mt-5 pl-2 pb-2'>
						contacts
					</div>
					<MenuButton link='/patients' title="Patients" roles={['ROLE_NURSE','ROLE_ORGANIZATION']}>
						<IoPersonCircleOutline size={25} />
					</MenuButton>
					<MenuButton link='/doctors' title="Médecins" roles='ROLE_USER'>
						<RiStethoscopeFill size={25} />
					</MenuButton>
					<MenuButton link='/assurances' title="Assurances" roles='ROLE_USER'>
						<MdOutlineHealthAndSafety size={25} />
					</MenuButton>
					<MenuButton link='/partners' title="Partenaires" roles={['ROLE_NURSE','ROLE_ORGANIZATION']}>
						<FaHandshake size={25} />
					</MenuButton>
					<div className='text-zinc-400 font-light uppercase mt-5 pl-2 pb-2'>
						paramètres
					</div>
					<MenuButton link='/services' title="Prestations" roles='ROLE_ADMIN'>
						<GiHealthNormal size={25} />
					</MenuButton>
					<MenuButton link='/account' title="Mon compte" roles={['ROLE_NURSE','ROLE_ORGANIZATION']}>
						<MdOutlineSettings size={25} />
					</MenuButton>
					<MenuButton link='/users' title="Utilisateurs" roles='ROLE_ADMIN'>
						<MdSupervisedUserCircle size={25} />
					</MenuButton>
				</div>
			</div>
		</div>
	)
}

export default Menu