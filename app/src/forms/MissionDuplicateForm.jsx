import React, { useState, useEffect } from 'react'
import { useGetIRI, usePostData } from '../queryHooks/useMission'
import { useGetIRI as usePrescription, usePostData as usePostPrescription } from '../queryHooks/usePrescription'
import { useGetCurrentAccount as useAccount } from '../queryHooks/useAccount'
import { FormProvider, useForm } from "react-hook-form"
import Form from "../components/form/form/Form"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { mission } from '../utils/arrays'
import MissionFields from '../fields/MissionFields'
import AddButton from '../components/buttons/AddButton'
import { mission as validationSchema } from '../utils/validationSchemas'
import Loader from '../components/Loader'


const MissionDuplicateForm = ({ iri, handleCloseModal }) => {

    const { isLoading, data, isError, error } = useGetIRI(iri)
    const { isLoading: isLoadingPrescription, data: dataPrescription, isError: isErrorPrescription, error: errorPrescription } = useGetIRI(data && data.prescriptions && data.prescriptions[0])

    const { mutate: postData, data: responseData, isLoading: isPosting, isSuccess } = usePostData()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {}
    })

    // Case update
    useEffect(() => {

        const _data = { prescriptions: [] }

        if (data) {

            _data.doctor = data.doctor
            _data.assurance = data.assurance
            _data.patient = data.patient
            _data.status = "en cours"

        }

        if (dataPrescription) {

            _data.prescriptions.push({
                user: dataPrescription.user,
                content: dataPrescription.content,
                status: "brouillon",
                type: "opas"
            })

        }

        reset(_data)

    }, [isLoading, data, dataPrescription])


    const onSubmit = form => {
        console.log('form', form)
        postData(form)
        //handleCloseModal()
    }


    if (isLoading) return <Loader />
    return (

        <Form onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            errors={errors}
        >
            <MissionFields register={register} errors={errors} />
        </Form>

    )
}

export default MissionDuplicateForm