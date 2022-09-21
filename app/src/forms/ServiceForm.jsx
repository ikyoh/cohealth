import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux"
import { addService, updateService } from "../features/services/servicesSlice"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormInput from '../components/forms/FormInput'
import FormTextarea from '../components/forms/FormTextarea'
import FormCheckbox from '../components/forms/FormCheckbox'
import FormSelect from '../components/forms/FormSelect'
import { services_family } from '../utils/arrays'
import { nanoid } from "@reduxjs/toolkit"
import { legalCares } from '../utils/arrays'

const ServiceForm = ({ event = false, handleCloseModal }) => {

    const dispatch = useDispatch()

    const [initialValues, setInitialValues] = useState({
        title: '',
        family: '',
        act: false,
        category: '',
        time: false,
        description: '',
        isActive: true,
    })

    const validationSchema = Yup.object({
        title: Yup.string().required('Champ obligatoire'),
        family: Yup.string().required('Champ obligatoire'),
        act: Yup.number().required('Champ obligatoire'),
        category: Yup.string().required('Champ obligatoire'),
        time: Yup.number().required('Champ obligatoire'),
    })

    console.log('render')

    useEffect(() => {
        if (event) setInitialValues(event)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}

            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                event ? dispatch(updateService(values)) : dispatch(addService(values))
                setSubmitting(false)
                handleCloseModal()
            }}
        >
            {({ isSubmitting }) => (
                <Form className='form-body'>
                    <div className="form-content">
                        <div className='grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2'>
                            <FormSelect name="family" label="Famille" required={true}>
                                <option value="">Choisir une famille</option>
                                {services_family.map(item =>
                                    <option key={nanoid()} value={item}>{item}</option>
                                )}
                            </FormSelect>
                            <FormSelect name="category" label="Catégorie" placeholder="" required={true}>
                                <option value="">Choisir une catégorie</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="N">N</option>
                            </FormSelect>
                            <FormSelect name="opas" label="Article 7 OPAS" placeholder="" required={true}>
                                <option value="">Choisir un article</option>
                                {legalCares.map((l) =>
                                    <option value={l}>{l}</option>
                                )}
                            </FormSelect>
                            <FormInput name="title" label="Intitulé" placeholder="" required={true} />
                            <FormInput name="act" type="number" label="Numéro d'acte" placeholder="" required={true} />
                            <FormInput name="time" type="number" label="Durée" placeholder="" required={true} />
                            <FormTextarea name="description" label="Description" placeholder="" className="col-span-2" />
                            <FormCheckbox name="isActive" label="Actif" />
                        </div>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className='button-submit' disabled={isSubmitting}>Valider</button>
                    </div>
                </Form>
            )}
        </Formik>
    )

}

export default ServiceForm