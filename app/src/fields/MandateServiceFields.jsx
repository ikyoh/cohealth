import React from "react";
import { FormInput } from "../components/form/input/FormInput";
import { FormSelect } from "../components/form/select/FormSelect";
import { FormTextarea } from "../components/form/textarea/FormTextarea";
import { mandateCategoriesUsersRoles } from "../utils/arrays";

const MandateFields = ({
    name = false,
    errors,
    register,
    index = false,
    edit = false,
}) => {
    const _name =
        name && typeof index !== "number"
            ? name
            : name && typeof index === "number"
            ? `${name}.${index}`
            : false;

    const _errors =
        name &&
        typeof index !== "number" &&
        Object.keys(errors).length !== 0 &&
        errors[name]
            ? errors[name]
            : name &&
              typeof index === "number" &&
              Object.keys(errors).length !== 0 &&
              errors[name][index]
            ? errors[name][index]
            : errors;

    return (
        <>
            <p className="text-xl font-semibold">Mandat</p>
            <FormSelect
                type="text"
                name={name ? `${_name}.category` : "category"}
                label="Prestation"
                error={_errors["category"] && _errors["category"]}
                register={register}
                required={true}
                disabled={edit}
            >
                <option value="">Choisir une catégorie</option>
                {Object.entries(mandateCategoriesUsersRoles).map(
                    ([key, value]) => (
                        <option key={value} value={key}>
                            {value}
                        </option>
                    )
                )}
            </FormSelect>

            <FormInput
                type="date"
                name={name ? `${_name}.beginAt` : "beginAt"}
                label="Date de prise en charge"
                error={_errors["beginAt"] && _errors["beginAt"]}
                register={register}
                required={true}
            />
            <FormTextarea
                name={name ? `${_name}.description` : "description"}
                label="Commentaire"
                error={_errors["description"] && _errors["description"]}
                register={register}
                required={false}
                rows={5}
            />
        </>
    );
};

export default MandateFields;
