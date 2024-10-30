import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { FormCheckbox } from "../components/form/checkbox/FormCheckbox";
import Form from "../components/form/form/Form";
import { FormSelect } from "../components/form/select/FormSelect";
import AccountFields from "../fields/AccountFields";
import OrganizationFields from "../fields/OrganizationFields";
import PasswordFields from "../fields/PasswordFields";
import { usePostData } from "../queryHooks/useAccount";
import { usePostData as usePostDoctor } from "../queryHooks/useDoctor";
import { account, doctorCategories, password } from "../utils/arrays";
import {
    password as passwordValidation,
    registration as registrationValidation,
} from "../utils/validationSchemas";

const RegistrationForm = () => {
    const {
        mutate: postData,
        isLoading: isPosting,
        error: mutateError,
    } = usePostData();
    const { mutate: postDoctor } = usePostDoctor();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(
            Yup.object({ ...registrationValidation, ...passwordValidation })
        ),
        defaultValues: { ...account, ...password },
    });

    const watchRole = watch(["roles[0]"]);

    console.log("errors", errors);

    const handleReset = (e) => {
        reset({ ...account, ...password, roles: [e.target.value] });
    };

    const onSubmit = (form) => {
        if (form.roles[0] === "ROLE_DOCTOR")
            postDoctor({
                ...form,
                fullname: form.lastname + " " + form.firstname,
                category: form.category,
            });
        postData(form);
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
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
                <option value="ROLE_PHARMACY">Une pharmacie</option>
                <option value="ROLE_PHYSIO">Un physiothérapeute</option>
                {/* <option value="ROLE_ORGANIZATION_BENEFIT">Une organisation de services à domicile</option>
                <option value="ROLE_ORGANIZATION_MANDATOR">Un cabinet médical</option>
                <option value="ROLE_ORGANIZATION_MANDATOR">Un hôpital / une clinique</option> */}
            </FormSelect>

            {watchRole[0] === "ROLE_NURSE" && (
                <AccountFields
                    register={register}
                    errors={errors}
                    control={control}
                />
            )}
            {watchRole[0] === "ROLE_PHYSIO" && (
                <AccountFields
                    register={register}
                    errors={errors}
                    control={control}
                />
            )}
            {watchRole[0] === "ROLE_DOCTOR" && (
                <>
                    <FormSelect
                        type="text"
                        name="category"
                        label="Catégorie"
                        errors={errors}
                        register={register}
                        required={true}
                    >
                        <option value="">Choisir une catégorie</option>
                        {doctorCategories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </FormSelect>
                    <AccountFields
                        register={register}
                        errors={errors}
                        control={control}
                    />
                </>
            )}
            {watchRole[0] === "ROLE_ORGANIZATION_BENEFIT" && (
                <OrganizationFields register={register} errors={errors} />
            )}
            {watchRole[0] === "ROLE_ORGANIZATION_MANDATOR" && (
                <OrganizationFields register={register} errors={errors} />
            )}
            {watchRole[0] === "ROLE_PHARMACY" && (
                <OrganizationFields register={register} errors={errors} />
            )}

            <PasswordFields register={register} errors={errors} />

            <FormCheckbox
                name="isOptin"
                label="J'ai lu et j'accepte le règlement européen sur la protection des données (GDPR)"
                register={register}
                error={errors["isOptin"]}
            />
            <FormCheckbox
                name="isApproved"
                label="J'ai lu et j'accepte les conditions générales de vente (CGDV)"
                register={register}
                error={errors["isApproved"]}
            />
            {mutateError &&
                mutateError.response &&
                mutateError.response.data &&
                mutateError.response.data.violations &&
                mutateError.response.data.violations.map((violation, index) => (
                    <p key={index} className="text-error">
                        {violation.message}
                    </p>
                ))}
        </Form>
    );
};

export default RegistrationForm;
