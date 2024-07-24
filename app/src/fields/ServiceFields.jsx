import React from "react";
import { FormInput } from "../components/form/input/FormInput";
import { FormSelect } from "../components/form/select/FormSelect";
import { FormTextarea } from "../components/form/textarea/FormTextarea";
import { FormCheckbox } from "../components/form/checkbox/FormCheckbox";
import { legalCares, services_family } from "../utils/arrays";
import uuid from "react-uuid";

const PatientFields = ({ name, errors, register }) => {
    return (
        <>
            <FormSelect
                name={name ? name + ".family" : "family"}
                label="Famille"
                error={
                    name && errors[name]
                        ? errors[name]["family"]
                        : errors["family"]
                }
                register={register}
                required={true}
            >
                <option value="">Choisir une famille</option>
                {services_family.map((item) => (
                    <option key={uuid()} value={item}>
                        {item}
                    </option>
                ))}
            </FormSelect>
            <FormSelect
                name={name ? name + ".category" : "category"}
                label="Categorie"
                error={
                    name && errors[name]
                        ? errors[name]["category"]
                        : errors["category"]
                }
                register={register}
                required={true}
            >
                <option value="">Choisir une catégorie</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
            </FormSelect>
            <FormSelect
                name={name ? name + ".opas" : "opas"}
                label="Article 7 OPAS"
                error={
                    name && errors[name] ? errors[name]["opas"] : errors["opas"]
                }
                register={register}
                required={true}
            >
                <option value="">Choisir un article</option>
                {legalCares.map((l) => (
                    <option key={uuid()} value={l}>
                        {l}
                    </option>
                ))}
            </FormSelect>
            <FormTextarea
                name={name ? name + ".title" : "title"}
                label="Intitulé"
                error={
                    name && errors[name]
                        ? errors[name]["title"]
                        : errors["title"]
                }
                register={register}
                required={true}
                rows={2}
            />
            <FormInput
                type="number"
                name={name ? name + ".act" : "act"}
                label="Numéro d'acte"
                placeholder=""
                error={
                    name && errors[name] ? errors[name]["act"] : errors["act"]
                }
                register={register}
                required={true}
            />
            <FormInput
                type="number"
                name={name ? name + ".time" : "time"}
                label="Durée en minutes"
                error={
                    name && errors[name] ? errors[name]["time"] : errors["time"]
                }
                register={register}
                required={true}
            />
            <FormTextarea
                name={name ? name + ".description" : "description"}
                label="Description"
                error={
                    name && errors[name]
                        ? errors[name]["description"]
                        : errors["description"]
                }
                register={register}
                required={true}
                rows={10}
            />
            <FormCheckbox
                name="isActive"
                label="Cette prestation est active"
                register={register}
                error={errors["isActive"]}
            />
        </>
    );
};

export default PatientFields;
