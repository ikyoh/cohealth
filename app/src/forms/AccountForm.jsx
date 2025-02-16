import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { useGetCurrentAccount, usePutData } from "../queryHooks/useAccount";
//import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import AccountFields from "../fields/AccountFields";
import { user } from "../utils/arrays";
import { user as validationSchema } from "../utils/validationSchemas";

const AccountForm = ({ isEdit, submitLabel }) => {
    const { isLoading: isLoadingData, data } = useGetCurrentAccount();
    const { mutate: putData } = usePutData();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: user,
    });

    // Case update
    useEffect(() => {
        if (data) {
            reset(data);
        }
        // eslint-disable-next-line
    }, [isLoadingData, data]);

    const onSubmit = (form) => {
        const data = { ...form };
        delete data.avatar;
        delete data.signature;
        delete data.password;
        delete data.partners;
        putData(data);
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            submitLabel={submitLabel}
        // isLoading={isSubmitting}
        // isDisabled={isSubmitting}
        >
            <AccountFields
                isEdit={isEdit}
                register={register}
                errors={errors}
                registration={false}
                control={control}
            />
        </Form>
    );
};
export default AccountForm;
