import * as Yup from "yup";

const string = (error) =>
    Yup.string().required(error ? error : "Champ obligatoire");
const date = (error) =>
    Yup.date().typeError(error ? error : "Date obligatoire");
const email = (error) => Yup.string().email(error ? error : "Email incorrect");
const emailRequired = (error) =>
    Yup.string()
        .email(error ? error : "Email incorrect")
        .required("Champ obligatoire");
const bool = () =>
    Yup.boolean()
        .required("Doit être accepter.")
        .oneOf([true], "Doit être accepter.");
const phone = () => Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect");
const phoneRequired = () =>
    Yup.string()
        .matches(/^0[0-9]{9}/, "Numéro incorrect")
        .required("Champ obligatoire");
const gln = () =>
    Yup.string()
        .matches(/^\d{13}$/, "Numéro incorrect")
        .required("Champ obligatoire");
const rccDoctor = () =>
    Yup.string()
        .matches(/^[a-zA-Z]\d{6}$/, "Numéro incorrect")
        .required("Champ obligatoire");
const rcc = () =>
    Yup.string()
        .matches(/^[a-zA-Z]\d{4}\.\d{2}$/, "Numéro incorrect")
        .required("Champ obligatoire");
//const assuranceNumber = () => Yup.string().required("Champ obligatoire");
const avsNumber = () => Yup.string().matches(/^\d{13}$/, "Numéro incorrect");
//const avsNumberRequired = () =>
Yup.string()
    .matches(/^\d{13}$/, "Numéro incorrect")
    .required("Champ obligatoire");
//const npa = () => Yup.string().matches(/^\d{4}$/, "Numéro incorrect");
const npaRequired = () =>
    Yup.string()
        .matches(/^\d{4}$/, "Numéro incorrect")
        .required("Champ obligatoire");

const roleSingle = () =>
    Yup.string().when("roles", {
        is: (roles) =>
            roles.includes("ROLE_NURSE") || roles.includes("ROLE_DOCTOR"),
        then: Yup.string().required("Champ obligatoire"),
        otherwise: Yup.string().nullable(),
    });

const roleOrganization = () =>
    Yup.string().when("roles", {
        is: (roles) =>
            roles.includes("ROLE_ORGANIZATION_BENEFIT") ||
            roles.includes("ROLE_ORGANIZATION_MANDATOR"),
        then: Yup.string().required("Champ obligatoire"),
        otherwise: Yup.string().nullable(),
    });

export const account = Yup.object({
    roles: Yup.array()
        .min(1, "Champ obligatoire")
        .required("Champ obligatoire"),
    firstname: string(),
    lastname: string(),
    email: email(),
    mobile: phone(),
    isOptin: Yup.boolean()
        .required("Doit être accepter.")
        .oneOf([true], "Doit être accepter."),
    isApproved: Yup.boolean()
        .required("Doit être accepter.")
        .oneOf([true], "Doit être accepter."),
    rcc: Yup.string().when("roles", {
        is: (roles) =>
            roles.includes("ROLE_NURSE") || roles.includes("ROLE_DOCTOR"),
        then: rcc(),
        otherwise: Yup.string().nullable(),
    }),
});

export const registration = {
    roles: Yup.array()
        .min(1, "Champ obligatoire")
        .required("Champ obligatoire"),
    firstname: roleSingle(),
    lastname: roleSingle(),
    organization: roleOrganization(),
    email: Yup.string().email("Email incorrect").required("Champ obligatoire"),
    mobile: Yup.string().when("roles", {
        is: (roles) =>
            roles.includes("ROLE_NURSE") || roles.includes("ROLE_DOCTOR"),
        then: Yup.string().required("Champ obligatoire"),
        otherwise: Yup.string().nullable(),
    }),
    phone: Yup.string().when("roles", {
        is: (roles) =>
            roles.includes("ROLE_ORGANIZATION_BENEFIT") ||
            roles.includes("ROLE_ORGANIZATION_MANDATOR"),
        then: Yup.string().required("Champ obligatoire"),
        otherwise: Yup.string().nullable(),
    }),
    rcc: Yup.string().when("roles", {
        is: (roles) =>
            roles.includes("ROLE_NURSE") || roles.includes("ROLE_DOCTOR"),
        then: rcc(),
        otherwise: Yup.string().nullable(),
    }),
    // gln: Yup.string().when('roles', {
    //     is: (roles) => roles.includes("ROLE_DOCTOR") || roles.includes("ROLE_ORGANIZATION_BENEFIT") || roles.includes("ROLE_ORGANIZATION_MANDATOR"),
    //     then: Yup.string().matches(/[0-9]{13}/, "Numéro incorrect").required('Champ obligatoire'),
    //     otherwise: Yup.string().nullable(),
    // }),
    isOptin: bool(),
    isApproved: bool(),
};

export const password = {
    password: Yup.string()
        .required("Champ obligatoire")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Doit contenir 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial ! @ # % & *"
        ),
    checkpassword: Yup.string()
        .required("Champ obligatoire")
        .oneOf([Yup.ref("password")], "Le mot de passe ne correspond pas"),
};

export const service = Yup.object({
    family: string("Choix obligatoire"),
    category: string("Choix obligatoire"),
    opas: string("Choix obligatoire"),
    title: string("Choix obligatoire"),
    act: Yup.number().required(),
    time: Yup.number().required().min(0).integer(),
});

export const doctor = Yup.object({
    fullname: string("Choix obligatoire"),
    category: string("Choix obligatoire"),
    email: email(),
    rcc: rccDoctor(),
    gln: gln(),
    canton: string(),
});

export const assurance = Yup.object({
    company: string(),
    type: string(),
    email: email(),
    gln: Yup.string()
        .ensure()
        .when("type", {
            is: (type) => type !== "Internationale",
            then: gln(),
        }),
});

export const patient = Yup.object({
    firstname: string(),
    lastname: string(),
    gender: string(),
    canton: string(),
    city: string(),
    address1: string(),
    birthdate: date(),
    email: email(),
    //assuranceNumber: assuranceNumber(),
    avsNumber: avsNumber(),
    npa: npaRequired(),
    // phone: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect"),
    // mobile: Yup.string().matches(/^0[0-9]{9}/, "Numéro incorrect"),
});

export const mandatePatient = Yup.object({
    firstname: string(),
    lastname: string(),
    gender: string(),
    canton: string(),
    birthdate: string(),
    avsNumber: avsNumber(),
});

export const mandateService = Yup.object({
    beginAt: string(),
    category: string(),
});

export const mandateServices = Yup.array().of(mandateService);

export const mandate = Yup.object({
    category: string(),
    content: Yup.object({
        patient: mandatePatient,
        service: mandateService,
    }),
});

export const mandateEdit = Yup.object({
    category: string().required("Choix obligatoire"),
    description: string().required("Champ obligatoire"),
    beginAt: date().required("Champ obligatoire"),
});

export const user = Yup.object({
    firstname: string(),
    lastname: string(),
    mobile: phoneRequired(),
    email: emailRequired(),
    rcc: rcc(),
});

export const mission = Yup.object({
    beginAt: date(),
    endAt: date(),
    description: string(),
});

export const patientIRI = Yup.object({
    patient: Yup.string()
        .required("Choix obligatoire")
        .typeError("Choix obligatoire"),
});

export const doctorIRI = Yup.object({
    doctor: Yup.string()
        .required("Choix obligatoire")
        .typeError("Choix obligatoire"),
});

export const assuranceIRI = Yup.object({
    assurance: Yup.string()
        .required("Choix obligatoire")
        .typeError("Choix obligatoire"),
});

export const mandateUserIRI = Yup.object({
    mandateUser: Yup.string()
        .required("Choix obligatoire")
        .typeError("Choix obligatoire"),
});
