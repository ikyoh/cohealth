import React, { useEffect } from "react";

import {
    usePostData as usePostDocument,
    useDeleteID as useDeleteDocument,
} from "../queryHooks/useDocument";
import {
    useGetCurrentAccount,
    usePutData as usePutAccount,
} from "../queryHooks/useAccount";
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { FormFile } from "../components/form/file/FormFile";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const AccountMediaForm = ({ id, type, handleCloseModal }) => {
    const { data: dataDocument, mutate: postDocument } = usePostDocument();
    const { data: currentAccount } = useGetCurrentAccount();
    const { mutate: putAccount, isSuccess } = usePutAccount();
    const { mutate: deleteDocument } = useDeleteDocument();

    const validationSchema = Yup.object({
        file: Yup.mixed().required("Fichier obligatoire"),
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            type: type,
            file: null,
        },
    });

    // Case update
    useEffect(() => {
        if (id) {
            reset({
                id: id,
                type: type,
                file: null,
            });
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (dataDocument && dataDocument.id) {
            const data = { ...currentAccount };
            delete data.avatar;
            delete data.signature;
            delete data.password;
            delete data.partners;
            if (type === "avatar") data.avatar = dataDocument["@id"];
            if (type === "signature") data.signature = dataDocument["@id"];
            putAccount(data);
            if (!id) handleCloseModal();
        }
        // eslint-disable-next-line
    }, [dataDocument]);

    useEffect(() => {
        if (id && isSuccess) {
            deleteDocument(id);
            handleCloseModal();
        }
        // eslint-disable-next-line
    }, [isSuccess]);

    const onSubmit = (form) => {
        postDocument(form);
    };

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            // isLoading={isPosting}
            // isDisabled={isPosting}
            className="p-5"
        >
            <FormFile
                type="text"
                name="file"
                label="Fichier"
                error={errors["file"]}
                register={register}
                required={true}
            />
        </Form>
    );
};

export default AccountMediaForm;
