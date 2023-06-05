import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, Font } from '@react-pdf/renderer'
import * as dayjs from 'dayjs'
import { nanoid } from '@reduxjs/toolkit'
import { calcNumberOfDays, calcNumberOfWeeks, calcNumberOfMonths, calcABCN, calcMinutestoHours } from '../../utils/functions'
import { useGetIRI as Mission } from '../../queryHooks/useMission'
import { useGetIRI as Patient } from '../../queryHooks/usePatient'
import { useGetIRI as Doctor } from '../../queryHooks/useDoctor'
import { useGetIRI as Assurance } from '../../queryHooks/useAssurance'
import { useGetIRI as Nurse } from '../../queryHooks/useUser'
import Roboto from '../../assets/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import RobotoBold from '../../assets/Roboto_Condensed/RobotoCondensed-Bold.ttf'
import { HiDownload } from 'react-icons/hi'

const OpasPDF = ({ data }) => {

    const { data: mission } = Mission(data ? data.mission : null)
    const { data: patient } = Patient(mission ? mission.patient : null)
    const { data: doctor } = Doctor(mission ? mission.doctor : null)
    const { data: assurance } = Assurance(mission ? mission.assurance : null)
    const { data: nurse } = Nurse(mission ? mission.user["@id"] : null)

    // console.log('data', data)
    // console.log('mission', mission)
    // console.log('patient', patient)
    // console.log('doctor', doctor)
    // console.log('assurance', assurance)
    // console.log('nurse', nurse)

    // Create Document Component
    const MyDoc = () => {

        // console.log('data', data)

        const dpi = 72

        const gap = 20

        Font.register({
            family: 'Roboto',
            fonts: [
                { src: Roboto }, // font-style: normal, font-weight: normal
                { src: RobotoBold, fontWeight: 'bold' }
            ]
        });


        // Create styles
        const styles = StyleSheet.create({
            page: {
                fontFamily: 'Roboto',
                padding: 20,
            },
            header: {
                flexDirection: 'row',
                marginBottom: 10,
            },
            row: {
                flexDirection: 'row',
                marginTop: 0,
            },
            column: {
                flex: 1,
                flexShrink: 1,
                flexGrow: 1,
                flexBasis: 0,
                marginHorizontal: gap / 2,
            },
            text: {
                fontFamily: 'Roboto',
                fontSize: '9px',
                lineHeight: 1.4
            },
            textBold: {
                fontWeight: 'bold',
                fontSize: '9px',
                lineHeight: 1.4
            },
            mainTitle: {
                fontFamily: 'Roboto',
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
                fontFamily: 'Roboto',
                fontSize: '12px',
                textAlign: 'left',
                fontWeight: 'bold',
                textTransform: 'uppercase'
            },
            signature: {
                fontSize: '9px',
                textAlign: 'left',
            },
            separator: {
                width: '30px',
                height: '6px',
                borderRadius: 20,
                backgroundColor: '#027BBF',
                marginLeft: 6
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
                marginTop: 10,
                objectFit: 'contain',
                maxWidth: '120px',
                maxHeight: '80px',
                width: 'auto',
                height: 'auto',
            },
        });


        const cares = [
            {
                act: "let. a ch. 1",
                description: " Evaluation des besoins du patient en collaboration avec le médecin.",
                display: false
            },
            {
                act: "let. a ch. 2",
                description: "Conseils au patient ainsi qu'aux intervenants non professionnels pour les soins, l’administration des médicaments ou pour l’utilisation d’appareils médicaux, contrôles nécessaires",
                display: false
            },
            {
                act: "let. a ch. 3",
                description: "Coordination des mesures et dispositions par des infirmières et infirmiers spécialisés en lien avec des complications dans les situations de soins complexes et instables.",
                display: false
            },
            {
                act: "let. b ch. 1",
                description: "Contrôle des signes vitaux (tension artérielle, pouls, température, respiration, poids)",
                display: false
            },
            {
                act: "let. b ch. 2",
                description: "Soins aux diabétiques (hémoglucotest, glycosurie, contrôle de l’état des pieds, éducation thérapeutique)",
                display: false
            },
            {
                act: "let. b ch. 3",
                description: "Prélèvement pour examen de laboratoire.",
                display: false
            },
            {
                act: "let. b ch. 4",
                description: "Mesures thérapeutiques pour la respiration (administration d’oxygène, inhalations, exercices respiratoires simples, aspiration)",
                display: false
            },
            {
                act: "let. b ch. 5",
                description: "Pose de sondes et de cathéters, ainsi que les soins qui y sont liés.",
                display: false
            },
            {
                act: "let. b ch. 6",
                description: "Soins en cas d’hémodialyse ou de dialyse péritonéale.",
                display: false
            },
            {
                act: "let. b ch. 7",
                description: "Préparation et administration de médicaments ainsi que documentation des activités qui leur sont associées.",
                display: false
            },
            {
                act: "let. b ch. 8",
                description: "Administration entérale ou parentérale de solutions nutritives.",
                display: false
            },
            {
                act: "let. b ch. 9",
                description: "Surveillance de perfusions, de transfusions ou d’appareils servant au contrôle et au maintien des fonctions vitales(.....)",
                display: false
            },
            {
                act: "let. b ch. 10",
                description: "Soins de plaies -rinçage, nettoyage et réfection de pansement . Soins pédicures pour les diabétiques.",
                display: false
            },
            {
                act: "let. b ch. 11",
                description: "Soins en cas de troubles de l’évacuation urinaire ou intestinale, y compris la rééducation en cas d’incontinence",
                display: false
            },
            {
                act: "let. b ch. 12",
                description: "Assistance pour des bains médicinaux partiels ou complets, application d’enveloppements, cataplasmes et fangos.",
                display: false
            },
            {
                act: "let. b ch. 13",
                description: "Soins destinés à la mise en oeuvre au quotidien de la thérapie du médecin, tels que l’exercice de stratégies permettant de gérer la maladie et l’instruction pour la gestion des agressions, des angoisses et des idées paranoïaques.",
                display: false
            },
            {
                act: "let. b ch. 14",
                description: "Soutien apporté aux malades psychiques dans des situations de crise, en particulier pour éviter les situations aiguës de mise en danger de soi-même ou d’autrui.",
                display: false
            },
            {
                act: "let. c ch. 1",
                description: "Soins de base pour les patients dépendants (aide à la toilette, à l’habillage, au déshabillage, à l’alimentation, à la mobilisation, pose de bas de contention ....)",
                display: false
            },
            {
                act: "let. c ch. 2",
                description: "Mesures destinées à surveiller et à soutenir les malades psychiques pour accomplir les actes ordinaires de la vie (...)",
                display: false
            }
        ]

        const displayedCares = () => {

            let displayed = [...cares]

            data.content.services.forEach(service => {
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
            return data.content.services.filter(f => f.category === groupBy)
        }


        const calcTotalServiceTime = (service) => {
            if (service.periodicity === "période")
                return Number(service.time) * Number(service.frequency)
            if (service.periodicity === "jour")
                return Number(service.time) * Number(service.frequency) * calcNumberOfDays(mission.beginAt, mission.endAt)
            if (service.periodicity === "semaine")
                return Number(service.time) * Number(service.frequency) * calcNumberOfWeeks(mission.beginAt, mission.endAt)
            if (service.periodicity === "mois")
                return Number(service.time) * Number(service.frequency) * calcNumberOfMonths(mission.beginAt, mission.endAt)
        }


        let patientField = ''
        if (patient.gender === 'homme') patientField += 'Mr '
        else patientField += 'Mme '
        patientField += patient.lastname.toUpperCase() + ' ' + patient.firstname
        if (patient.gender === 'homme') patientField += ' né le '
        else patientField += ' née le '
        patientField += dayjs(patient.birthdate).format('DD/MM/YYYY') + ' (' + dayjs().diff(patient.birthdate, 'years') + ' ans)'
        patientField += "\n"
        patientField += (patient.address1) + ', ' + patient.npa + ' ' + patient.city + ', ' + patient.canton
        patientField += "\n"
        patientField += "N° AVS : " + patient.avsNumber
        if (patient.assuranceNumber) {
            patientField += "\n"
            patientField += "N° Assuré : " + patient.assuranceNumber
        }


        let assuranceField = ''
        assuranceField += assurance.company
        assuranceField += "\n"
        if (assurance.address1)
            assuranceField += assurance.address1 + ', '
        if (assurance.npa)
            assuranceField += assurance.npa + ', '
        if (assurance.city)
            assuranceField += assurance.city + ', '
        assuranceField += "\n"
        assuranceField += 'GLN : ' + assurance.gln
        assuranceField += "\n"
        assuranceField += 'Catégorie : ' + assurance.type

        let doctorField = ''
        doctorField += doctor.fullname + "\n" + 'RCC : ' + doctor.rcc
        doctorField += "\n"
        if (doctor.address1)
            doctorField += doctor.address1 + ', '
        if (doctor.npa)
            doctorField += doctor.npa + ', '
        if (doctor.city)
            doctorField += doctor.city + ', '

        doctorField += "\n"
        if (doctor.phone)
            doctorField += 'Tél. : ' + doctor.phone

        let nurseField = ''
        nurseField += nurse.lastname + ' ' + nurse.firstname
        nurseField += "\n"
        nurseField += 'RCC : ' + nurse.rcc
        nurseField += "\n"
        nurseField += 'Tél. : ' + nurse.phone || nurse.mobile
        nurseField += "\n"
        nurseField += 'Email : ' + nurse.email
        nurseField += "\n"
        nurseField += nurse.address1
        nurseField += "\n"
        nurseField += nurse.npa + ' ' + nurse.city

        const Separator = () => {
            return (
                <View style={styles.separator}>
                </View>
            )
        }

        const totalA = calcABCN("A", data.content.services, mission.beginAt, mission.e)
        const totalAHours = calcMinutestoHours(totalA)
        const totalB = calcABCN("B", data.content.services, mission.beginAt, mission.e)
        const totalBHours = calcMinutestoHours(totalB)
        const totalC = calcABCN("C", data.content.services, mission.beginAt, mission.e)
        const totalCHours = calcMinutestoHours(totalC)

        return (

            <Document >

                <Page size="A4" style={styles.page} dpi={dpi} wrap debug={false}>

                    <View style={styles.header}>
                        <View>
                            <Text style={styles.mainTitle}>
                                Prescription médicale pour soins à domicile
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
                            <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                <Text style={styles.title}>
                                    {patient.gender === "homme" ? 'Patient' : 'Patiente'}
                                </Text>
                                <Separator />
                            </View>
                            <Text style={styles.text}>
                                {patientField}
                            </Text>
                        </View>
                        <View style={styles.column}>
                            <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                <Text style={styles.title}>Assurance</Text>
                                <Separator />
                            </View>
                            <Text style={styles.text}>
                                {assuranceField}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                <Text style={styles.title}>Prescription médicale</Text>
                                <Separator />
                            </View>
                            <View style={{ ...styles.row, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    {data.content.type}
                                </Text>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Période : {dayjs(mission.beginAt).format('L')} au {dayjs(mission.endAt).format('L') + ' '}
                                    ({calcNumberOfDays(mission.beginAt, mission.endAt)} jours)
                                </Text>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Cas : {data.content.case}
                                </Text>
                                {data.content.disability === "oui" &&
                                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                        Au bénifice d’une allocation pour impotent
                                    </Text>
                                }
                            </View>
                        </View>
                    </View>

                    {data.content.diagnosticNurse.length > 0 &&
                        <View style={styles.comment}>
                            <Text style={{ ...styles.text, whiteSpace: 'pre-line' }}>
                                {data.content.diagnosticNurse}
                            </Text>
                        </View>
                    }

                    <View style={styles.comment}>
                        <Text style={{ ...styles.text, whiteSpace: 'pre-line' }}>
                            (à remplir par le médecin pour des mesures médico-déléguées uniquement)
                            {"\n"}
                            {data.content.diagnosticDoctor}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                <Text style={styles.title}>
                                    Soins infirmiers
                                </Text>
                                <Separator />
                            </View>
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
                                Total A (Évaluation et conseils)  : {totalA} min.
                                {totalA !== 0 && " (" + totalAHours + "h)"}
                                {"\n"}
                                Total B (Examens et traitements) : {totalB} min.
                                {totalB !== 0 && " (" + totalBHours + "h)"}
                                {"\n"}
                                Total C (Soins de base) : {totalC} min.
                                {totalC !== 0 && " (" + totalCHours + "h)"}
                            </Text>
                        </View>
                        <View style={{ marginHorizontal: gap / 2 }} >
                            <Text style={styles.textBold}>
                                Total : {totalA + totalB + totalC} min. ({Math.round((totalA + totalB + totalC) * 100 / 60) / 100} h)
                            </Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                <Text style={styles.title}>Médecin</Text>
                                <Separator />
                            </View>
                            <Text style={styles.text}>
                                {doctorField}
                            </Text>
                        </View>
                        <View style={styles.column}>
                            <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                <Text style={styles.title}>Infirmier</Text>
                                <Separator />
                            </View>
                            <Text style={styles.text}>
                                {nurseField}
                            </Text>
                        </View>

                        {/* {mission.coworkersDetailed.length > 0 &&
                            <View style={styles.column}>
                                <Text style={styles.title}>Autres prestataires </Text>
                                <Separator />
                                {mission.coworkersDetailed.map(p =>
                                    <Text style={styles.text} key={nanoid()}>
                                        {p.lastname.toUpperCase()} {p.firstname} {"\n"} RCC: {p.rcc}
                                    </Text>
                                )}
                            </View>
                        } */}
                    </View>

                    <View style={{ ...styles.row, marginTop: 10 }}>
                        <View style={styles.column}>
                            <Text style={styles.signature}>Date et signature du médecin</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.signature}>Signature de l'infirmier</Text>
                            {nurse && nurse.signature &&
                                <Image
                                    style={styles.userSignature}
                                    cache={true}
                                    src={nurse.signature.contentUrl}
                                />
                            }
                        </View>
                        {/* {mission.coworkersDetailed.length > 0 &&
                            <View style={styles.column}>
                            </View>
                        } */}
                    </View>

                </Page >

                <Page size="A4" style={styles.page} dpi={dpi} wrap debug={false}>

                    <View style={styles.header}>
                        <View>
                            <Text style={styles.mainTitle}>
                                Description détaillée de la prestation
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
                            <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                <Text style={styles.title}>
                                    {patient.gender === "homme" ? 'Patient' : 'Patiente'}
                                </Text>
                                <Separator />
                            </View>
                            <Text style={styles.text}>
                                {patientField}
                            </Text>
                        </View>
                        <View style={styles.column}>
                            <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                <Text style={styles.title}>Assurance</Text>
                                <Separator />
                            </View>
                            <Text style={styles.text}>
                                {assuranceField}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.column}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                    <Text style={styles.title}>
                                        Soins infirmiers
                                    </Text>
                                    <Separator />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
                            <View style={{ ...styles.row, justifyContent: 'space-between' }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    {data.content.type}
                                </Text>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Période : {dayjs(mission.beginAt).format('L')} au {dayjs(mission.endAt).format('L') + ' '}
                                    ({calcNumberOfDays(mission.beginAt, mission.endAt)} jours)
                                </Text>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Cas : {data.content.case}
                                </Text>
                                {data.content.disability === "oui" &&
                                    <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                        Au bénifice d’une allocation pour impotent
                                    </Text>
                                }
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <View style={styles.column}>
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
                                        Durée
                                    </Text>
                                    <Text style={{ width: 140, textAlign: 'center' }}>
                                        Fréquence
                                    </Text>
                                    <Text style={{ width: 120, textAlign: 'center' }}>
                                        Durée totale
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
                                                {s.frequency}x / {s.periodicity === "par période" ? 'période' : s.periodicity}
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
                                                {s.frequency}x / {s.periodicity === "par période" ? 'période' : s.periodicity}
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
                                                {s.frequency}x / {s.periodicity === "par période" ? 'période' : s.periodicity}
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
                                Total A (Évaluation et conseils)  : {totalA} min.
                                {totalA !== 0 && " (" + totalAHours + "h)"}
                                {"\n"}
                                Total B (Examens et traitements) : {totalB} min.
                                {totalB !== 0 && " (" + totalBHours + "h)"}
                                {"\n"}
                                Total C (Soins de base) : {totalC} min.
                                {totalC !== 0 && " (" + totalCHours + "h)"}
                            </Text>
                        </View>
                        <View style={{ marginHorizontal: gap / 2 }} >
                            <Text style={styles.textBold}>
                                Total : {totalA + totalB + totalC} min. ({Math.round((totalA + totalB + totalC) * 100 / 60) / 100} h)
                            </Text>
                        </View>
                    </View>


                    <View style={styles.row}>
                        <View style={styles.column}>
                            <Text style={{ fontSize: '8px', lineHeight: 1.4 }}>
                                OPAS * : Prestation selon OPAS article 7 alinéa 2
                            </Text>
                            <Text style={{ fontSize: '8px', lineHeight: 1.4 }}>
                                Code * : Selon le catalogue des actes de l'ASSASD (novembre 2015)
                            </Text>
                        </View>
                    </View>

                </Page >

            </Document >
        )

    }

    //const fileName = "Opas_" + patient.lastname.toUpperCase() + '_' + patient.firstname.toUpperCase() + '_' + dayjs().format('DD-MM-YYYY')
    const fileName = "Opas_" + dayjs().format('DD-MM-YYYY')

    if (data && patient && mission && doctor && assurance && nurse)
        return (
            <PDFDownloadLink document={<MyDoc />} fileName={fileName} className='btn btn-sm btn-circle btn-primary'>
                {({ blob, loading, error }) => (
                    <HiDownload />
                )
                }
            </PDFDownloadLink>
        )
    else return null
}

export default OpasPDF