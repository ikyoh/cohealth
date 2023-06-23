import React, { useState, useEffect } from 'react'
import { useGetIRI, usePostData, usePutData } from '../queryHooks/usePrescription'
import { useGetIRI as useMission } from '../queryHooks/useMission'
import { useGetAllDatas as useDoctors } from '../queryHooks/useDoctor'
import { useGetCurrentAccount as useAccount } from '../queryHooks/useAccount'
import { FormProvider, useForm } from "react-hook-form"
import Form from "../components/form/form/Form"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { opas } from '../utils/arrays'
import OpasFields from '../fields/OpasFields'
import { useSearch } from '../hooks/useSearch'

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
import OpasServicesFields from '../fields/OpasServicesFields'
import { calcABCN, calcMinutestoHours } from '../utils/functions'

const OpasForm = ({ iri, missionIRI, handleCloseModal, action = "infos" }) => {

    const [modalAction, setModalAction] = useState(action)
    const { isLoading, data, isError, error } = useGetIRI(iri)
    const { isLoading: isLoadingMission, data: mission } = useMission(missionIRI)
    const { isLoading: isLoadingDoctors, data: doctors } = useDoctors('', 'fullname', 'asc', action === 'doctorIRI' ? true : false)
    const { data: user } = useAccount()
    const { mutate: postData, isLoading: isPosting, isSuccess } = usePostData()
    const { mutate: putData } = usePutData()

    const [currentStep, setCurrentStep] = useState(1)
    const steps = 2

    const handleNextStep = async () => {
        const isStepValid = await trigger();
        if (isStepValid) {
            setCurrentStep(cur => cur + 1)
            setModalAction("services")
        }
    }


    const handlePrevStep = () => {
        setCurrentStep(cur => cur - 1)
        setModalAction("infos")
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
        defaultValues: { ...opas, mission: missionIRI },
        //resolver: yupResolver(validationSchema[modalAction]),
        mode: "onChange",
    });

    const { register, handleSubmit, reset, watch, setValue, trigger, formState: { errors, isSubmitting } } = methods

    const values = watch()

    const totalA = calcABCN("A", values.content.services, mission.beginAt, mission.endAt)
    const totalAHours = calcMinutestoHours(totalA)
    const totalB = calcABCN("B", values.content.services, mission.beginAt, mission.endAt)
    const totalBHours = calcMinutestoHours(totalB)
    const totalC = calcABCN("C", values.content.services, mission.beginAt, mission.endAt)
    const totalCHours = calcMinutestoHours(totalC)



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
            putData(form)
        }
        handleCloseModal()
    }

    return (
        <>
            <FormProvider {...methods}>
                <Form onSubmit={handleSubmit(onSubmit)}
                    steps={steps || null}
                    handleNextStep={handleNextStep}
                    handlePrevStep={handlePrevStep}
                    currentStep={currentStep}
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                    errors={errors}
                    className=""
                >
                    {steps &&
                        <div>
                            <ul className="steps w-full border-b">
                                <li
                                    data-content={`${currentStep === 1 ? "●" : ""}`}
                                    className="step step-primary w-full">
                                    Informations
                                </li>
                                <li
                                    data-content={`${currentStep === 2 ? "●" : ""}`}
                                    className={`step w-full ${currentStep === 2 && "step-primary"}`}>
                                    Prescriptions
                                </li>
                            </ul>
                        </div>
                    }

                    {modalAction === 'infos' &&
                        <OpasFields errors={errors} register={register} />
                    }
                    {modalAction === 'services' &&
                        <OpasServicesFields
                            errors={errors}
                            register={register}
                            totalAHours={totalAHours}
                            totalBHours={totalBHours}
                            totalCHours={totalCHours}
                            beginAt={mission.beginAt}
                            endAt={mission.endAt}
                        />
                    }
                </Form>
            </FormProvider>
        </>
    )
}

export default OpasForm