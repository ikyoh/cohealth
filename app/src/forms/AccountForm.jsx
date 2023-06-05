import React, { useEffect } from 'react'
import { useGetCurrentAccount, usePutData } from '../queryHooks/useAccount';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import AccountFields from '../fields/AccountFields';
import { user } from '../utils/arrays';
import { user as validationSchema } from '../utils/validationSchemas';

const AccountForm = ({ iri, handleCloseModal }) => {

    const { isLoading: isLoadingData, data, isError, error } = useGetCurrentAccount()
    const { mutate: putData } = usePutData()

    const { register, handleSubmit, setValue, reset, control, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: user
    })

    // Case update
    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [isLoadingData, data])

    const onSubmit = form => {
        const data = {...form}
        delete data.avatar
        delete data.signature
        delete data.password
        delete data.partners
        putData(data)
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
        >
            <AccountFields register={register} errors={errors} registration={false} />
        </Form>
    )
}
export default AccountForm

