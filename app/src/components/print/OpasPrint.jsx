import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer'
import { AiOutlineDownload } from 'react-icons/ai'
import * as dayjs from 'dayjs'
import { nanoid } from '@reduxjs/toolkit'
import { calcNumberOfDays, calcNumberOfWeeks, calcNumberOfMonths } from '../../utils/functions'

import { URL } from '../../features/apiConfig'

const dpi = 72

const gap = 20

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30
    },
    header: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
    },
    column: {
        flex: 1,
        flexShrink: 1,
        flexGrow: 1,
        flexBasis: 0,
        marginHorizontal: gap / 2,
    },
    text: {
        fontSize: '9px',
        lineHeight: 1.4
    },
    textBold: {
        fontWeight: 'bold',
        fontSize: '9px',
        lineHeight: 1.4
    },
    mainTitle: {
        fontWeight: 'bold',
        fontSize: '18px',
        textAlign: 'left',
        paddingLeft: gap / 2
    },
    mainSubtitle: {
        fontSize: '12px',
        textAlign: 'left',
        paddingTop: '4px',
        paddingLeft: '8px'
    },
    title: {
        fontWeight: 'bold',
        fontSize: '12px',
        textAlign: 'left'
    },
    signature: {
        fontSize: '9px',
        textAlign: 'left',
    },
    separator: {
        width: '100%',
        height: '2px',
        borderRadius: 20,
        backgroundColor: '#027BBF',
        marginTop: '4px',
        marginBottom: '5px'
    },
    comment: {
        minHeight: 45,
        padding: '2 2',
        marginTop: 10,
        backgroundColor: '#F5F4F4',
        marginHorizontal: gap / 2,
    },
    caresContainer: {
        marginTop: '5px',
        borderTop: '1px solid black',
        borderLeft: '1px solid black',
        borderRight: '1px solid black',
    },
    careTitle: {
        padding: '4 4',
        borderBottom: '1px solid black',
        flexDirection: 'row',
        fontWeight: 'bold',
        fontSize: '9px',
    },
    care: {
        borderBottom: '1px solid black',
        flexDirection: 'row',
        //fontFamily: 'DinCondensed',
        fontSize: '9px',
    },
    pagination: {
        position: 'absolute',
        bottom: 20
    },
    paginationText: {
        width: '100%',
        fontSize: '9px',
        textAlign: 'center',
    },
    userSignature: {
        objectFit: 'contain',
        maxWidth: '230px',
        maxHeight: '95px',
        width: 'auto',
        height: 'auto',
    },
});

const Separator = () => {
    return (
        <View style={styles.separator}>
        </View>
    )
}


// Create Document Component
const MyDoc = ({ datas, mission, patient }) => {

    console.log('mission', mission)

    const cares = [
        {
            act: "let. a ch. 1",
            description: " Evaluation des besoins du patient en collaboration avec le m??decin.",
            display: false
        },
        {
            act: "let. a ch. 2",
            description: "Conseils au patient ainsi qu'aux intervenants non professionnels pour les soins, l???administration des m??dicaments ou pour l???utilisation d???appareils m??dicaux, contr??les n??cessaires",
            display: false
        },
        {
            act: "let. a ch. 3",
            description: "Coordination des mesures et dispositions par des infirmi??res et infirmiers sp??cialis??s en lien avec des complications dans les situations de soins complexes et instables.",
            display: false
        },
        {
            act: "let. b ch. 1",
            description: "Contr??le des signes vitaux (tension art??rielle, pouls, temp??rature, respiration, poids)",
            display: false
        },
        {
            act: "let. b ch. 2",
            description: "Soins aux diab??tiques (h??moglucotest, glycosurie, contr??le de l?????tat des pieds, ??ducation th??rapeutique)",
            display: false
        },
        {
            act: "let. b ch. 3",
            description: "Pr??l??vement pour examen de laboratoire.",
            display: false
        },
        {
            act: "let. b ch. 4",
            description: "Mesures th??rapeutiques pour la respiration (administration d???oxyg??ne, inhalations, exercices respiratoires simples, aspiration)",
            display: false
        },
        {
            act: "let. b ch. 5",
            description: "Pose de sondes et de cath??ters, ainsi que les soins qui y sont li??s.",
            display: false
        },
        {
            act: "let. b ch. 6",
            description: "Soins en cas d???h??modialyse ou de dialyse p??riton??ale.",
            display: false
        },
        {
            act: "let. b ch. 7",
            description: "Pr??paration et administration de m??dicaments ainsi que documentation des activit??s qui leur sont associ??es.",
            display: false
        },
        {
            act: "let. b ch. 8",
            description: "Administration ent??rale ou parent??rale de solutions nutritives.",
            display: false
        },
        {
            act: "let. b ch. 9",
            description: "Surveillance de perfusions, de transfusions ou d???appareils servant au contr??le et au maintien des fonctions vitales(.....)",
            display: false
        },
        {
            act: "let. b ch. 10",
            description: "Soins de plaies -rin??age, nettoyage et r??fection de pansement . Soins p??dicures pour les diab??tiques.",
            display: false
        },
        {
            act: "let. b ch. 11",
            description: "Soins en cas de troubles de l?????vacuation urinaire ou intestinale, y compris la r????ducation en cas d???incontinence",
            display: false
        },
        {
            act: "let. b ch. 12",
            description: "Assistance pour des bains m??dicinaux partiels ou complets, application d???enveloppements, cataplasmes et fangos.",
            display: false
        },
        {
            act: "let. b ch. 13",
            description: "Soins destin??s ?? la mise en oeuvre au quotidien de la th??rapie du m??decin, tels que l???exercice de strat??gies permettant de g??rer la maladie et l???instruction pour la gestion des agressions, des angoisses et des id??es parano??aques.",
            display: false
        },
        {
            act: "let. b ch. 14",
            description: "Soutien apport?? aux malades psychiques dans des situations de crise, en particulier pour ??viter les situations aigu??s de mise en danger de soi-m??me ou d???autrui.",
            display: false
        },
        {
            act: "let. c ch. 1",
            description: "Soins de base pour les patients d??pendants (aide ?? la toilette, ?? l???habillage, au d??shabillage, ?? l???alimentation, ?? la mobilisation, pose de bas de contention ....)",
            display: false
        },
        {
            act: "let. c ch. 2",
            description: "Mesures destin??es ?? surveiller et ?? soutenir les malades psychiques pour accomplir les actes ordinaires de la vie (...)",
            display: false
        }
    ]

    const displayedCares = () => {

        let displayed = [...cares]

        datas.content.services.forEach(service => {
            let index = cares.findIndex(obj => obj.act === service.opas)
            if (displayed[index].display === false) {
                displayed[index].display = true
                displayed[index].totalTime = calcTotalServiceTime(service)
                displayed[index].frequency = service.frequency
                displayed[index].periodicity = service.periodicity
            }
            else if (displayed[index].totalTime < calcTotalServiceTime(service)) {
                displayed[index].totalTime = calcTotalServiceTime(service)
                displayed[index].frequency = service.frequency
                displayed[index].periodicity = service.periodicity
            }

        })

        return displayed.filter(c => c.display === true)
    }

    const groupedServices = (groupBy) => {
        return datas.content.services.filter(f => f.category === groupBy)
    }


    const calcTotalServiceTime = (service) => {
        if (service.periodicity === "p??riode")
            return Number(service.time) * Number(service.frequency)
        if (service.periodicity === "jour")
            return Number(service.time) * Number(service.frequency) * calcNumberOfDays(datas.content.beginAt, datas.content.endAt)
        if (service.periodicity === "semaine")
            return Number(service.time) * Number(service.frequency) * calcNumberOfWeeks(datas.content.beginAt, datas.content.endAt)
        if (service.periodicity === "mois")
            return Number(service.time) * Number(service.frequency) * calcNumberOfMonths(datas.content.beginAt, datas.content.endAt)
    }


    let patientInfos = ''

    if (patient.gender === 'homme') patientInfos += 'Mr '
    else patientInfos += 'Mme '
    patientInfos += patient.lastname.toUpperCase() + ' ' + patient.firstname
    if (patient.gender === 'homme') patientInfos += ' n?? le '
    else patientInfos += ' n??e le '
    patientInfos += dayjs(patient.birthdate).format('DD MM YYYY') + ' (' + dayjs().diff(patient.birthdate, 'years') + ' ans)'
    patientInfos += "\n"
    patientInfos += (patient.address1) + ', ' + patient.npa + ' ' + patient.city + ', ' + patient.canton
    patientInfos += "\n"
    patientInfos += "N?? AVS : " + patient.avsNumber
    if (patient.assuranceNumber) {
        patientInfos += "\n"
        patientInfos += "N?? Assur?? : " + patient.assuranceNumber
    }


    let assurance = ''
    assurance += mission.assurance.company
    assurance += "\n"
    if (mission.assurance.address1)
        assurance += mission.assurance.address1 + ', '
    if (mission.assurance.npa)
        assurance += mission.assurance.npa + ', '
    if (mission.assurance.city)
        assurance += mission.assurance.city + ', '
    assurance += "\n"
    assurance += 'GLN : ' + mission.assurance.gln
    assurance += "\n"
    assurance += 'Cat??gorie : ' + mission.assurance.type

    let doctor = ''
    doctor += mission.doctor.fullname + "\n" + 'RCC : ' + mission.doctor.rcc
    doctor += "\n"
    if (mission.doctor.address1)
        doctor += mission.doctor.address1 + ', '
    if (mission.doctor.npa)
        doctor += mission.doctor.npa + ', '
    if (mission.doctor.city)
        doctor += mission.doctor.city + ', '

    doctor += "\n"
    if (mission.doctor.phone)
        doctor += 'T??l. : ' + mission.doctor.phone

    let nurse = ''
    nurse += mission.user.lastname + ' ' + mission.user.firstname
    nurse += "\n"
    nurse += 'RCC : ' + mission.user.rcc
    nurse += "\n"
    nurse += 'T??l. : ' + mission.user.phone || mission.user.mobile
    nurse += "\n"
    nurse += 'Email : ' + mission.user.email
    nurse += "\n"
    nurse += 'Adresse : ' + mission.user.address1
    nurse += "\n"
    nurse += mission.user.npa + ' ' + mission.user.city

    console.log('mission.user', mission.user)

    return (

        <Document >

            <Page size="A4" style={styles.page} dpi={dpi} wrap debug={false}>

                {/* <View style={styles.pagination} fixed>
                    <Text style={styles.paginationText} render={({ pageNumber, totalPages }) => (
                        `Page ${pageNumber} / ${totalPages}`
                    )} />
                </View > */}

                <View style={styles.header}>
                    <View>
                        <Text style={styles.mainTitle}>
                            Prescription m??dicale pour soins ?? domicile
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.mainSubtitle}>
                            (Selon article 7, al.2 OPAS)
                        </Text>
                    </View>
                </View>


                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>
                            {patient.gender === "homme" ? 'Patient' : 'Patiente'}
                        </Text>
                        <Separator />
                        <Text style={styles.text}>
                            {patientInfos}
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Assurance</Text>
                        <Separator />
                        <Text style={styles.text}>
                            {assurance}
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Prescription m??dicale</Text>
                        <Separator />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexShrink: 1, flexGrow: 1, flexBasis: 0 }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    {datas.content.type}
                                    {"\n"}
                                    P??riode : {dayjs(datas.content.beginAt).format('L')} au {dayjs(datas.content.endAt).format('L') + ' '}

                                    ({calcNumberOfDays(datas.content.beginAt, datas.content.endAt)} jours)
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexShrink: 1, flexGrow: 1, flexBasis: 0 }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Cas : {datas.content.case}
                                    {"\n"}
                                    {datas.content.disability === "oui" && "Au b??nifice d???une allocation pour impotent"}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {datas.content.diagnosticNurse.length > 0 &&
                    <View style={styles.comment}>
                        <Text style={{ ...styles.text, whiteSpace: 'pre-line' }}>
                            {datas.content.diagnosticNurse}
                        </Text>
                    </View>
                }

                <View style={styles.comment}>
                    <Text style={styles.text}>
                        (?? remplir par le m??decin pour des mesures m??dico-d??l??gu??es uniquement)
                        {"\n"}
                        {datas.content.diagnosticDoctor}
                    </Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Text style={styles.title}>
                                Soins infirmiers
                            </Text>
                            <Text style={{ fontSize: '9px' }}>

                            </Text>
                        </View>
                        <Separator />
                        <View style={styles.caresContainer}>
                            {displayedCares().map((displayedCare) =>
                                <View style={styles.care} key={nanoid()}>
                                    <Text style={{ width: 80, padding: 5 }}>
                                        {displayedCare.act}
                                    </Text>
                                    <Text style={{ width: '100%', padding: 5, borderLeft: '1px solid black' }}>
                                        {displayedCare.description}
                                    </Text>
                                    <Text style={{ width: 100, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                        {displayedCare.frequency}x / {displayedCare.periodicity}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5px' }}>
                    <View style={{ marginHorizontal: gap / 2 }} >
                        <Text style={styles.text}>
                            Total A (??valuation et conseils)  : {datas.content.totalA} min.
                            {datas.content.totalA !== 0 && " (" + Math.round(datas.content.totalA * 100 / 60) / 100 + "h)"}
                            {"\n"}
                            Total B (Examens et traitements) : {datas.content.totalB} min.
                            {datas.content.totalB !== 0 && " (" + Math.round(datas.content.totalB * 100 / 60) / 100 + "h)"}
                            {"\n"}
                            Total C (Soins de base) : {datas.content.totalC} min.
                            {datas.content.totalC !== 0 && " (" + Math.round(datas.content.totalC * 100 / 60) / 100 + "h)"}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: gap / 2 }} >
                        <Text style={styles.textBold}>
                            Total : {datas.content.totalA + datas.content.totalB + datas.content.totalC} min. ({Math.round((datas.content.totalA + datas.content.totalB + datas.content.totalC) * 100 / 60) / 100} h)
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>M??decin</Text>
                        <Separator />
                        <Text style={styles.text}>
                            {doctor}
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Infirmier</Text>
                        <Separator />
                        <Text style={styles.text}>
                            {nurse}
                        </Text>
                    </View>

                    {mission.coworkersDetailed.length > 0 &&
                        <View style={styles.column}>
                            <Text style={styles.title}>Autres prestataires </Text>
                            <Separator />
                            {mission.coworkersDetailed.map(p =>
                                <Text style={styles.text} key={nanoid()}>
                                    {p.lastname.toUpperCase()} {p.firstname} {"\n"} RCC: {p.rcc}
                                </Text>
                            )}
                        </View>
                    }
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.signature}>Date et signature du m??decin</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.signature}>Signature de l'infirmier</Text>image
                        {mission.user.signature &&
                            <>
                                <Image
                                    style={styles.userSignature}
                                    source={URL + mission.user.signature.contentUrl}
                                />
                            </>
                        }
                    </View>
                    {mission.coworkersDetailed.length > 0 &&
                        <View style={styles.column}>
                        </View>
                    }
                </View>

            </Page >

            <Page size="A4" style={styles.page} dpi={dpi} wrap debug={false}>

                <View style={styles.header}>
                    <View>
                        <Text style={styles.mainTitle}>
                            Liste d??taill??es des prestations
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.mainSubtitle}>
                            (Selon article 7, al.2 OPAS)
                        </Text>
                    </View>
                </View>


                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>
                            {patient.gender === "homme" ? 'Patient' : 'Patiente'}
                        </Text>
                        <Separator />
                        <Text style={styles.text}>
                            {patientInfos}
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Assurance</Text>
                        <Separator />
                        <Text style={styles.text}>
                            {assurance}
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Text style={styles.title}>
                                Soins infirmiers
                            </Text>
                            <Text style={{ fontSize: '9px' }}>
                                Description d??taill??e de la prestation (selon article 7, al. 2 OPAS)
                            </Text>
                        </View>
                        <Separator />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexShrink: 1, flexGrow: 1, flexBasis: 0 }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    {datas.content.type}
                                    {"\n"}
                                    P??riode : {dayjs(datas.content.beginAt).format('L')} au {dayjs(datas.content.endAt).format('L') + ' '}
                                    ({calcNumberOfDays(datas.content.beginAt, datas.content.endAt)} jours)
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexShrink: 1, flexGrow: 1, flexBasis: 0 }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Cas : {datas.content.case}
                                    {"\n"}
                                    {datas.content.disability === "oui" && "Au b??nifice d???une allocation pour impotent"}
                                </Text>
                            </View>
                        </View>

                        <View style={{ marginTop: '9px' }}>
                            <View style={{
                                padding: '0 0',
                                flexDirection: 'row',
                                //fontFamily: 'DinCondensed',
                                fontSize: '9px',
                            }}>
                                <Text style={{ width: 100, paddingLeft: 5 }}>
                                    OPAS *
                                </Text>
                                <Text style={{ width: 90, paddingLeft: 5, textAlign: 'center' }}>
                                    Code *
                                </Text>
                                <Text style={{ width: '100%', paddingLeft: 5, paddingRight: 15 }}>
                                    Prestation
                                </Text>
                                <Text style={{ width: 100, textAlign: 'center' }}>
                                    Dur??e
                                </Text>
                                <Text style={{ width: 140, textAlign: 'center' }}>
                                    Fr??quence
                                </Text>
                                <Text style={{ width: 120, textAlign: 'center' }}>
                                    Dur??e totale
                                </Text>
                            </View>
                        </View>

                        {groupedServices("A").length > 0 &&
                            <View style={styles.caresContainer}>
                                <View>
                                    <Text style={styles.careTitle}>
                                        A / Evaluation et conseils
                                    </Text>
                                </View>
                                {groupedServices("A").map((s) =>
                                    <View style={styles.care} key={nanoid()}>
                                        <Text style={{ width: 110, paddingLeft: 5, paddingTop: 5, paddingBottom: 5 }}>
                                            {s.opas}
                                        </Text>
                                        <Text style={{ width: 90, paddingLeft: 5, paddingTop: 5, paddingBottom: 5, borderLeft: '1px solid black', textAlign: 'center' }}>
                                            {s.act}
                                        </Text>
                                        <Text style={{ width: '100%', paddingLeft: 5, paddingRight: 15, paddingTop: 5, paddingBottom: 5, borderLeft: '1px solid black' }}>
                                            {s.title}
                                        </Text>
                                        <Text style={{ width: 110, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                            {s.time}
                                        </Text>
                                        <Text style={{ width: 140, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                            {s.frequency}x / {s.periodicity === "par p??riode" ? 'p??riode' : s.periodicity}
                                        </Text>
                                        <Text style={{ width: 120, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                            {calcTotalServiceTime(s)}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        }
                        {groupedServices("B").length > 0 &&
                            <View style={styles.caresContainer}>
                                <View>
                                    <Text style={styles.careTitle}>
                                        B / Examens et traitements
                                    </Text>
                                </View>
                                {groupedServices("B").map((s) =>
                                    <View style={styles.care} key={nanoid()}>
                                        <Text style={{ width: 110, paddingLeft: 5, paddingTop: 5, paddingBottom: 5 }}>
                                            {s.opas}
                                        </Text>
                                        <Text style={{ width: 90, paddingLeft: 5, paddingTop: 5, paddingBottom: 5, borderLeft: '1px solid black', textAlign: 'center' }}>
                                            {s.act}
                                        </Text>
                                        <Text style={{ width: '100%', paddingLeft: 5, paddingRight: 15, paddingTop: 5, paddingBottom: 5, borderLeft: '1px solid black' }}>
                                            {s.title}
                                        </Text>
                                        <Text style={{ width: 110, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                            {s.time}
                                        </Text>
                                        <Text style={{ width: 140, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                            {s.frequency}x / {s.periodicity === "par p??riode" ? 'p??riode' : s.periodicity}
                                        </Text>
                                        <Text style={{ width: 120, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                            {calcTotalServiceTime(s)}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        }
                        {groupedServices("C").length > 0 &&
                            <View style={styles.caresContainer}>
                                <View>
                                    <Text style={styles.careTitle}>
                                        C / Soins de base
                                    </Text>
                                </View>
                                {groupedServices("C").map((s) =>
                                    <View style={styles.care} key={nanoid()}>
                                        <Text style={{ width: 110, paddingLeft: 5, paddingTop: 5, paddingBottom: 5 }}>
                                            {s.opas}
                                        </Text>
                                        <Text style={{ width: 90, paddingLeft: 5, paddingTop: 5, paddingBottom: 5, borderLeft: '1px solid black', textAlign: 'center' }}>
                                            {s.act}
                                        </Text>
                                        <Text style={{ width: '100%', paddingLeft: 5, paddingRight: 15, paddingTop: 5, paddingBottom: 5, borderLeft: '1px solid black' }}>
                                            {s.title}
                                        </Text>
                                        <Text style={{ width: 110, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                            {s.time}
                                        </Text>
                                        <Text style={{ width: 140, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                            {s.frequency}x / {s.periodicity === "par p??riode" ? 'p??riode' : s.periodicity}
                                        </Text>
                                        <Text style={{ width: 120, borderLeft: '1px solid black', textAlign: 'center', paddingTop: 5, paddingBottom: 5 }}>
                                            {calcTotalServiceTime(s)}
                                        </Text>
                                    </View>
                                )}
                            </View>
                        }
                    </View>
                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5px' }}>
                    <View style={{ marginHorizontal: gap / 2 }} >
                        <Text style={styles.text}>
                            Total A (??valuation et conseils)  : {datas.content.totalA} min.
                            {datas.content.totalA !== 0 && " (" + Math.round(datas.content.totalA * 100 / 60) / 100 + "h)"}
                            {"\n"}
                            Total B (Examens et traitements) : {datas.content.totalB} min.
                            {datas.content.totalB !== 0 && " (" + Math.round(datas.content.totalB * 100 / 60) / 100 + "h)"}
                            {"\n"}
                            Total C (Soins de base) : {datas.content.totalC} min.
                            {datas.content.totalC !== 0 && " (" + Math.round(datas.content.totalC * 100 / 60) / 100 + "h)"}
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: gap / 2 }} >
                        <Text style={styles.textBold}>
                            Total : {datas.content.totalA + datas.content.totalB + datas.content.totalC} min. ({Math.round((datas.content.totalA + datas.content.totalB + datas.content.totalC) * 100 / 60) / 100} h)
                        </Text>
                    </View>
                </View>


                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={{ fontSize: '8px', lineHeight: 1.4 }}>
                            OPAS * : Prestation selon OPAS article 7 alin??a 2
                        </Text>
                        <Text style={{ fontSize: '8px', lineHeight: 1.4 }}>
                            Code * : Selon le catalogue des actes de l'ASSASD (novembre 2015)
                        </Text>
                    </View>
                </View>

                {/* <View style={styles.pagination} fixed>
                    <Text style={styles.paginationText} render={({ pageNumber, totalPages }) => (
                        `Page ${pageNumber} / ${totalPages}`
                    )} />
                </View> */}

            </Page>

        </Document >
    )

}

const OpasPrint = ({ datas, mission, patient, }) => {

    const fileName = "Opas_" + patient.lastname.toUpperCase() + '_' + patient.firstname.toUpperCase() + '_' + dayjs().format('DD-MM-YYYY')

    if (datas && mission)
        return (
            <div>
                <PDFDownloadLink document={<MyDoc datas={datas} mission={mission} patient={patient} />} fileName={fileName}>
                    {({ blob, loading, error }) =>
                        loading ?
                            <button disabled>T??l??charger</button>
                            :
                            <button>T??l??charger</button>
                    }
                </PDFDownloadLink>
            </div>
        )
    else return null
}

export default OpasPrint