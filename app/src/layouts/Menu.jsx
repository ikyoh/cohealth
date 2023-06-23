import React, { useState } from 'react'
import { useLogoutAccount } from '../queryHooks/useAccount';

import { NavLink } from 'react-router-dom'
import MenuButton from '../components/buttons/MenuButton'
import {
	MdDashboard,
	MdEventNote,
	MdSchedule,
	MdPendingActions,
	MdOutlineHealthAndSafety,
	MdSupervisedUserCircle,
	MdOutlineSettings
} from "react-icons/md";
import { AiOutlineBarChart } from "react-icons/ai";
import { RiStethoscopeFill } from "react-icons/ri";
import { IoPersonCircleOutline, IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { FaHandshake } from "react-icons/fa";
import { BsFileEarmarkRuled } from "react-icons/bs";
import { GiHealthNormal } from "react-icons/gi";
import { HiLogout } from "react-icons/hi";
import ReactLogo from '../assets/logo-horizontal.svg';


const Menu = () => {

	const { mutate: logout } = useLogoutAccount()
	const [show, setShow] = useState(false)

	return (
		<div className='z-[100] md=z-0 h-screen fixed md:sticky md:top-0'>
			<div className='md:hidden fixed bottom-0 bg-primary w-full text-center py-2'>
				<label
					className="rounded-full bg-white swap swap-rotate p-2"
				>
					{/* this hidden checkbox controls the state */}
					<input
						type="checkbox"
						onClick={() => setShow(!show)}
					/>

					{/* hamburger icon */}
					<IoMenuSharp size={30} className="swap-off fill-current text-primary" />

					{/* close icon */}
					<IoCloseSharp size={30} className="swap-on fill-current text-primary" />

				</label>
			</div>
			<div className={`w-screen md:w-64 h-screen md:h-auto md:sticky md:top-0 ${show ? 'block' : 'hidden md:block'}`}>
				<div className='flex justify-between items-center p-3 bg-white md:h-24'>
					<NavLink className="" to="/dashboard">
						<img src={ReactLogo} className='md:pl-2' alt="React Logo" style={{ width: 180 }} />
					</NavLink>
				</div>
				<div className={`flex-1 bg-white p-3 md:w-64 h-full`}>
					<div className='pt-3 md:pt-0 text-xl md:text-sm'>
						<div className='text-zinc-400 font-light uppercase mt-5 pl-2 pb-2'>
							mon activité
						</div>
						<MenuButton onClick={() => setShow(!show)} link='/dashboard' title="Tableau de bord" roles={['ROLE_USER']}>
							<MdDashboard size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} link='/missions' title="Missions" roles={['ROLE_NURSE']}>
							<MdPendingActions size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} link='/collaborations' title="Collaborations" roles={['ROLE_NURSE']}>
							<MdPendingActions size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} disabled={true} title="Planning" roles={['ROLE_NURSE']}>
							<MdSchedule size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} disabled={true} title="Factures" roles={['ROLE_NURSE']}>
							<BsFileEarmarkRuled size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} disabled={true} title="Statistiques" roles={['ROLE_NURSE']}>
							<AiOutlineBarChart size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} disabled={true} title="Mandats" roles={['ROLE_DOCTOR']}>
							<MdEventNote size={25} />
						</MenuButton>
						<div className='text-zinc-400 font-light uppercase mt-5 pl-2 pb-2'>
							contacts
						</div>
						<MenuButton onClick={() => setShow(!show)} link='/patients' title="Patients" roles={['ROLE_NURSE', 'ROLE_ORGANIZATION']}>
							<IoPersonCircleOutline size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} link='/doctors' title="Médecins" roles={['ROLE_USER']}>
							<RiStethoscopeFill size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} link='/assurances' title="Assurances" roles={['ROLE_USER']}>
							<MdOutlineHealthAndSafety size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} link='/partners' title="Partenaires" roles={['ROLE_NURSE', 'ROLE_ORGANIZATION']}>
							<FaHandshake size={25} />
						</MenuButton>
						<div className='text-zinc-400 font-light uppercase mt-5 pl-2 pb-2'>
							paramètres
						</div>
						<MenuButton onClick={() => setShow(!show)} link='/services' title="Prestations" roles='ROLE_ADMIN'>
							<GiHealthNormal size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} link='/account' title="Mon compte" roles={['ROLE_NURSE', 'ROLE_DOCTOR', 'ROLE_ORGANIZATION']}>
							<MdOutlineSettings size={25} />
						</MenuButton>
						<MenuButton onClick={() => setShow(!show)} link='/users' title="Utilisateurs" roles={['ROLE_ADMIN']}>
							<MdSupervisedUserCircle size={25} />
						</MenuButton>
						<MenuButton onClick={() => logout()} title="Déconnexion" roles={['ROLE_ADMIN', 'ROLE_NURSE', 'ROLE_DOCTOR', 'ROLE_ORGANIZATION']}>
							<HiLogout size={25} />
						</MenuButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Menu