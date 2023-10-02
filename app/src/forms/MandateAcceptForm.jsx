import React, { useEffect, useState, useCallback } from 'react'
import { useGetIRI, usePutData } from '../queryHooks/useMandate';
import { usePostData } from '../queryHooks/useMission';
import { useGetPaginatedDatas } from '../queryHooks/usePatient';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import { mandateUserIRI as validationSchema } from '../utils/validationSchemas';
import Loader from '../components/Loader';
import dayjs from 'dayjs'
import MissionFields from '../fields/MissionFields';
import { useGetCurrentAccount as useAccount } from '../queryHooks/useAccount'
import { API_URL, API_USERS } from '../config/api.config'


const MandateAcceptForm = ({ iri, handleCloseModal }) => {

    const [step, setStep] = useState(1)

    const { isLoading: isLoading, data, isError, error } = useGetIRI(iri)
    const { data: user, isLoading: isLoadingUser } = useAccount()
    const { data: patient, isLoading: isLoadingPatient } = useGetPaginatedDatas(1, "id", "asc", "", { avsNumber: data ? data.content.patient.avsNumber : null })

    const { mutate: postData, isSuccess: isPostSuccess, isLoading: isPosting } = usePostData()
    const { mutate: putData, isSuccess: isPutSuccess, isLoading: isPutting } = usePutData()

    useEffect(() => {
        if (patient && !isLoading) {
            if (patient['hydra:member'].length != 0)
                reset({ patient: patient['hydra:member'][0], beginAt: data.content.service.beginAt, mandate: data['@id'] })
            else reset({ patient: { ...data.content.patient, user: API_URL + API_USERS + "/" + user.id }, beginAt: data.content.service.beginAt, mandate: data['@id'] })
        }
    }, [isLoadingPatient, patient, isLoadingUser, user])


    const onSubmit = () => {
        putData({ id: data.id, status: "accepté", acceptedAt: dayjs().format(), rejectedAt: null })
    }

    useEffect(() => {
        if (isPutSuccess)
            postData(getValues())
    }, [isPutSuccess])


    const { register, handleSubmit, reset, getValues, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {},
        //resolver: yupResolver(validationSchema)
    })

    if (isLoading || isLoadingPatient || isLoadingUser) return <Loader />
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}
                submitLabel="Accepter ce mandat"
                isLoading={isSubmitting || isPosting || isPutting}
                isDisabled={isSubmitting || isPosting || isPutting}
                className="p-5"
            >
                <p>
                    <span className='font-bold'>Patient :</span> {data.content.patient.lastname} {data.content.patient.firstname}
                </p>
                <p>
                    <span className='font-bold'>Date de prise en charge :</span> {dayjs(data.content.service.beginAt).format('dddd LL')}
                </p>
                <p>
                    <span className='font-bold'> Detail du mandat :</span> {data.content.service.description}
                </p>
                <MissionFields errors={errors} register={register} />
            </Form>
        </>
    )
}

export default MandateAcceptForm