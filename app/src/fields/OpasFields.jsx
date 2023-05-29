import React from 'react'
import { FormInput } from '../components/form/input/FormInput'
import { FormRadio } from '../components/form/radio/FormRadio'
import { FormTextarea } from '../components/form/textarea/FormTextarea'

const OpasFields = ({ errors, register }) => {

  return (
    <>
      <FormRadio
        name="content.type"
        label="Prescription médicale"
        error={errors['type']}
        register={register}
        required={true}
        radioDatas={[
          { label: "Prescription initiale", value: "Prescription initiale" },
          { label: "Reévaluation", value: "Reévaluation" },
          { label: "Complément d'OPAS", value: "Complément d'OPAS" },
        ]}
      />
      <FormRadio
        name="content.case"
        label="Cas"
        error={errors['case']}
        register={register}
        required={true}
        radioDatas={[
          { label: "Maladie", value: "maladie" },
          { label: "Accident", value: "accident" },
          { label: "Invalidité", value: "invalidité" },
        ]}
      />
      <FormRadio
        name="content.disability"
        label="Allocation pour impotent"
        error={errors['disability']}
        register={register}
        required={true}
        radioDatas={[
          { label: "Oui", value: "oui" },
          { label: "Non", value: "non" },
        ]}
      />

      <FormTextarea
        name="content.diagnosticNurse"
        label="Diagnostic infirmier"
        error={errors['diagnosticNurse']}
        register={register}
        required={false}
        rows={5}
      />
      <FormTextarea
        name="content.diagnosticDoctor"
        label="Diagnostic médecin"
        error={errors['diagnosticDoctor']}
        register={register}
        required={false}
        rows={5}
      />
    </>
  )
}

export default OpasFields