import { Page, Text, View, Document, StyleSheet, PDFDownloadLink, Image, Font, PDFViewer } from '@react-pdf/renderer'
import * as dayjs from 'dayjs'
import { nanoid } from '@reduxjs/toolkit'
import { calcNumberOfDays, calcNumberOfWeeks, calcNumberOfMonths, calcABCN, calcMinutestoHours } from '../../utils/functions'
import { useGetIRI as Mission } from '../../queryHooks/useMission'
import { useGetIRI as Doctor } from '../../queryHooks/useDoctor'
import { useGetIRI as Assurance } from '../../queryHooks/useAssurance'
import { useGetIRI as Nurse } from '../../queryHooks/useUser'
import { useGetAllDatas as Partners } from '../../queryHooks/usePartner'
import Roboto from '../../assets/Roboto_Condensed/RobotoCondensed-Regular.ttf'
import RobotoBold from '../../assets/Roboto_Condensed/RobotoCondensed-Bold.ttf'
import Loader from '../Loader'


const OpasPage1PDF = ({ data }) => {

    const { data: mission } = Mission(data ? data.mission : null)
    const { data: doctor } = Doctor(mission ? mission.doctor : null)
    const { data: assurance } = Assurance(mission ? mission.assurance : null)
    const { data: nurse } = Nurse(mission ? mission.user["@id"] : null)
    const { data: partners } = Partners()


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
                width: '20px',
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

        const displayedPartners = () => {
            let displayed = ""
            partners.forEach(p => {
                if (mission.coworkers.includes(p.partner.id)) {
                    displayed += p.partner.firstname + ' ' + p.partner.lastname
                    displayed += "\n"
                    displayed += "RCC: " + p.partner.rcc
                    displayed += "\n"
                }
            })
            return (displayed)
        }

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
        if (mission.patient.gender === 'homme') patientField += 'Mr '
        else patientField += 'Mme '
        patientField += mission.patient.lastname.toUpperCase() + ' ' + mission.patient.firstname
        if (mission.patient.gender === 'homme') patientField += ' né le '
        else patientField += ' née le '
        patientField += dayjs(mission.patient.birthdate).format('DD/MM/YYYY') + ' (' + dayjs().diff(mission.patient.birthdate, 'years') + ' ans)'
        patientField += "\n"
        patientField += (mission.patient.address1) + ', ' + mission.patient.npa + ' ' + mission.patient.city + ', ' + mission.patient.canton
        patientField += "\n"
        patientField += "N° AVS : " + mission.patient.avsNumber
        if (mission.patient.assuranceNumber) {
            patientField += "\n"
            patientField += "N° Assuré : " + mission.patient.assuranceNumber
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
        if (assurance.gln) {
            assuranceField += 'GLN : ' + assurance.gln
            assuranceField += "\n"
        }

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
        nurseField += 'Tél. : ' + nurse.mobile
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

        const totalA = calcABCN("A", data.content.services, mission.beginAt, mission.endAt)
        const totalAHours = calcMinutestoHours(totalA)
        const totalB = calcABCN("B", data.content.services, mission.beginAt, mission.endAt)
        const totalBHours = calcMinutestoHours(totalB)
        const totalC = calcABCN("C", data.content.services, mission.beginAt, mission.endAt)
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
                                    {mission.patient.gender === "homme" ? 'Patient' : 'Patiente'}
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

                        {mission.coworkers.length !== 0 &&
                            <View style={styles.column}>
                                <View style={[styles.row, { alignItems: 'center', marginBottom: 5, marginTop: 8 }]}>
                                    <Text style={styles.title}>Autres prestataires</Text>
                                    <Separator />
                                </View>
                                <Text style={styles.text}>
                                    {displayedPartners()}
                                </Text>
                            </View>
                        }
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

            </Document >
        )

    }

    const fileName = "Opas_" + dayjs().format('DD-MM-YYYY')

    if (data && mission && doctor && assurance && nurse)
        return (
            <PDFViewer showToolbar={true}>
                <MyDoc />
            </PDFViewer>
        )
    else return <Loader />
}

export default OpasPage1PDF