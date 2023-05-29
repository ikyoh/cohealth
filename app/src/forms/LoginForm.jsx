import React from 'react'
import { useLoginAccount } from '../queryHooks/useAccount';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { FormInput } from "../components/form/input/FormInput";

const LoginForm = ({ login, password }) => {

    const { mutate: loginAccount, isLoading: isPosting, isSuccess, error } = useLoginAccount()

    const initialValues = {
        username: login ? login : '',
        password: password ? password : ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Champ obligatoire'),
        password: Yup.string().required('Champ obligatoire')
    })

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: initialValues
    })

    const onSubmit = form => {
        loginAccount(form)
    }

    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}
                isLoading={isSubmitting || isPosting}
                isDisabled={isSubmitting || isPosting}
                submitLabel="Connexion"
            >
                <FormInput
                    type="text"
                    name="username"
                    label="Identifiant"
                    error={errors['username']}
                    register={register}
                    required={true}
                />
                <FormInput
                    type="password"
                    name="password"
                    label="Mot de passe"
                    error={errors['password']}
                    register={register}
                    required={true}
                />
                {error && <div className='text-error'>Problème de connexion</div>}
            </Form>
        </>
    )
}

export default LoginForm