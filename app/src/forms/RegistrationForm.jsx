import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { registerAccount, getAccountError, getAccountStatus } from "../features/account/accountSlice";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/forms/FormInput';
import FormCheckbox from '../components/forms/FormCheckbox';
import FormSelect from '../components/forms/FormSelect';
import { CgSpinner } from "react-icons/cg";

const RegistrationForm = () => {

    const dispatch = useDispatch()
    const status = useSelector(getAccountStatus)
    const errors = useSelector(getAccountError)

    console.log('status', status)
    console.log('errors', errors)

    const initialValues = {
        roles: ['ROLE_NURSE'],
        firstname: '',
        lastname: '',
        organization: '',
        email: '',
        mobile: '',
        password: '',
        checkpassword: '',
        rcc: '',
        isOptin: false,
        isCondition: false,
    }

    const validationSchema = Yup.object({
        roles: Yup.array().min(1, "Champ obligatoire").required("Champ obligatoire"),
        firstname: Yup.string().ensure().when('roles', {
            is: (roles) => !roles.find(element => (element.toLowerCase().includes("ORGANIZATION".toLowerCase()))),
            then: Yup.string().required('Champ obligatoire')
        }),
        lastname: Yup.string().ensure().when('roles', {
            is: (roles) => !roles.find(element => (element.toLowerCase().includes("ORGANIZATION".toLowerCase()))),
            then: Yup.string().required('Champ obligatoire')
        }),
        organization: Yup.string().ensure().when('roles', {
            is: (roles) => roles.find(element => (element.toLowerCase().includes("ORGANIZATION".toLowerCase()))),
            then: Yup.string().required('Champ obligatoire')
        }),
        email: Yup.string().email('Email incorrect').required('Champ obligatoire'),
        mobile: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect").required("Champ obligatoire"),
        phone: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect"),
        rcc: Yup.string().ensure().when('roles', {
            is: (roles) => roles.includes("ROLE_NURSE") || roles.includes("ROLE_DOCTOR"),
            then: Yup.string().required('Champ obligatoire')
        }),
        password: Yup.string()
            .required("Champ obligatoire")
            .oneOf([Yup.ref('checkpassword')], 'Le mot de passe ne correspond pas'),
        checkpassword: Yup.string()
            .required("Champ obligatoire")
            .oneOf([Yup.ref('password')], 'Le mot de passe ne correspond pas'),
        isOptin: Yup.boolean()
            .required("Doit être accepter.")
            .oneOf([true], "Doit être accepter."),
        isCondition: Yup.boolean()
            .required("Doit être accepter.")
            .oneOf([true], "Doit être accepter.")
    })

    const checkError = (inputname) => {
        if (errors) {
            const index = errors.findIndex(obj => obj.propertyPath === inputname)
            if (index >= 0)
                return errors[index].message
            else return false
        }
        else return false
    }


    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                dispatch(registerAccount(values))
                setSubmitting(false)

            }}
        >
            {({ isSubmitting, values, errors }) => (
                <Form className=''>
                    <div className="my-5">
                        <div className='grid gap-x-10 gap-y-5 grid-cols-1'>
                            <FormSelect name="roles[0]" label="Je suis">
                                <option value="ROLE_NURSE">Un infirmier indépendant</option>
                                <option value="ROLE_DOCTOR">Un médecin</option>
                                <option value="ROLE_ORGANIZATION_BENEFIT">Une organisation de services à domicile</option>
                                <option value="ROLE_ORGANIZATION_MANDATARY">Un cabinet médical</option>
                                <option value="ROLE_ORGANIZATION_MANDATARY">Un hôpital / une clinique</option>
                            </FormSelect>
                            {values.roles.find(element => (element.toLowerCase().includes("ORGANIZATION".toLowerCase())))
                                &&
                                < FormInput name="organization" label="Organisation" placeholder="Nom / Raison sociale" />
                            }
                            {!values.roles.find(element => (element.toLowerCase().includes("ORGANIZATION".toLowerCase())))
                                &&
                                <>
                                    <FormInput name="lastname" label="Nom" placeholder="Nom" />
                                    <FormInput name="firstname" label="Prénom" placeholder="Prénom" />
                                </>
                            }
                            <FormInput name="mobile" label="Mobile" placeholder="Numéro de téléphone mobile" error={checkError("mobile")} />
                            <FormInput name="email" label="Email" placeholder="Adresse Email" error={checkError("email")} />
                            {!values.roles.find(element => (element.toLowerCase().includes("ORGANIZATION".toLowerCase())))
                                &&
                                <FormInput name="rcc" label="RCC" placeholder="Registre des codes-créanciers" error={checkError("rcc")} />
                            }
                            <FormInput name="password" label="Mot de passe" type="password" />
                            <FormInput name="checkpassword" label="Confirmation du mot de passe" type="password" />
                            <FormCheckbox name="isOptin" label="GDPR (J'ai lu et j'accepte Le règlement européen sur la protection des données)" />
                            <FormCheckbox name="isCondition" label="CGDV (J'ai lu et j'accepte les conditions générales de vente)" />
                        </div>
                    </div>
                    <div className="form-footer">
                        <button type="submit" className="button-submit flex justify-center h-10 items-center px-3" disabled={isSubmitting || Object.keys(errors).length !== 0 || status === 'loading'}>
                            {isSubmitting || status === 'loading' ? <CgSpinner size={24} className='animate-spin' /> : "Je m'inscris"}
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    )

}

export default RegistrationForm