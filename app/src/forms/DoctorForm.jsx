import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { addDoctor, updateDoctor, fetchDoctor, selectAllDoctors } from "../features/doctors/doctorsSlice"
import { fetchDoctorComment, selectDoctorComment, addComment, updateComment } from "../features/comments/commentsSlice"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import DoctorFields from './DoctorFields'
import FormComment from '../components/forms/FormComment'

const DoctorForm = ({ event = false, handleCloseModal }) => {

    const dispatch = useDispatch()

    const doctors = useSelector(selectAllDoctors)

    const [doctor, setDoctor] = useState({
        category: '',
        fullname: '',
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
        isActive: true,
    })

    const comment = useSelector(selectDoctorComment)

    const validationSchema = Yup.object({
        category: Yup.string().required('Champ obligatoire'),
        fullname: Yup.string().required('Champ obligatoire')
    })

    useEffect(() => {

        if (event && !doctor.fulfilled) {
            dispatch(fetchDoctor(event.id))
        }

        if (event) {
            dispatch(fetchDoctorComment(event.id))
        }

    }, [])


    useEffect(() => {
        if (event) {
            const index = doctors.findIndex(obj => (obj.id === Number(event.id)))
            setDoctor(doctors[index])
        }
    }, [doctors])

    return (
        <>

            <div className="form-body">
                <div className="p-5 overflow-y-scroll">

                    <Formik
                        enableReinitialize={true}
                        initialValues={doctor}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            console.log('first')
                            setSubmitting(true)
                            event ? dispatch(updateDoctor(values)) : dispatch(addDoctor(values))
                            setSubmitting(false)
                            handleCloseModal()
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className=''>
                                <div className="">
                                    <DoctorFields />
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
                            initialValues={{ ...comment, doctor: doctor['@id'] }}
                            onSubmit={async (values, { setSubmitting }) => {
                                setSubmitting(true)
                                comment['@id'] ? dispatch(updateComment(values)) : dispatch(addComment(values))
                                setSubmitting(false)
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

export default DoctorForm