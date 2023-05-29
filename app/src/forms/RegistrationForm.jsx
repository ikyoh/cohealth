import React, { useEffect } from 'react'
import { usePostData } from '../queryHooks/useAccount';
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { account, password } from '../utils/arrays';
import { registration as registationValidation, password as passwordValidation } from '../utils/validationSchemas';
import { FormSelect } from '../components/form/select/FormSelect'
import { FormCheckbox } from '../components/form/checkbox/FormCheckbox'
import AccountFields from '../fields/AccountFields';
import OrganizationFields from '../fields/OrganizationFields';
import PasswordFields from '../fields/PasswordFields';


const RegistrationForm = () => {

    const { mutate: postData, isLoading: isPosting, isSuccess, error: mutateError } = usePostData()

    const { register, handleSubmit, watch, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(Yup.object({ ...registationValidation, ...passwordValidation })),
        defaultValues: { ...account, ...password }
    })

    const watchRole = watch(['roles[0]'])

    const handleReset = (e) => {
        console.log('reset')
        reset({ ...account, ...password, roles: [e.target.value] })
    }

    const onSubmit = form => {
        postData(form)
    }

    return (

        <Form onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting || isPosting}
            isDisabled={isSubmitting || isPosting}
        >
            <FormSelect
                name="roles[0]"
                label="Je suis"
                register={register}
                required={true}
                onChange={handleReset}
            >
                <option value="ROLE_NURSE">Un infirmier indépendant</option>
                <option value="ROLE_DOCTOR">Un médecin</option>
                <option value="ROLE_ORGANIZATION_BENEFIT">Une organisation de services à domicile</option>
                <option value="ROLE_ORGANIZATION_MANDATOR">Un cabinet médical</option>
                <option value="ROLE_ORGANIZATION_MANDATOR">Un hôpital / une clinique</option>
            </FormSelect>

            {watchRole[0] === 'ROLE_NURSE' &&
                <AccountFields register={register} errors={errors} />
            }
            {watchRole[0] === 'ROLE_DOCTOR' &&
                <AccountFields register={register} errors={errors} />
            }
            {watchRole[0] === 'ROLE_ORGANIZATION_BENEFIT' &&
                <OrganizationFields register={register} errors={errors} />
            }
            {watchRole[0] === 'ROLE_ORGANIZATION_MANDATOR' &&
                <OrganizationFields register={register} errors={errors} />
            }

            <PasswordFields register={register} errors={errors} />

            <FormCheckbox
                name="isOptin"
                label="J'ai lu et j'accepte le règlement européen sur la protection des données (GDPR)"
                register={register}
                error={errors['isOptin']}
            />
            <FormCheckbox
                name="isApproved"
                label="J'ai lu et j'accepte les conditions générales de vente (CGDV)"
                register={register}
                error={errors['isApproved']}
            />
            {
                mutateError && mutateError.response && mutateError.response.data && mutateError.response.data.violations &&
                mutateError.response.data.violations.map((violation, index) =>
                    <p key={index} className="text-error">{violation.message}</p>)
            }
        </Form>


    )

}

export default RegistrationForm