import React from 'react'
import { FormInput } from '../components/form/input/FormInput'
import { FormSelect } from '../components/form/select/FormSelect'
import { FormTextarea } from '../components/form/textarea/FormTextarea'
import { cantons } from '../utils/arrays';


const MandatePatientFields = ({ name, errors, register }) => {

    return (
        <>
            <FormSelect
                type="text"
                name={name ? name + ".gender" : "gender"}
                label="Sexe"
                error={name && errors[name] ? errors[name]['gender'] : errors['gender']}
                register={register}
                required={true}
            >
                <option value="">Choisir</option>
                <option value="femme">Femme</option>
                <option value="homme">Homme</option>
            </FormSelect>
            <FormInput
                type="text"
                name={name ? name + ".lastname" : "lastname"}
                label="Nom"
                placeholder="Nom"
                error={name && errors[name] ? errors[name]['lastname'] : errors['lastname']}
                register={register}
                required={true}
            />
            <FormInput
                type="text"
                name={name ? name + ".firstname" : "firstname"}
                label="Prénom"
                placeholder="Prénom"
                error={name && errors[name] ? errors[name]['firstname'] : errors['firstname']}
                register={register}
                required={true}
            />
            <FormInput
                type="date"
                name={name ? name + ".birthdate" : "birthdate"}
                label="Date de naissance"
                error={name && errors[name] ? errors[name]['birthdate'] : errors['birthdate']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".phone" : "phone"}
                label="Téléphone fixe"
                error={name && errors[name] ? errors[name]['phone'] : errors['phone']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".mobile" : "mobile"}
                label="Téléphone portable"
                error={name && errors[name] ? errors[name]['mobile'] : errors['mobile']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".address1" : "address1"}
                label="Adresse"
                error={name && errors[name] ? errors[name]['address1'] : errors['address1']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".npa" : "npa"}
                label="NPA"
                error={name && errors[name] ? errors[name]['npa'] : errors['npa']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".city" : "city"}
                label="Ville"
                error={name && errors[name] ? errors[name]['city'] : errors['city']}
                register={register}
                required={false}
            />
            <FormSelect
                type="text"
                name={name ? name + ".canton" : "canton"}
                label="Canton"
                error={name && errors[name] ? errors[name]['canton'] : errors['canton']}
                register={register}
                required={false}
            >
                <option value="">Choisir un canton</option>
                {Object.entries(cantons).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </FormSelect>

            <FormInput
                type="text"
                name={name ? name + ".avsNumber" : "avsNumber"}
                label="Numéro AVS"
                error={name && errors[name] ? errors[name]['avsNumber'] : errors['avsNumber']}
                register={register}
                required={true}
            />

            <FormInput
                type="text"
                name={name ? name + ".assuranceName" : "assuranceName"}
                label="Assurance"
                error={name && errors[name] ? errors[name]['assuranceName'] : errors['assuranceName']}
                register={register}
                required={false}
            />
            <FormInput
                type="text"
                name={name ? name + ".assuranceNumber" : "assuranceNumber"}
                label="Numéro d'assuré"
                error={name && errors[name] ? errors[name]['assuranceNumber'] : errors['assuranceNumber']}
                register={register}
                required={false}
            />
            <FormTextarea
                name={name ? name + ".furtherInfos" : "furtherInfos"}
                label="Informations complémentaires"
                error={name && errors[name] ? errors[name]['furtherInfos'] : errors['furtherInfos']}
                register={register}
                required={false}
                rows={5}
            />
        </>
    )
}

export default MandatePatientFields