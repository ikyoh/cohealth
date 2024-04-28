import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { FormInput } from "../components/form/input/FormInput";
import { FormTextarea } from "../components/form/textarea/FormTextarea";
import { API_USERS, IRI } from "../config/api.config";
import { usePostData } from "../queryHooks/useObservation";
import { firstLetterUppercase } from "../utils/functions";

const ObservationForm = ({ missionIRI, iri, handleCloseModal }) => {
    //     const { isLoading, data } = useGetIRI(iri ? iri : null);
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["account"]);
    const { mutate: postData } = usePostData();
    //     const { mutate: putData } = usePutData();

    //     const validationSchema = {
    //         mission: missionSchema,
    //         patient: Yup.object({ patient: patientSchema }),
    //         doctor: Yup.object({ doctor: doctorSchema }),
    //         assurance: Yup.object({ assurance: assuranceSchema }),
    //         patientIRI: patientIRISchema,
    //         doctorIRI: doctorIRISchema,
    //         assuranceIRI: assuranceIRISchema,
    //     };

    console.log("user", user);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        // resolver: yupResolver(validationSchema),
        defaultValues: {
            user: IRI + API_USERS + "/" + user.id,
            mission: missionIRI,
            createdAt: new Date(),
            category: "observation",
        },
    });

    //     // Case update
    //     useEffect(() => {
    //         if (iri && data) {
    //             reset(data);
    //         }
    //     }, [isLoading, data]);

    const onSubmit = (form) => {
        console.log("form", form);
        if (!iri) postData(form);
        // else {
        //     const datas = { ...form };
        //     delete datas.user;
        //     delete datas.documents;
        //     delete datas.mandate;
        //     delete datas.patient;
        //     putData(datas);
        // }
        handleCloseModal();
    };

    console.log("errors", errors);
    const watchedCategory = watch("category");

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            errors={errors}
        >
            <div className="grid grid-cols-4 gap-3">
                <button
                    type="button"
                    className={`btn ${
                        watchedCategory === "observation"
                            ? "btn-primary"
                            : "btn-base-300"
                    }`}
                    onClick={() => {
                        setValue("category", "observation");
                    }}
                >
                    Observation
                </button>
                <button
                    type="button"
                    className={`btn ${
                        watchedCategory === "poids"
                            ? "btn-primary"
                            : "btn-base-300"
                    }`}
                    onClick={() => {
                        setValue("category", "poids");
                    }}
                >
                    Poids
                </button>
                <button
                    type="button"
                    className={`btn ${
                        watchedCategory === "tension"
                            ? "btn-primary"
                            : "btn-base-300"
                    }`}
                    onClick={() => {
                        setValue("category", "tension");
                    }}
                >
                    Tension
                </button>
                <button
                    type="button"
                    className={`btn ${
                        watchedCategory === "température"
                            ? "btn-primary"
                            : "btn-base-300"
                    }`}
                    onClick={() => {
                        setValue("category", "température");
                    }}
                >
                    Température
                </button>
            </div>
            {watchedCategory === "observation" && (
                <FormTextarea
                    name="content"
                    label="Observation"
                    error={errors["content"] && errors["content"]}
                    register={register}
                    required={true}
                    rows={5}
                />
            )}
            {watchedCategory !== "observation" && (
                <FormInput
                    type="number"
                    step={"0.01"}
                    name="content"
                    label={firstLetterUppercase(watchedCategory)}
                    error={errors["content"] && errors["content"]}
                    register={register}
                    required={true}
                />
            )}
        </Form>
    );
};

export default ObservationForm;
