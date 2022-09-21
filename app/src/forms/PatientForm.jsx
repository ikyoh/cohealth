import React, { useState, useEffect } from 'react'
import { useDispatch } from "react-redux";
import { addPatient, updatePatient, fetchPatient } from "../features/patients/patientsSlice";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import PatientFields from './PatientFields';
import DoctorFields from './DoctorFields';
import AssuranceFields from './AssuranceFields';
import FormSelectDoctorIRI from '../components/forms/FormSelectDoctorIRI';
import FormSelectAssuranceIRI from '../components/forms/FormSelectAssuranceIRI';
import { doctor, assurance, patient } from '../utils/arrays';
import _ from 'lodash';

// modalAction can be  / selectDoctor / addDoctor / selectAssurance / addAssurance /
const PatientForm = ({ event = false, modalAction = 'patient', handleCloseModal }) => {

    const [action, setAction] = useState(modalAction)

    const dispatch = useDispatch()

    const [initialValues, setInitialValues] = useState({
        patient: patient,
        doctorIRI: null,
        assuranceIRI: null,
        doctor: doctor,
        assurance: assurance
    })

    useEffect(() => {
        if (event) {
            const datas = {...event}
            delete datas.doctor
            delete datas.assurance
            setInitialValues({ ...initialValues, patient: datas })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const validationSchema = {
        patient: Yup.object({
            patient: Yup.object({
                firstname: Yup.string().required('Champ obligatoire'),
                lastname: Yup.string().required('Champ obligatoire'),
                gender: Yup.string().required('Champ obligatoire'),
                // phone: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect"),
                //mobile: Yup.string().matches(/^0[0-9]{10}/, "Numéro incorrect"),
                email: Yup.string().email('Email incorrect')
            })
        }),
        doctorIRI: Yup.object({
            doctorIRI: Yup.string().required('Choix obligatoire').typeError('Choix obligatoire')
        }),
        assuranceIRI: Yup.object({
            assuranceIRI: Yup.string().required('Choix obligatoire').typeError('Choix obligatoire')
        }),
        addDoctor: Yup.object({
            doctor: Yup.object({
                fullname: Yup.string().required('Champ obligatoire'),
                category: Yup.string().required('Choix obligatoire'),
            })
        }),
        addAssurance: Yup.object({
            assurance: Yup.object({
                company: Yup.string().required('Champ obligatoire'),
                type: Yup.string().required('Champ obligatoire'),
            })
        }),
    }

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema[action]}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                event ? dispatch(updatePatient({ values: values, action: action })) : dispatch(addPatient(values))
                setSubmitting(false)
                handleCloseModal()
            }}
        >
            {({ isSubmitting, values, setFieldValue, errors }) => (
                <Form className='form-body'>
                    <div className="form-content" style={{ paddingTop: 0 }}>
                        {action === 'patient' && <PatientFields name="patient" className='pt-5' />}
                        {action === 'addDoctor' && <DoctorFields name="doctor" className='pt-5' />}
                        {action === 'doctorIRI' && <FormSelectDoctorIRI setField={setFieldValue} value={values.doctorIRI} />}
                        {action === 'addAssurance' && <AssuranceFields name="assurance" className='pt-5' />}
                        {action === 'assuranceIRI' && <FormSelectAssuranceIRI setField={setFieldValue} value={values.assuranceIRI} />}
                    </div>
                    <div className="form-footer">

                        {action === 'doctorIRI' &&
                            <div className='button-info' onClick={() => setAction('addDoctor')}>Nouveau médecin</div>
                        }
                        {action === 'addDoctor' &&
                            <div className='button-info' onClick={() => setAction('doctorIRI')}>Chercher un médecin</div>
                        }
                        {action === 'assuranceIRI' &&
                            <div className='button-info' onClick={() => setAction('addAssurance')}>Nouvelle assurance</div>
                        }
                        {action === 'addAssurance' &&
                            <div className='button-info' onClick={() => setAction('assuranceIRI')}>Chercher une assurance</div>
                        }

                        {_.isEmpty(errors) ?
                            <button type="submit" className='button-submit' disabled={isSubmitting}>Valider</button>
                            :
                            <button type="submit" className='button-error' disabled={isSubmitting}>Valider</button>
                        }
                    </div>
                </Form>
            )}
        </Formik>
    )

}

export default PatientForm