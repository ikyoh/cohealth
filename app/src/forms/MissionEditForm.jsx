import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { updateMission } from "../features/missions/missionsSlice";
import { fetchPatient } from "../features/patients/patientsSlice";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import DoctorFields from './DoctorFields';
import AssuranceFields from './AssuranceFields';
import PatientFields from './PatientFields';
import FormSelectDoctorIRI from '../components/forms/FormSelectDoctorIRI';
import FormSelectPartnerIRI from '../components/forms/FormSelectPartnerIRI';
import FormSelectAssuranceIRI from '../components/forms/FormSelectAssuranceIRI';
import MissionFields from './MissionFields';
import _ from 'lodash';
import { doctor, assurance, patient } from '../utils/arrays';

// modalAction can be  / doctorIRI / addDoctor / assuranceIRI / addAssurance / updatePatient
const MissionEditForm = ({ event = false, modalAction = false, handleCloseModal }) => {

    const [action, setAction] = useState(modalAction)

    const dispatch = useDispatch()

    const [initialValues, setInitialValues] = useState({
        description: '',
        status: '',
        doctorIRI: null,
        assuranceIRI: null,
        beginAt: null,
        endAt: null,
        coworkersDetailed: [],
        doctor: doctor,
        assurance: assurance,
        patient: patient,

    })

    const validationSchema = {
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
        doctorIRI: Yup.object({
            doctorIRI: Yup.string().required('Choix obligatoire').typeError('Choix obligatoire')
        }),
        assuranceIRI: Yup.object({
            assuranceIRI: Yup.string().required('Choix obligatoire').typeError('Choix obligatoire')
        }),
        updatePatient: Yup.object({
            patient: Yup.object({
                firstname: Yup.string().required('Champ obligatoire'),
                lastname: Yup.string().required('Champ obligatoire'),
                gender: Yup.string().required('Champ obligatoire'),
                // phone: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect"),
                mobile: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect"),
                email: Yup.string().email('Email incorrect')
            })
        }),
        updateMission: Yup.object({
            mission: Yup.object({
                beginAt: Yup.date().typeError("Date obligatoire"),
                endAt: Yup.date().typeError("Date obligatoire"),
            })
        }),
    }

    useEffect(() => {

        if (event && modalAction === "updatePatient")
            dispatch(fetchPatient(event.patient.id)).then(response =>
                setInitialValues({ ...initialValues, ...event, patient: response.payload }))
        if (event) {
            setInitialValues({ ...initialValues, ...event, doctor: doctor, assurance: assurance })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema[action]}
            onSubmit={async (values, { setSubmitting }) => {
                console.log('values', values)
                setSubmitting(true);
                dispatch(updateMission({ values: values, action: action }))
                setSubmitting(false)
                handleCloseModal()
            }}
        >
            {({ isSubmitting, values, setFieldValue, errors }) => (
                <Form className='form-body'>
                    <div className="form-content" style={{ paddingTop: 0 }}>
                        {action === 'updatePatient' && <PatientFields name="patient" className='pt-5' />}
                        {action === 'updateMission' && <MissionFields />}
                        {action === 'addDoctor' && <DoctorFields name="doctor" className='pt-5' />}
                        {action === 'selectPartners' && <FormSelectPartnerIRI setField={setFieldValue} value={values.coworkersDetailed} />}
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
                            <button type="submit" className='button-submit' disabled={true}>Valider</button>
                        }
                    </div>
                </Form>
            )}
        </Formik>
    )

}

export default MissionEditForm