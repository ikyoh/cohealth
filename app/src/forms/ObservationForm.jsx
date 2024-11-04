import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Form from "../components/form/form/Form";
import { FormInput } from "../components/form/input/FormInput";
import { FormTextarea } from "../components/form/textarea/FormTextarea";
import { API_USERS, IRI } from "../config/api.config";
import { usePostData } from "../queryHooks/useObservation";
import { firstLetterUppercase } from "../utils/functions";


const ObservationForm = ({ missionIRI, iri, handleCloseModal }) => {

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(["account"]);
    const { mutate: postData, isSuccess, isLoading } = usePostData();
    //const { mutate: putData } = usePutData();

    //     const validationSchema = {
    //         mission: missionSchema,
    //         patient: Yup.object({ patient: patientSchema }),
    //         doctor: Yup.object({ doctor: doctorSchema }),
    //         assurance: Yup.object({ assurance: assuranceSchema }),
    //         patientIRI: patientIRISchema,
    //         doctorIRI: doctorIRISchema,
    //         assuranceIRI: assuranceIRISchema,
    //     };

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        // resolver: yupResolver(validationSchema),
        defaultValues: {
            user: IRI + API_USERS + "/" + user.id,
            mission: missionIRI,
            createdAt: dayjs().format("YYYY-MM-DDTHH:mm"),
            category: "observation",
        },
    });

    // Case update
    // useEffect(() => {
    //     if (iri && data) {
    //         reset(data);
    //     }
    // }, [isLoading, data]);

    const onSubmit = (form) => {
        //console.log("form", form);
        postData(form);
        // else {
        //     const datas = { ...form };
        //     delete datas.user;
        //     delete datas.documents;
        //     delete datas.mandate;
        //     delete datas.patient;
        //     putData(datas);
        // }
        // handleCloseModal();
    };


    useEffect(() => {
        if (isSuccess) {
            handleCloseModal();
        }
    }, [isSuccess, handleCloseModal])


    const watchedCategory = watch("category");

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            isLoading={isSubmitting || isLoading}
            isDisabled={isSubmitting || isLoading}
            errors={errors}
        >
            <div className="grid grid-cols-4 gap-3">
                <button
                    type="button"
                    className={`btn ${watchedCategory === "observation"
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
                    className={`btn ${watchedCategory === "poids"
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
                    className={`btn ${watchedCategory === "tension"
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
                    className={`btn ${watchedCategory === "température"
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
            <FormInput
                type="datetime-local"
                name="createdAt"
                label="Date"
                error={errors["createdAt"] && errors["createdAt"]}
                register={register}
                required={true}
            />
        </Form>
    );
};

export default ObservationForm;
