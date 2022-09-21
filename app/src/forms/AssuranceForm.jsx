import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addAssurance, updateAssurance, selectAllAssurances, fetchAssurance } from "../features/assurances/assurancesSlice"
import { fetchAssuranceComment, selectAssuranceComment, addComment, updateComment } from "../features/comments/commentsSlice"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import AssuranceFields from './AssuranceFields'
import FormComment from '../components/forms/FormComment'

const AssuranceForm = ({ event = false, handleCloseModal }) => {

    const dispatch = useDispatch()

    const assurances = useSelector(selectAllAssurances)

    const [assurance, setAssurance] = useState({
        isActive: true,
        company: '',
        organization: '',
        type: '',
        address1: '',
        address2: '',
        npa: '',
        city: '',
        phone: '',
        email: '',
        www: '',
        gln: ''
    })

    const comment = useSelector(selectAssuranceComment)

    const validationSchema = Yup.object({
        company: Yup.string().required('Champ obligatoire'),
        type: Yup.string().required('Champ obligatoire'),
    })

    useEffect(() => {

        if (event && !assurance.fulfilled) {
            dispatch(fetchAssurance(event.id))
        }

        if (event) {
            dispatch(fetchAssuranceComment(event.id))
        }

    }, [])


    useEffect(() => {
        if (event) {
            const index = assurances.findIndex(obj => (obj.id === Number(event.id)))
            setAssurance(assurances[index])
        }
    }, [assurances])

    return (
        <>
            <div className="form-body">
                <div className="p-5 overflow-y-scroll">
                    <Formik
                        enableReinitialize={true}
                        initialValues={assurance}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true)
                            event ? dispatch(updateAssurance(values)) : dispatch(addAssurance(values))
                            setSubmitting(false)
                            handleCloseModal()
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div>
                                    <AssuranceFields />
                                </div>
                                <div className="form-footer">
                                    <button type="submit" className='button-submit' disabled={isSubmitting}>Valider</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    {event &&
                        <Formik
                            enableReinitialize={true}
                            initialValues={{ ...comment, assurance: assurance['@id'] }}
                            // validationSchema={validationSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true)
                                console.log('values', values)
                                comment['@id'] ? dispatch(updateComment(values)) : dispatch(addComment(values))
                                setSubmitting(false)
                                // handleCloseModal()
                            }}
                        >
                            {({ isSubmitting }) => (
                                <Form className=''>
                                    <div className="">
                                        <FormComment name='content' />
                                    </div>
                                    <div className="form-footer">
                                        <button type="submit" className='button-submit' disabled={isSubmitting}>Valider mon commentaire</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    }
                </div>
            </div>



        </>
    )

}

export default AssuranceForm