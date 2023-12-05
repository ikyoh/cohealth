import dayjs from "dayjs"

export const account = {
    roles: ['ROLE_NURSE'],
    isOptin: false,
    isApproved: false,
}

export const password = {
    password: "",
    checkpassword: "",
}

export const user = {
    firstname: '',
    lastname: '',
    organization: '',
    phone: '',
    email: '',
    fax: '',
    mobile: '',
    npa: '',
    city: '',
    address1: '',
    address2: '',
    gln: '',
    rcc: '',
    iban: '',
    bic: '',
}

export const service = {
    family: '',
    category: '',
    opas: '',
    title: '',
    act: '',
    time: 0,
    description: '',
    isActive: true,
}

export const doctor = {
    category: 'Médecine générale',
    fullname: '',
    organization: '',
    phone: '',
    email: '',
    fax: '',
    mobile: '',
    npa: '',
    city: '',
    canton: 'Genève',
    address1: '',
    address2: '',
    gln: '',
    rcc: '',
    isActive: true,
}

export const assurance = {
    isActive: true,
    company: '',
    organization: '',
    type: '',
    address1: '',
    address2: '',
    npa: '',
    city: '',
    phone: '',
    email: '',
    www: '',
    gln: ''
}

export const patient = {
    firstname: '',
    lastname: '',
    gender: 'femme',
    status: '',
    address1: '',
    address2: '',
    npa: '',
    canton: 'Genève',
    city: '',
    phone: '',
    mobile: '',
    email: '',
    birthdate: null,
    avsNumber: '',
    assuranceNumber: '',
    furtherInfos: '',
    doctor: null,
    assurance: null
}

export const mission = {
    patient: patient,
    doctor: null,
    assurance: null,
    beginAt: dayjs().format("YYYY-MM-DD"),
    endAt: dayjs().format("YYYY-MM-DD"),
    status: 'en cours',
    coworkers: []
}

export const opas = {
    type: 'opas',
    status: 'brouillon',
    content: {
        "case": "maladie",
        "type": "Prescription initiale",
        "totalA": 0,
        "totalB": 0,
        "totalC": 0,
        "totalN": 0,
        "services": [],
        "coworkers": [],
        "disability": "non",
        "diagnosticNurse": "",
        "diagnosticDoctor": ""
    }
}

export const services_family = [
    "Evaluation - Conseil - Coordination",
    "Mesures - Diagnostics",
    "Thérapies sur prescription médicale",
    "Respiration",
    "Pansement",
    "Alimentation et diètes",
    "Elimination",
    "Hygiène - Confort",
    "Mobilisation",
    "Psychiatrie",
    "Suppléance parentale",
    "Accompagnement - Aide pratique",
    "Entretien du domicile"
]

export const assuranceCategories = [
    "LAMAL",
    "LAA",
    "LAI",
    "VVG",
    "Internationale"
]

export const doctorCategories = [
    "Chirurgie",
    "Cardiologie",
    "Chirurgie dentaire",
    "Dermatologie et vénéréologie",
    "Endocrinologie et diabétologie",
    "Gynécologie et obstétrique",
    "Médecine interne générale",
    "Médecine générale",
    "Médecine praticienne",
    "Ophtalmologie",
    "Psychiatrie et psychothérapie",
    "Radiologie",
    "Urologie",
    "Autre"
]

export const mandateCategories = [
    "Soins infirmiers",
    "Physiothérapie",
    "Aide à la personne",
    "Matériel"
]

export const cantons = {
    "Zurich": "Zurich (1)",
    "Berne": "Berne (2)",
    "Lucerne": "Lucerne (3)",
    "Uri": "Uri (4)",
    "Schwyz": "Schwyz (5)",
    "Obwald": "Obwald (6)",
    "Nidwald": "Nidwald (7)",
    "Glaris": "Glaris (8)",
    "Zoug": "Zoug (9)",
    "Fribourg": "Fribourg (10)",
    "Soleure": "Soleure (11)",
    "Bâle-Ville": "Bâle-Ville (12)",
    "Bâle-Campagne": "Bâle-Campagne (13)",
    "Schaffhouse": "Schaffhouse (14)",
    "Appenzell Rh.-Ext": "Appenzell Rh.-Ext. (15)",
    "Appenzell Rh.-Int.": "Appenzell Rh.-Int. (16)",
    "Saint-Gall": "Saint-Gall (17)",
    "Grisons": "Grisons (18)",
    "Argovie": "Argovie (19)",
    "Thurgovie": "Thurgovie (20)",
    "Tessin": "Tessin (21)",
    "Vaud": "Vaud (22)",
    "Valais": "Valais (23)",
    "Neuchâtel": "Neuchâtel (24)",
    "Genève": "Genève (25)",
    "Jura": "Jura (26)"
}

export const roles = {
    "ROLE_ADMIN": "Administrateur",
    "ROLE_NURSE": "Infirmier",
    "ROLE_DOCTOR": "Médecin",
    "ROLE_ORGANIZATION_MANDATOR": "Organisation mandataire",
    "ROLE_ORGANIZATION_BENEFIT": "Organisation"
}

export const documentCategories = [
    "OPAS",
    "Prescription médicale",
    "Plan de médication",
    "Profil",
    "Evaluation de soins",
    "Lettre de sortie",
    "Feuille de transfert",
    "Autre"
]

export const legalCares = [
    "let. a ch. 1",
    "let. a ch. 2",
    "let. a ch. 3",
    "let. b ch. 1",
    "let. b ch. 2",
    "let. b ch. 3",
    "let. b ch. 4",
    "let. b ch. 5",
    "let. b ch. 6",
    "let. b ch. 7",
    "let. b ch. 8",
    "let. b ch. 9",
    "let. b ch. 10",
    "let. b ch. 11",
    "let. b ch. 12",
    "let. b ch. 13",
    "let. b ch. 14",
    "let. c ch. 1",
    "let. c ch. 2"
]

export const opasStatus = {
    "brouillon": 'bg-waiting',
    "envoyé au médecin": 'bg-mention',
    "validé par le médecin": 'bg-info',
    "envoyé à l'assurance": 'bg-success',
    "contesté": 'bg-black text-white'
}

export const missionStatus = {
    "programmé": 'bg-slate-400',
    "en cours": 'bg-mention',
    "suspendu": 'bg-waiting',
    "terminé": 'bg-pink-500',
    "archivé": 'bg-info',
    "facturé": 'bg-success',
    "annulé": 'bg-error',
}

export const serviceCategoryColor = {
    "A": 'text-green-400',
    "B": 'text-pink-400',
    "C": 'text-orange-400',
    "N": 'text-gray-400',
}

export const mandateCategoriesUsersRoles = {
    "Soins infirmiers": "ROLE_NURSE",
    "Physiothérapie": "ROLE_NONE",
    "Aide à la personne": "ROLE_NONE",
    "Matériel": "ROLE_NONE"
}

