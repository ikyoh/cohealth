import { useState } from "react";
import uuid from "react-uuid";
import { FormInput } from "../components/form/input/FormInput";
import { FormSelect } from "../components/form/select/FormSelect";
import { FormTextarea } from "../components/form/textarea/FormTextarea";
import { mandateCategoriesUsersRoles } from "../utils/arrays";

import { useGetDatasByRoles } from "../queryHooks/useUser";

const MandateServiceFields = ({
    name = false,
    errors,
    register,
    index = false,
    edit = false,
    setValue,
    fields,
    remove,
    watch,
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


    const [category, setcategory] = useState(fields[index].category ? fields[index].category : "");

    const categories = () => {
        if (fields.length === 1) return Object.entries(mandateCategoriesUsersRoles)
        const usedCategories = fields.map((field) => field.category);
        return Object.entries(mandateCategoriesUsersRoles).filter((category) => !usedCategories.includes(category[0]));
    }

    const handleChangeUser = (e) => {
        const value = e.target.value;
        const text = e.target.options[e.target.selectedIndex].text;
        if (value === "") {
            setValue(`${_name}.mandateUser`, null);
            setValue(`${_name}.status`, "DEFAULT-édité");
            setValue(`${_name}.mandateUserName`, text);
        }
        if (value !== "") {
            setValue(`${_name}.mandateUser`, value);
            setValue(`${_name}.status`, "DEFAULT-attribué");
            setValue(`${_name}.mandateUserName`, text);
        }
    }

    const handleChangeCategory = (e) => {
        setcategory(e.target.value);
        setValue(`${_name}.mandateUser`, null);
        setValue(`${_name}.mandateSelectUser`, "");
        setValue(`${_name}.mandateUserName`, "");
        setValue(`${_name}.status`, "DEFAULT-édité");
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <p className="text-xl font-semibold">{edit ? mandateCategoriesUsersRoles[fields[0].category] : "Mandat" + index + 1}</p>
                {fields.length > 1 &&
                    <button
                        type="button"
                        className="btn btn-sm btn-action"
                        onClick={() => remove(index)}
                    >
                        Supprimer
                    </button>
                }
            </div>
            <FormSelect
                type="text"
                name={name ? `${_name}.category` : "category"}
                label="Prestation"
                error={_errors["category"] && _errors["category"]}
                register={register}
                required={true}
                disabled={edit || (fields.length - 1) > index}
                onChange={handleChangeCategory}
            >
                {(fields.length - 1) > index ?
                    <option value={fields[index].category}>
                        {mandateCategoriesUsersRoles[fields[index].category]}
                    </option>
                    : <>
                        <option value="">Choisir une catégorie</option>
                        {categories().map(
                            ([key, value]) => (
                                <option key={value} value={key}>
                                    {value}
                                </option>
                            )
                        )}
                    </>
                }
            </FormSelect>

            <FormSelect
                type="text"
                name={name ? `${_name}.mandateSelectUser` : "mandateSelectUser"}
                label="Choix du mandataire"
                error={_errors["mandateUser"] && _errors["mandateUser"]}
                register={register}
                required={true}
                disabled={edit}
                onChange={handleChangeUser}
            >
                {fields[index].mandateUserName && category === fields[index].category &&
                    <option value={fields[index].mandateUser}>{fields[index].mandateUserName}</option>
                }
                <option value="">Coordinateur Cohealth</option>

                <UserSelect fields={fields} index={index} category={category} />

            </FormSelect >


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
                label="Motif du mandat"
                error={_errors["description"] && _errors["description"]}
                register={register}
                required={false}
                rows={5}
            />
        </>
    );
};

export default MandateServiceFields;

const UserSelect = ({ fields, index, category }) => {


    const { data: users, isLoading: isLoadingUsers } = useGetDatasByRoles(category);

    return (
        !isLoadingUsers &&
        users["hydra:member"]
            .filter((user) => user["@id"] !== fields[index]?.mandateUser)
            .map(
                (value) => (
                    <option key={uuid()} value={value["@id"]}>
                        {value.firstname} {value.lastname}
                    </option>
                )
            )



    )

}