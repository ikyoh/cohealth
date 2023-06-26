import React, { useState, useEffect } from 'react'
import { useGetIRI, usePostData, usePutData } from '../queryHooks/useMission'
import { useGetCurrentAccount as useAccount } from '../queryHooks/useAccount'
import { FormProvider, useForm } from "react-hook-form"
import Form from "../components/form/form/Form"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { mission } from '../utils/arrays'
import { FormSelectPatientIRI } from '../components/form/selectPatientIRI/FormSelectPatientIRI'
import { FormSelectDoctorIRI } from '../components/form/selectDoctorIRI/FormSelectDoctorIRI'
import { FormSelectAssuranceIRI } from '../components/form/selectAssuranceIRI/FormSelectAssuranceIRI'
import MissionFields from '../fields/MissionFields'
import PatientFields from '../fields/PatientFields'
import AssuranceFields from '../fields/AssuranceFields'
import DoctorFields from '../fields/DoctorFields'
import { useSearch } from '../hooks/useSearch'
import AddButton from '../components/buttons/AddButton'
import {
    mission as missionSchema,
    patient as patientSchema,
    assurance as assuranceSchema,
    doctor as doctorSchema,
    patientIRI as patientIRISchema,
    doctorIRI as doctorIRISchema,
    assuranceIRI as assuranceIRISchema,
} from '../utils/validationSchemas'
import Loader from '../components/Loader'
import { API_URL, API_USERS } from '../config/api.config'

const MissionForm = ({ iri, handleCloseModal, action = "patientIRI" }) => {

    const [modalAction, setModalAction] = useState(action)
    const { isLoading, data, isError, error } = useGetIRI(iri)
    const { data: user } = useAccount()
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData()
    const { mutate: putData } = usePutData(iri)

    const { searchValue, searchbar } = useSearch("")

    const [currentStep, setCurrentStep] = useState(iri ? null : 1)
    const steps = iri ? null : 2

    const handleNextStep = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setCurrentStep(cur => cur + 1)
            setModalAction("mission")
        }
    }


    const handlePrevStep = () => {
        setCurrentStep(cur => cur - 1)
        setModalAction("patientIRI")
    }

    const validationSchema = {
        mission: missionSchema,
        patient: Yup.object({ patient: patientSchema }),
        doctor: Yup.object({ doctor: doctorSchema }),
        assurance: Yup.object({ assurance: assuranceSchema }),
        patientIRI: patientIRISchema,
        doctorIRI: doctorIRISchema,
        assuranceIRI: assuranceIRISchema,
    }

    const methods = useForm({
        shouldUnregister: false,
        defaultValues: mission,
        resolver: yupResolver(validationSchema[modalAction]),
        mode: "onChange",
    });

    const { register, handleSubmit, reset, watch, setValue, trigger, formState: { errors, isSubmitting } } = methods;


    console.log('watch', watch())

    // Case update
    useEffect(() => {
        if (iri && data) {
            reset(data)
        }
    }, [isLoading, data])

    useEffect(() => {
        if (modalAction === "patient" && user) setValue("patient.user", API_URL + API_USERS + "/" + user.id)
    }, [modalAction])


    const onSubmit = form => {
        if (!iri)
        postData(form)
        else {
            const datas = {...form}
            delete datas.documents
            putData(datas)
        }
        console.log('form', form)
        handleCloseModal()
    }

    return (
        <>

            {steps &&
                <ul className="steps w-full">
                    <li data-content="●" className="step step-primary w-full">Patient</li>
                    <li data-content="●" className={`step w-full ${currentStep === 2 ? "step-primary" : "step-neutral"}`}>Dates - Synthèse</li>
                </ul>
            }

            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(onSubmit)}
                    steps={steps || null}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                    currentStep={currentStep}
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                    errors={errors}
                >
                    {modalAction === 'mission' &&
                        <>
                            <MissionFields errors={errors} register={register} />
                        </>
                    }
                    {modalAction === 'patientIRI' &&
                        <>
                            <div className='flex justify-between'>
                                {searchbar}
                                <AddButton onClick={() => setModalAction('patient')} />
                            </div>
                            <FormSelectPatientIRI watch={watch} setValue={setValue} searchValue={searchValue} />
                        </>
                    }
                    {modalAction === 'patient' &&
                        <>
                            <PatientFields errors={errors} register={register} name="patient" />
                        </>
                    }
                    {modalAction === 'doctorIRI' &&
                        <>
                            <div className='flex justify-between'>
                                {searchbar}
                                <AddButton onClick={() => setModalAction('doctor')} />
                            </div>
                            <FormSelectDoctorIRI watch={watch} setValue={setValue} searchValue={searchValue} />
                        </>
                    }
                    {modalAction === 'doctor' &&
                        <DoctorFields errors={errors} register={register} name="doctor" />
                    }
                    {modalAction === 'assuranceIRI' &&
                        <>
                            <div className='flex justify-between'>
                                {searchbar}
                                <AddButton onClick={() => setModalAction('assurance')} />
                            </div>
                            <FormSelectAssuranceIRI watch={watch} setValue={setValue} searchValue={searchValue} />
                        </>
                    }
                    {modalAction === 'assurance' &&
                        <AssuranceFields errors={errors} register={register} name="assurance" />
                    }
                </Form>
            </FormProvider>
        </>
    )
}

export default MissionForm