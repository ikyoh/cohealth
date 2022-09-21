import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { updateAccountMedia } from "../features/account/accountSlice"
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'


const AccountMediaForm = ({ type = "avatar", handleCloseModal }) => {

    const dispatch = useDispatch()

    const initialValues = {
        type: type,
        file: ''
    }

    const validationSchema = Yup.object({
        file: Yup.string().required('Champ obligatoire'),
    })


    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema = {validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                dispatch(updateAccountMedia(values))
                setSubmitting(false)
                handleCloseModal()
            }}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className='form-body'>
                    <div className="form-content">
                        <div className='grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2'>
                            <input
                                name='file'
                                type='file'
                                onChange={(event) => setFieldValue("file", event.target.files[0])}
                            />
                        </div>
                        <ErrorMessage name='file' render={msg => <div className="error">({msg})</div>} />
                    </div>
                    <div className="form-footer">
                        <button type="submit" className='button-submit' disabled={isSubmitting}>Valider</button>
                    </div>
                </Form>
            )}
        </Formik>
    )

}

export default AccountMediaForm