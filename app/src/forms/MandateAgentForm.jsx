import React, { useEffect } from 'react'
import { useGetIRI, usePutData } from '../queryHooks/useMandate';
import { useGetAllDatas as useUsers } from '../queryHooks/useUser';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import { mandateUserIRI as validationSchema } from '../utils/validationSchemas';
import uuid from 'react-uuid';

const MandateAgentForm = ({ iri, handleCloseModal }) => {

    const { isLoading: isLoadingData, data, isError, error } = useGetIRI(iri)
    const { mutate: putData } = usePutData()

    const { isLoading: isLoadingUsers, data: users } = useUsers()

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {},
        resolver: yupResolver(validationSchema)
    })

    console.log('data', data)

    useEffect(() => {
        if (data && !isLoadingData) {
            console.log('reset')
            reset({ id: data.id, mandateUser: data.mandateUSer })
        }
    }, [isLoadingData, data])

    const onSubmit = form => {
        console.log('form', form)
        putData(form)
        handleCloseModal()
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                className="p-5 grid grid-cols-2"
            >

                {users?.map(user =>
                    <div key={uuid()} className="form-control">
                        <input
                            type="radio"
                            name="option"
                            id={user['@id']}
                            value={user['@id']}
                            className="peer hidden"
                            {...register("mandateUser")}
                        />
                        <label htmlFor={user['@id']} className="btn no-animation btn-block peer-checked:bg-secondary peer-checked:border-secondary justify-start">
                            {user.firstname} {user.lastname}
                        </label>
                    </div>

                )}




            </Form>
        </>
    )

}

export default MandateAgentForm