import React, { useEffect } from 'react';
import { useGetIRI, usePutData } from '../queryHooks/useMandate';
import { useGetAllDatas as useUsers } from '../queryHooks/useUser';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { yupResolver } from '@hookform/resolvers/yup';
import { mandateUserIRI as validationSchema } from '../utils/validationSchemas';
import uuid from 'react-uuid';
import { mandateCategoriesUsersRoles } from '../utils/arrays';
import Loader from '../components/Loader';


const MandateAgentForm = ({ iri, handleCloseModal }) => {

    const { isLoading: isLoadingData, data } = useGetIRI(iri)
    const { mutate: putData } = usePutData()

    const { isLoading: isLoadingUsers, data: users } = useUsers()

    const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
        defaultValues: {},
        resolver: yupResolver(validationSchema)
    })

    useEffect(() => {
        if (data && !isLoadingData) {
            reset({ id: data.id, mandateUser: data.mandateUSer })
        }
    }, [isLoadingData, data])

    const onSubmit = form => {
        putData({ ...form, status: "attribué" })
        handleCloseModal()
    }


    if(isLoadingData || isLoadingUsers) return <Loader />

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                className="p-5 grid grid-cols-2"
            >


                {users?.filter(user => user.roles.includes(mandateCategoriesUsersRoles[data.category]))
                    .map(user =>
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

                    )

                }


            </Form>
        </>
    )

}

export default MandateAgentForm