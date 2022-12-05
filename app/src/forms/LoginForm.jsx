import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAccountError, getAccountStatus, getAccountUsername, getAccountPassword } from "../features/account/accountSlice";
import { login, getAuthenticationStatus } from "../features/authentication/authenticationSlice";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CgSpinner } from "react-icons/cg";

const LoginFrom = () => {

    const dispatch = useDispatch()
    const accountstatus = useSelector(getAccountStatus);
    const authstatus = useSelector(getAuthenticationStatus);
    const username = useSelector(getAccountUsername);
    const password = useSelector(getAccountPassword);
    
    const initialValues = {
        username: username || "",
        password: password || ""
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
                    <Form>
                        <div className="my-3">
                            <label htmlFor="username" className='text-sm'>
                                Identifiant*
                            </label>
                            <Field type="text" name="username" className="appearance-none h-10 border rounded-sm px-2 w-full border-gray-200 leading-tight focus:outline-none focus:shadow-sm focus:shadow-gray-200" />
                            <ErrorMessage name="username" render={msg =>  <div className="error">({msg})</div>} />
                        </div>
                        <div className="my-3">
                            <label htmlFor="password" className='text-sm'>
                                Mot de passe*
                            </label>
                            <Field type="password" name="password" className="appearance-none h-10 border rounded-sm px-2 w-full border-gray-200 leading-tight focus:outline-none focus:shadow-sm focus:shadow-gray-200" />
                            <ErrorMessage name="username" render={msg =>  <div className="error">({msg})</div>} />
                        </div>

                        <div className='text-red-500 h-6 text-center'>{authstatus ==='failed' && "Problème de connexion"}</div>

                        <div className="flex justify-center text-center mt-5">
                            <button type="submit" className="button-submit w-6/12 flex justify-center h-10 items-center p-0" disabled={isSubmitting || accountstatus === "loading" }>
                                {isSubmitting || accountstatus === "loading" ? <CgSpinner size={24} className='animate-spin' /> : "Connexion"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default LoginFrom