import React from "react"
import { Controller } from "react-hook-form";
import { FormInput } from '../components/form/input/FormInput'
import { FormMaskInput } from '../components/form/maskInput/FormMaskInput'
import InputMask from 'react-input-mask';

const AccountFields = ({ name, errors, register, registration = true, control }) => {


    return (
        <>
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
                type="text"
                name={name ? name + ".mobile" : "mobile"}
                label="Numéro de mobile"
                placeholder="Numéro de mobile"
                error={name && errors[name] ? errors[name]['mobile'] : errors['mobile']}
                register={register}
                required={true}
            />
            <FormInput
                type="text"
                name={name ? name + ".email" : "email"}
                label="Email"
                placeholder="Adresse Email"
                error={name && errors[name] ? errors[name]['email'] : errors['email']}
                register={register}
                required={true}
            />
            <FormMaskInput
                control={control}
                name={name ? name + ".rcc" : "rcc"}
                mask="a9999.99"
                label="Numéro RCC"
                error={name && errors[name] ? errors[name]['rcc'] : errors['rcc']}
                register={register}
                required={true}
            />
            {!registration &&
                <>
                    <FormInput
                        type="text"
                        name={name ? name + ".fax" : "fax"}
                        label="Fax"
                        error={name && errors[name] ? errors[name]['fax'] : errors['fax']}
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
                        name={name ? name + ".address2" : "address2"}
                        label="Complément d'adresse"
                        error={name && errors[name] ? errors[name]['address2'] : errors['address2']}
                        register={register}
                        required={false}
                    />
                    <FormInput
                        type="text"
                        name={name ? name + ".npa" : "npa"}
                        label="Code postal"
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
                </>
            }


            {/* <div>
                <label htmlFor="rcc">rcc Number</label>
                <InputMask
                    id="rcc"
                    mask="a9999.99"
                    {...register("rcc", {
                        required: "rcc number is required",
                        pattern: {
                            value: /^\(\d{3}\) \d{3}-\d{4}$/,
                            message: "Invalid rcc number",
                        },
                    })}
                />
                {errors.rcc && <span>{errors.rcc.message}</span>}
            </div> */}


            {/* <Controller
                name="rcc"
                control={control}
                render={({ field: { onChange, value } }) => (
                    <InputMask mask="a9999.99" value={value} onChange={onChange} maskChar={null}>
                        {(props) => (
                            <FormInput
                                {...props}
                                type="text"
                                label="RCC"
                                error={errors['rcc']}
                                register={register}
                                required={true}
                            />
                        )}
                    </InputMask>
                )}
            /> */}

        </>
    )
}

export default AccountFields