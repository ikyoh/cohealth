import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../features/users/usersSlice";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/forms/FormInput';
import FormCheckbox from '../components/forms/FormCheckbox';
import FormSelect from '../components/forms/FormSelect';

const RegistrationForm = ({ event }) => {

    const dispatch = useDispatch()

    const [initialValues, setInitialValues] = useState({
        roles: ['ROLE_NURSE'],
        firstname: '',
        lastname: '',
        organization: '',
        phone: '',
        email: '',
        fax: '',
        mobile: '',
        npa: '',
        city: '',
        canton: '',
        address1: '',
        address2: '',
        gln: '',
        rcc: '',
        iban: '',
        isOptin: false,
        isCondition: false,
    })

    const validationSchema = Yup.object({
        firstname: Yup.string().required('Champ obligatoire'),
        lastname: Yup.string().required('Champ obligatoire'),
        email: Yup.string().email('Email incorrect').required('Champ obligatoire'),
        mobile: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect").required("Champ obligatoire"),
        phone: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect"),
        roles: Yup.array().min(1, "Champ obligatoire").required("Champ obligatoire"),
        isOptin: Yup.boolean()
            .required("Doit être accepter.")
            .oneOf([true], "Doit être accepter."),
        isCondition: Yup.boolean()
            .required("Doit être accepter.")
            .oneOf([true], "Doit être accepter.")
    })

    console.log('initialValues', initialValues)

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
                setSubmitting(true);
                event ? dispatch(updateUser(values)) : dispatch(addUser(values))
                setSubmitting(false)

            }}
        >
            {({ isSubmitting, values }) => (
                <Form className=''>
                    <div className="my-5">
                        <div className='grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2'>
                            <FormSelect name="roles[0]" label="Catégorie" className="md:col-span-2">
                                <option value="ROLE_NURSE">Infirmier libéral</option>
                                <option value="ROLE_ORGANIZATION">Organisation</option>
                                <option value="ROLE_DOCTOR">Médecin</option>
                                <option value="ROLE_ORGANIZATION">Cabinet médical</option>
                            </FormSelect>
                            {values.roles.includes("ROLE_ORGANIZATION") &&
                                < FormInput name="organization" label="Organisation" placeholder="Nom de l'organisation" className="md:col-span-2" />
                            }
                            <FormInput name="firstname" label="Prénom" placeholder="Prénom" />
                            <FormInput name="lastname" label="Nom" placeholder="Nom" />
                            <FormInput name="phone" label="Téléphone" placeholder="" />
                            <FormInput name="mobile" label="Mobile" placeholder="" />
                            <FormInput name="email" label="Email" placeholder="" />
                            <FormInput name="fax" label="Fax" placeholder="" />
                            <FormInput name="address1" label="Adresse" className="md:col-span-2" />
                            <FormInput name="address2" label="Complément d'adresse" className="md:col-span-2" />
                            <FormInput name="npa" label="NPA" placeholder="" />
                            <FormInput name="city" label="Ville" placeholder="" />
                            <FormInput name="rcc" label="RCC" placeholder="" />
                            <FormInput name="gln" label="GLN" placeholder="" />
                            <FormCheckbox name="isOption" label="RGPD" />
                            <FormCheckbox name="isCondition" label="CGV" />
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

export default RegistrationForm