import React, { useEffect } from 'react';
import { useGetIRI, usePutData } from '../queryHooks/useMandate';
import { usePostData } from '../queryHooks/useMission';
import { useGetDatasByAvsNumber } from '../queryHooks/usePatient';
import { useGetPaginatedDatas as useGetDoctors } from '../queryHooks/useDoctor';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import { mission as validationSchema } from '../utils/validationSchemas';
import Loader from '../components/Loader';
import dayjs from 'dayjs';
import MissionFields from '../fields/MissionFields';
import { useGetCurrentAccount as useAccount } from '../queryHooks/useAccount';
import { API_URL, API_USERS } from '../config/api.config';


const MandateAcceptForm = ({ iri }) => {

    const { isLoading, data } = useGetIRI(iri)
    const { data: user, isLoading: isLoadingUser } = useAccount()
    const { data: patient, isLoading: isLoadingPatient } = useGetDatasByAvsNumber(data ? data.content.patient.avsNumber : null)
    const { data: doctor, isLoading: isLoadingDoctor } = useGetDoctors(1, "", "", "", { rcc: data ? data.user.rcc : null }, data ? data.user.rcc : false)

    const { mutate: postData, isLoading: isPosting } = usePostData()
    const { mutate: putData, isSuccess: isPutSuccess, isLoading: isPutting } = usePutData()


    useEffect(() => {
        if (patient && doctor && !isLoading) {
            if (patient['hydra:member'].length !== 0)
                reset({
                    patient: patient['hydra:member'][0],
                    beginAt: data.content.service.beginAt,
                    mandate: data['@id'],
                    doctor: doctor['hydra:member'][0],
                })
            else reset({
                patient: { ...data.content.patient, user: API_URL + API_USERS + "/" + user.id },
                beginAt: data.content.service.beginAt,
                mandate: data['@id'],
                doctor: doctor['hydra:member'][0],
            })
        }
    }, [isLoadingPatient, isLoadingDoctor, isLoadingUser])

    const onSubmit = () => {
        putData({ id: data.id, status: "accepté", acceptedAt: dayjs().format(), rejectedAt: null })
    }

    useEffect(() => {
        if (isPutSuccess)
            postData(getValues())
    }, [isPutSuccess])


    const { register, handleSubmit, reset, getValues, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {},
        resolver: yupResolver(validationSchema)
    })

    if (isLoading || isLoadingPatient || isLoadingUser) return <Loader />
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}
                submitLabel="Accepter ce mandat"
                isLoading={isSubmitting || isPosting || isPutting}
                isDisabled={isLoading || isLoadingUser || isLoadingDoctor ||isSubmitting || isPosting || isPutting}
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