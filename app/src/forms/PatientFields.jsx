import React from 'react'
import FormInput from '../components/forms/FormInput'
import FormSelect from '../components/forms/FormSelect'
import FormTextarea from '../components/forms/FormTextarea'
import FormDatePicker from '../components/forms/FormDatePicker'
import { cantons } from '../utils/arrays';


const PatientFields = ({ name = false, className = false }) => {

    return (
        <div className={`grid gap-x-10 gap-y-5 grid-cols-1 md:grid-cols-2 ${className && className}`}>
            <FormInput name={name ? name + ".lastname" : "lastname"} label="Nom" required={true} />
            <FormInput name={name ? name + ".firstname" : "firstname"} label="Prénom" required={true} />
            <FormSelect name={name ? name + ".gender" : "gender"} label="Sexe" required={true}>
                <option value="">Choisir</option>
                <option value="homme">Homme</option>
                <option value="femme">Femme</option>
            </FormSelect>
            <FormDatePicker name={name ? name + ".birthdate" : "birthdate"} label="Date de naissance" />
            <FormInput name={name ? name + ".phone" : "phone"} label="Téléphone fixe" />
            <FormInput name={name ? name + ".mobile" : "mobile"} label="Téléphone portable" />
            <FormInput name={name ? name + ".email" : "email"} label="Email" />
            <FormInput name={name ? name + ".address1" : "address1"} label="Adresse" />
            <FormInput name={name ? name + ".address2" : "address2"} label="Complément d'adresse" />
            <FormInput name={name ? name + ".npa" : "npa"} label="NPA" />
            <FormInput name={name ? name + ".city" : "city"} label="Ville" />
            <FormSelect name={name ? name + ".canton" : "canton"} label="Canton" placeholder="" required={true}>
                <option value="">Choisir un canton</option>
                {Object.entries(cantons).map(([key, value]) => <option key={key} value={key}>{value}</option>)}
            </FormSelect>
            <FormInput name={name ? name + ".avsNumber" : "avsNumber"} label="Numéro AVS" />
            <FormInput name={name ? name + ".assuranceNumber" : "assuranceNumber"} label="Numéro d'assuré" />
            <div className="md:col-span-2">
                <FormTextarea name={name ? name + ".furtherInfos" : "furtherInfos"} label="Informations supplémentaires" />
            </div>
        </div>
    )
}

export default PatientFields