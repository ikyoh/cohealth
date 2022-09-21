import React, { useState } from 'react'
import { useDispatch } from "react-redux"
import { addMission, updateMission } from "../features/missions/missionsSlice"
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormSelectPatientIRI from '../components/forms/FormSelectPatientIRI'
import FormSelectDoctorIRI from '../components/forms/FormSelectDoctorIRI'
import FormSelectAssuranceIRI from '../components/forms/FormSelectAssuranceIRI'
import FormTextarea from '../components/forms/FormTextarea'
import PatientFields from '../forms/PatientFields'
import { AiFillPlusCircle } from "react-icons/ai"
import { IoSearchCircle, IoAddCircle } from "react-icons/io5"
import FormDatePicker from '../components/forms/FormDatePicker'
import dayjs from 'dayjs'
import _ from 'lodash'

const MissionForm = ({ handleCloseModal }) => {

    const dispatch = useDispatch()

    const patient = {
        firstname: '',
        lastname: '',
        gender: '',
        status: '',
        address1: '',
        address2: '',
        npa: '',
        canton: 'Genève',
        city: '',
        phone: '',
        mobile: '',
        email: '',
        birthdate: null,
        avsNumber: '',
        assuranceNumber: '',
        furtherInfos: '',
    }

    const [data, setData] = useState({
        beginAt: dayjs(),
        endAt: dayjs(),
        patientIRI: null,
        description: "",
        patient: patient

    })

    const [currentStep, setCurrentStep] = useState(0)

    const [action, setAction] = useState('patientIRI')

    const validationSchemaStep1 = Yup.object({
        beginAt: Yup.date().typeError("Date obligatoire"),
        endAt: Yup.date().typeError("Date obligatoire"),
    })

    const validationSchemaStep2 =

    {
        patientIRI: Yup.object({
            patientIRI: Yup.string().required('Choix obligatoire').typeError('Choix obligatoire')
        }),
        addPatient: Yup.object({
            patient: Yup.object({
                firstname: Yup.string().required('Champ obligatoire'),
                lastname: Yup.string().required('Champ obligatoire'),
                gender: Yup.string().required('Champ obligatoire'),
                // phone: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect"),
                mobile: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect"),
                email: Yup.string().email('Email incorrect')
            })
        }),
    }


    const makeRequest = (formData) => {
        dispatch(addMission({ values: formData, action: action }))
        handleCloseModal()
    }

    const handleNextStep = (newData, final = false) => {

        setData((prev) => ({ ...prev, ...newData }))

        if (final) {
            makeRequest(newData)
            return
        }

        setCurrentStep((prev) => prev + 1)
    }

    const handlePrevStep = (newData) => {
        setData((prev) => ({ ...prev, ...newData }))
        setCurrentStep((prev) => prev - 1)
    }

    const StepBar = () => {
        return (
            <div className="flex justify-between items-center sticky top-0 py-3 gap-5 bg-white">
                <div className="grow bg-slate-200 h-[1px]"></div>
                <div className="flex items-center space-x-3">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center border border-slate-200 ${currentStep === 0 && 'text-white border-action bg-action'}`}>1</div>
                    <div>Dates / Synthèse</div>
                </div>
                <div className="grow bg-slate-200 h-[1px]"></div>
                <div className="flex items-center space-x-3">
                    <div className={`rounded-full h-10 w-10 flex items-center justify-center border border-slate-200 ${currentStep === 1 && 'text-white border-action bg-action'}`}>2</div>
                    <div>Patient</div>
                </div>
                <div className="grow bg-slate-200 h-[1px]"></div>
            </div>
        )
    }

    const StepOne = (props) => {

        const handleSubmit = (values) => {
            props.next(values)
        }

        return (
            <Formik
                validationSchema={validationSchemaStep1}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {(values) => (
                    <Form className='form-body'>
                        <div className="form-content" style={{ paddingTop: 0 }}>
                            <StepBar />
                            <div className='grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2'>
                                <FormDatePicker name="beginAt" label="Début de la mission" />
                                <FormDatePicker name="endAt" label="Fin de la mission" />

                                <div className="col-span-2 bg-gray-100 my-2 rounded p-3 test-sm">
                                    Durée de la mission : {dayjs(values.values.endAt).diff(values.values.beginAt, 'days')} jours
                                </div>
                                <div className="col-span-2">
                                    <FormTextarea
                                        rows={8}
                                        name="description"
                                        label="Synthèse de la mission"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-footer">
                            <button className='button-submit' type="submit">
                                Suivant
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }

    const StepTwo = (props) => {

        const handleSubmit = (values) => {
            console.log('values', values)
            props.next(values, true)
        }

        return (
            <Formik
                validationSchema={validationSchemaStep2[action]}
                initialValues={props.data}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, values, setFieldValue, errors }) => (
                    <Form className='form-body'>
                        <div className="form-content" style={{ paddingTop: 0 }}>
                            <StepBar />
                            {action === 'addPatient' && <PatientFields name="patient" />}
                            {action === 'patientIRI' && <FormSelectPatientIRI setField={setFieldValue} value={values.patientIRI} />}

                        </div>
                        <div className="form-footer">
                            {action === 'patientIRI' &&
                                <div className='button-info' onClick={() => setAction("addPatient")}>
                                    Nouveau patient
                                </div>
                            }
                            {action === 'addPatient' &&
                                <div className='button-info' onClick={() => setAction("patientIRI")}>
                                    Chercher un patient
                                </div>
                            }
                            <div className='space-x-5'>
                                <button className='button-submit' type="button" onClick={() => props.prev(values)}>
                                    Précèdent
                                </button>
                                {_.isEmpty(errors) ?
                                    <button type="submit" className='button-submit' disabled={isSubmitting}>Valider</button>
                                    :
                                    <button type="submit" className='button-submit' disabled={true}>Valider</button>
                                }
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        )
    }

    const steps = [
        <StepOne next={handleNextStep} data={data} />,
        <StepTwo next={handleNextStep} prev={handlePrevStep} data={data} />,
    ]

    return (
        <>
            {steps[currentStep]}
        </>
    )

}

export default MissionForm