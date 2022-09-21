export const doctor = {
    category: '',
    fullname: '',
    organization: '',
    phone: '',
    email: '',
    fax: '',
    mobile: '',
    npa: '',
    city: '',
    canton: '',
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
    gender: '',
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
    doctorIRI: null,
    assuranceIRI: null
}

export const services_family = [
    "Alimentation et diètes",
    "Elimination",
    "Evaluation - Conseil - Coordination",
    "Hygiène - Confort",
    "Mesures - Diagnostics",
    "Mobilisation",
    "Pansement",
    "Respiration",
    "Thérapies sur prescription médicale",
    "Accompagnement - Aide pratique",
    "Entretien du domicile",
    "Suppléance parentale",
    "Psychiatrie"
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
    "Valais": "Valais (23)",
    "Neuchâtel": "Neuchâtel (24)",
    "Genève": "Genève (25)",
    "Jura": "Jura (26)"
}

export const MediaCategories = [
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
    "brouillon" : "waiting",
    "envoyé au médecin" : "mention",
    "validé par le médecin" : "info",
    "envoyé à l'assurance" : "success",
    "contesté" : "black"
}