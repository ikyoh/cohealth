import React, { useState, useEffect } from 'react'
import { Field, ErrorMessage, useFormikContext, useField } from 'formik'


import dayjs from 'dayjs'

const FormDatePicker = ({ label, name, required = false, disabled = false, className = null }) => {

	const [mounted, setMounted] = useState(false)

	return (
		<div className={`bg-gray-100 p-2 rounded ${className ? className : ''}`}>
			<div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-0 md:items-center text-sm input-group">
				<label htmlFor={name} className="">
					{label}
					{required && <span className='text-red-500'>*</span>}
				</label>
				<Field name={name}>
					{({ field, meta, form: { setFieldValue } }) => {

						if (!mounted) return (
							<input type='date'
								{...field}
								value={field.value ? dayjs(field.value).format('YYYY-MM-DD') : null}
								onChange={(e) => {
									setMounted(true)
									setFieldValue(field.name, e.target.value || null)
								}}
							/>
						)
						else return (
							<input type='date'
								{...field}
								value={field.value ? field.value : null}
								onChange={(e) => {
									setFieldValue(field.name, e.target.value || null)
								}}
							/>
						)
					}}
				</Field>
			</div>
			<ErrorMessage name={name} render={msg => <div className="error">({msg})</div>} />
		</div>

	)

}


export default FormDatePicker