import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
//import { addUser, updateUser } from "../../features/users/usersSlice";
import { getAccount, updateAccount } from "../features/account/accountSlice";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/forms/FormInput';
import FormCheckbox from '../components/forms/FormCheckbox';
import FormFile from '../components/forms/FormFile';

const AccountForm = () => {

    const dispatch = useDispatch()

    const account = useSelector(getAccount);

    const [initialValues, setInitialValues] = useState({
        firstname: '',
        lastname: '',
        organization: '',
        phone: '',
        email: '',
        fax: '',
        mobile: '',
        npa: '',
        city: '',
        address1: '',
        address2: '',
        gln: '',
        rcc: '',
        iban: '',
        bic : '',
        isActive: true,
    })



    const validationSchema = Yup.object({
        firstname: Yup.string().required('Champ obligatoire'),
    })

    useEffect(() => {
        const values = {...account}
        delete values.avatar
        delete values.signature
        delete values.password
        delete values.partners
        setInitialValues(values)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                dispatch(updateAccount(values))
                setSubmitting(false)
            }}
        >
            {({ isSubmitting, values }) => (

                <Form className='bg-white'>
                    <div className="">
                        <div className='grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2'>

                            {account.roles.includes('ROLE_ORGANIZATION')
                                &&
                                <FormInput name="organization" label="Organisation" placeholder="Nom de l'organisation" className="col-span-2" />
                            }
                            <FormInput name="firstname" label="Prénom" placeholder="Prénom" />
                            <FormInput name="lastname" label="Nom" placeholder="Nom" />
                            <FormInput name="phone" label="Téléphone" placeholder="" />
                            <FormInput name="mobile" label="Mobile" placeholder="" />
                            <FormInput name="email" label="Email" placeholder="" />
                            <FormInput name="fax" label="Fax" placeholder="" />
                            <FormInput name="address1" label="Adresse" className="col-span-2" />
                            <FormInput name="address2" label="Complément d'adresse" className="col-span-2" />
                            <FormInput name="npa" label="Code postal" placeholder="" />
                            <FormInput name="city" label="Ville" placeholder="" />
                            <FormInput name="rcc" label="RCC" placeholder="" />
                            <FormInput name="gln" label="GLN" placeholder="" />
                            <FormInput name="iban" label="IBAN" />
                            <FormInput name="bic" label="BIC" />
                        </div>
                    </div>
                    {values  !== initialValues &&
                    <div className="flex justify-center my-3">
                        <button type="submit" className='button-submit' disabled={isSubmitting}>Enregistrer les modifications</button>
                    </div>
                    }
                </Form>
            )}
        </Formik>
    )

}

export default AccountForm