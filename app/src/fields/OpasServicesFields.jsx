import React, { useState, useEffect } from 'react'

import { useGetAllDatas } from '../queryHooks/useService'
import { serviceCategoryColor, services_family } from '../utils/arrays'
import { useFieldArray } from "react-hook-form";
import { VscClose, VscChevronUp } from 'react-icons/vsc'
import { useSearch } from '../hooks/useSearch';
import { calcNumberOfDays } from '../utils/functions';

const OpasServicesFields = ({ errors, register, totalAHours, totalBHours, totalCHours, beginAt, endAt }) => {

	const [search, setSearch] = useState('Evaluation - Conseil - Coordination')
	const { searchbar, searchValue, setValue } = useSearch()
	const { data } = useGetAllDatas(searchValue, search, 'title', 'asc', true)

	const { fields, prepend, remove } = useFieldArray({
		name: "content.services"
	});

	useEffect(() => {
		if (searchValue !== "")
			setSearch("")
		if (searchValue === "")
			setSearch("Evaluation - Conseil - Coordination")
	}, [searchValue])


	const Service = ({ item }) => {

		const handleAddService = (event) => {
			const service = { ...event }
			delete service.description
			delete service.isActive
			prepend({ ...service, "periodicity": "période", "time": event.time, "frequency": 1 })
		}

		return (
			<div className='mb-5'>
				<div className='w-full flex flex-wrap gap-2 items-start'>
					<div className={`flex-none ${serviceCategoryColor[item.category]}`}>
						{item.category}
					</div>
					<div className='cursor-pointer grow max-w-[85%]' onClick={() => handleAddService(item)}>
						{item.title}
					</div>
					<button type="button" className='peer group'>
						<div className='flex-none group-focus:rotate-180'>
							<VscChevronUp size={24} />
						</div>
					</button>
					<div className='w-full text-slate-500 pb-3 hidden peer-focus:block'>
						{item.description}
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			<div className='flex border-b items-center pb-2'>
				<div className='flex-none w-1/3 items-center'>
					{searchbar}
				</div>
				<div className='flex flex-none w-1/3 items-center justify-center'>
					Durée de la mission : {calcNumberOfDays(beginAt, endAt)} jours
				</div>
				<div className='flex justify-evenly flex-none w-1/3 items-center'>
					<div>
						A : {totalAHours} h
					</div>
					<div>
						B : {totalBHours} h
					</div>
					<div>
						C : {totalCHours} h
					</div>
					<div>
						Total : {totalAHours + totalBHours + totalCHours} h
					</div>
				</div>
			</div>
			<div className='grid grid-cols-3 relative h-full'>
				<div className='px-5'>
					<div className='font-semibold mb-3'>
						Catégorie
					</div>
					<div className='flex flex-col'>
						{services_family.map(item =>
							<div
								key={item}
								value={item}
								className={`px-3 py-2 cursor-pointer hover:bg-slate-400 ${item === search && 'bg-action'}`}
								onClick={() => {
									setValue("")
									setSearch(item)
								}
								}
							>
								{item}
							</div>
						)}
					</div>
				</div>
				<div className='px-5 border-x'>
					<div className='font-semibold mb-3'>
						Soins
					</div>
					{data && data.map(item => (
						<Service item={item} key={item.id} />
					))}
				</div>
				<div className='px-5'>
					<div className='font-semibold mb-3'>
						Prescriptions ({fields.length})
					</div>
					{fields.map((field, index) =>
						<div key={field.id} className='flex flex-col gap-2 border-b py-3'>
							<div className='flex gap-2 items-start'>
								<div className={`flex-none ${serviceCategoryColor[field.category]}`}>
									{field.category}
								</div>
								<div className='grow max-w-[85%]'>
									{field.title}
								</div>
								<div className='flex-none'>
									<VscClose size={28} className="text-slate-600 cursor-pointer" onClick={() => remove(index)} />
								</div>
							</div>
							<div className='flex flex-col gap-2 text-sm'>
								<div className='flex items-center gap-3'>
									<div className='flex-none w-24'>
										Durée
									</div>
									<input
										className='input input-bordered input-sm w-24'
										type='number'
										{...register(`content.services.${index}.time`, { valueAsNumber: true, required: true })}
									/>
									minutes
								</div>
								<div className='flex items-center gap-3'>
									<div className='flex-none w-24'>
										Fréquence
									</div>
									<div className='flex items-center gap-3'>
										<input
											className='input input-bordered input-sm w-24'
											type='number'
											{...register(`content.services.${index}.frequency`, { valueAsNumber: true, required: true })}
										/>
										<div className='w-14'>
											fois par
										</div>
										<select
											{...register(`content.services.${index}.periodicity`, { required: true })}
											className='input input-bordered input-sm w-28'>
											<option value="période">période</option>
											<option value="jour">jour</option>
											<option value="semaine">semaine</option>
											<option value="mois">mois</option>
										</select>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	)
}

export default OpasServicesFields