import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAccountError, getAccountToken, getAccountStatus } from "../features/account/accountSlice";
import { login } from "../features/authentication/authenticationSlice";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { CgSpinner } from "react-icons/cg";

const LoginFrom = () => {

    const dispatch = useDispatch()
    const error = useSelector(getAccountError);
    const token = useSelector(getAccountToken);
    const status = useSelector(getAccountStatus);
    
    const initialValues = {
        username: '',
        password: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Champ obligatoire'),
        password: Yup.string().required('Champ obligatoire'),
    })


    return (
        <>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);
                    dispatch(login(values))
                    setSubmitting(false)
                }}
            >
                {({ isSubmitting }) => (
                    <Form className=''>
                        <div className="my-3">
                            <label htmlFor="username" className='text-sm'>
                                Identifiant
                            </label>
                            <Field type="text" name="username" className="appearance-none h-10 border rounded-sm px-2 w-full border-gray-200 leading-tight focus:outline-none focus:shadow-sm focus:shadow-gray-200" />
                        </div>
                        <div className="my-3">
                            <label htmlFor="password" className='text-sm'>
                                Mot de passe
                            </label>
                            <Field type="password" name="password" className="appearance-none h-10 border rounded-sm px-2 w-full border-gray-200 leading-tight focus:outline-none focus:shadow-sm focus:shadow-gray-200" />
                        </div>

                        <div className='text-red-500 h-6 text-center'>{error && "Problème de connexion"}</div>

                        <div className="flex justify-center text-center mt-5">
                            <button type="submit" className="button-submit w-6/12 flex justify-center h-10 items-center p-0" disabled={isSubmitting ||  token === "loading" || status === "loading" }>
                                {token === "loading" || status === "loading" ? <CgSpinner size={24} className='animate-spin' /> : "Connexion"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default LoginFrom