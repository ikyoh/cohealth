import React from 'react'
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink, Image, Font } from '@react-pdf/renderer';

import Din from '../assets/Din/D-DIN.ttf'
import DinBold from '../assets/Din/D-DIN-Bold.ttf'
import DinCondensed from '../assets/Din/D-DINCondensed.ttf'

const patient = {
    name: 'Monsieur BEFFA Maurice, né le 04 12 1921 (101 ans)',
    adress: 'Rue François-Grast 12, 1208 Genève, Genève'
}

const cares = [{}, {}, {}, {}, {}, {}]

const partenaire = true

Font.register({
    family: 'Din', fonts: [
        { src: Din },
        { src: DinBold, fontWeight: 'bold' },

    ]
})
Font.register({
    family: 'DinCondensed', fonts: [
        { src: DinCondensed }
    ]
})

const dpi = 72

const gap = 20

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 30
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        fontFamily: 'Din',
        fontSize: '10px',
        lineHeight: 1.4
    },
    textBold: {
        fontFamily: 'Din',
        fontWeight: 'bold',
        fontSize: '10px',
        lineHeight: 1.4
    },
    mainTitle: {
        fontFamily: 'Din',
        fontWeight: 'bold',
        fontSize: '18px',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    mainSubtitle: {
        fontFamily: 'Din',
        fontSize: '12px',
        textAlign: 'center',
    },
    title: {
        fontFamily: 'Din',
        fontWeight: 'bold',
        fontSize: '12px',
        textAlign: 'left',
        textTransform: 'uppercase',
    },
    signature: {
        fontFamily: 'Din',
        fontSize: '9px',
        textAlign: 'left',
    },
    separator: {
        width: '100%',
        height: '2px',
        borderRadius: 20,
        backgroundColor: '#FB9678',
        marginTop: '4px',
        marginBottom: '5px'
    },
    comment: {
        height: 45,
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
        padding: '4 10',
        borderBottom: '1px solid black',
        flexDirection: 'row',
        fontFamily: 'Din',
        fontWeight: 'bold',
        fontSize: '10px',
    },
    care: {
        padding: '4 10',
        borderBottom: '1px solid black',
        flexDirection: 'row',
        fontFamily: 'DinCondensed',
        fontSize: '10px',
    },
    pagination: {
        position: 'absolute',
        bottom: 20
    },
    paginationText: {
        width: '100%',
        fontFamily: 'Din',
        fontSize: '10px',
        textAlign: 'center',
    }
});

const Separator = () => {
    return (
        <View style={styles.separator}>
        </View>
    )
}


// Create Document Component
const MyDoc = () => {
    return (

        <Document >

            <Page size="A4" style={styles.page} dpi={dpi} wrap debug={true}>

                <View style={styles.pagination} fixed>
                    <Text style={styles.paginationText} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} />
                </View>

                <View>
                    <Text style={styles.mainTitle}>Prescription médicale pour soins à domicile</Text>
                </View>
                <View>
                    <Text style={styles.mainSubtitle}>(Selon article 7, al.2 OPAS)</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Patient</Text>
                        <Separator />
                        <Text style={styles.text}>
                            {patient.name}
                            {"\n"}
                            {patient.adress}
                            {"\n"}
                            No. AVS: 756.9732.6193.22
                            {"\n"}
                            No. Assuré: 80756000080071999977
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Assurance</Text>
                        <Separator />
                        <Text style={styles.text}>
                            {patient.name}
                            {"\n"}
                            {patient.adress}
                            {"\n"}
                            No. AVS: 756.9732.6193.22
                            {"\n"}
                            No. Assuré: 80756000080071999977
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Prescription médicale</Text>
                        <Separator />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexShrink: 1, flexGrow: 1, flexBasis: 0 }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Prescription initiale
                                    {"\n"}
                                    Période: du 04/06/2022 au 30/07/2022 (57 jours)
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexShrink: 1, flexGrow: 1, flexBasis: 0 }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Cas: maladie
                                    {"\n"}
                                    Au bénifice d’une allocation pour impotent
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.comment}>
                    <Text style={styles.text}>
                        commentaire infirmier
                    </Text>
                </View>

                <View style={styles.comment}>
                    <Text style={styles.text}>
                        commentaire médecin
                    </Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Text style={styles.title}>
                                Soins infirmiers
                            </Text>
                            <Text style={{ fontFamily: 'Din', fontSize: '10px' }}>
                                Description détaillée de la prestation
                            </Text>
                        </View>
                        <Separator />
                        <View style={styles.caresContainer}>
                            {cares.map(() =>
                                <View style={styles.care}>
                                    <Text style={{ width: 60 }}>
                                        let. a ch. 1
                                    </Text>
                                    <Text style={{ width: '100%', paddingRight: 15 }}>
                                        Conseils au patient ainsi qu'aux intervenants non professionnels pour les soins,
                                        l’administration des médicaments ou pour l’utilisation d’appareils médicaux,
                                        contrôles nécessaires.
                                    </Text>
                                    <Text style={{ width: 75 }}>
                                        1 fois par période
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: '5px' }}>
                    <View style={{ marginHorizontal: gap / 2 }} >
                        <Text style={styles.text}>
                            Total A (Évaluation et conseils)  : 1035 min (19.5 heures)
                            {"\n"}
                            Total B (Examens et traitements) : 2622 min.
                            {"\n"}
                            Total C (Soins de base) : 4332 min.
                        </Text>
                    </View>
                    <View style={{ marginHorizontal: gap / 2 }} >
                        <Text style={styles.textBold}>
                            Total minutes : 7989  (133 h 09 min)
                        </Text>
                    </View>
                </View>


                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Médecin</Text>
                        <Separator />
                        <Text style={styles.text}>
                            Forster Alexandre (RCC : U509825)
                            {"\n"}
                            Avenue du Cardinal-Mermillod 36
                            {"\n"}
                            Tél. : 022 340 36 36
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Infirmier</Text>
                        <Separator />
                        <Text style={styles.text}>
                            Tahri Karim (RCC : C5121.25)
                            {"\n"}
                            Avenue des morgines 12, 1213 Genève
                            {"\n"}
                            Tél. : 078 831 40 00 - Fax 022 792 11 22
                            {"\n"}
                            Email: karim.tahri@hin.ch
                        </Text>
                    </View>
                    {partenaire &&
                        <View style={styles.column}>
                            <Text style={styles.title}>Autres prestataires </Text>
                            <Separator />
                            <Text style={styles.text}>
                                Ait Messaoud Oussama  (RCC : P5429.25)
                            </Text>
                        </View>
                    }
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.signature}>Date et signature du médecin</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.signature}>Signature de l'infirmier</Text>
                    </View>
                    {partenaire &&
                        <View style={styles.column}>
                        </View>
                    }
                </View>



            </Page>

            <Page size="A4" style={styles.page} dpi={dpi} wrap debug={true}>

                <View>
                    <Text style={styles.mainTitle}>Liste détaillées des prestations</Text>
                </View>
                <View>
                    <Text style={styles.mainSubtitle}>(Selon article 7, al.2 OPAS)</Text>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Patient</Text>
                        <Separator />
                        <Text style={styles.text}>
                            {patient.name}
                            {"\n"}
                            {patient.adress}
                            {"\n"}
                            No. AVS: 756.9732.6193.22
                            {"\n"}
                            No. Assuré: 80756000080071999977
                        </Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.title}>Assurance</Text>
                        <Separator />
                        <Text style={styles.text}>
                            {patient.name}
                            {"\n"}
                            {patient.adress}
                            {"\n"}
                            No. AVS: 756.9732.6193.22
                            {"\n"}
                            No. Assuré: 80756000080071999977
                        </Text>
                    </View>
                </View>

                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.title}>Soins infirmiers</Text>
                        <Separator />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexShrink: 1, flexGrow: 1, flexBasis: 0 }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Prescription initiale
                                    {"\n"}
                                    Période: du 04/06/2022 au 30/07/2022 (57 jours)
                                </Text>
                            </View>
                            <View style={{ flex: 1, flexShrink: 1, flexGrow: 1, flexBasis: 0 }}>
                                <Text style={{ ...styles.text, fontWeight: 'bold' }}>
                                    Cas: maladie
                                    {"\n"}
                                    Au bénifice d’une allocation pour impotent
                                </Text>
                            </View>
                        </View>
                        <View style={styles.caresContainer}>
                            <View>
                                <Text style={styles.careTitle}>
                                    A / Evaluation, Conseil
                                </Text>
                            </View>
                            {cares.map(() =>
                                <View style={styles.care}>
                                    <Text style={{ width: 60 }}>
                                        let. a ch. 1
                                    </Text>
                                    <Text style={{ width: '100%', paddingRight: 15 }}>
                                        Conseils au patient ainsi qu'aux intervenants non professionnels pour les soins,
                                        l’administration des médicaments ou pour l’utilisation d’appareils médicaux,
                                        contrôles nécessaires.
                                    </Text>
                                    <Text style={{ width: 75 }}>
                                        1 fois par période
                                    </Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.caresContainer}>
                            <View>
                                <Text style={styles.careTitle}>
                                    B / Examens et traitements
                                </Text>
                            </View>
                            {cares.map(() =>
                                <View style={styles.care}>
                                    <Text style={{ width: 60 }}>
                                        let. a ch. 1
                                    </Text>
                                    <Text style={{ width: '100%', paddingRight: 15 }}>
                                        Conseils au patient ainsi qu'aux intervenants non professionnels pour les soins,
                                        l’administration des médicaments ou pour l’utilisation d’appareils médicaux,
                                        contrôles nécessaires.
                                    </Text>
                                    <Text style={{ width: 75 }}>
                                        1 fois par période
                                    </Text>
                                </View>
                            )}
                        </View>
                        <View style={styles.caresContainer}>
                            <View>
                                <Text style={styles.careTitle}>
                                    C / Soins de base
                                </Text>
                            </View>
                            {cares.map(() =>
                                <View style={styles.care}>
                                    <Text style={{ width: 60 }}>
                                        let. a ch. 1
                                    </Text>
                                    <Text style={{ width: '100%', paddingRight: 15 }}>
                                        Conseils au patient ainsi qu'aux intervenants non professionnels pour les soins,
                                        l’administration des médicaments ou pour l’utilisation d’appareils médicaux,
                                        contrôles nécessaires.
                                    </Text>
                                    <Text style={{ width: 75 }}>
                                        1 fois par période
                                    </Text>
                                </View>
                            )}
                        </View>

                    </View>
                </View>


                <View style={{ marginHorizontal: gap / 2 }} >
                    <Text style={{ ...styles.textBold, textAlign: 'right', marginTop: 10 }}>
                        Total minutes : 7989  (133 h 09 min)
                    </Text>
                </View>


                <View style={styles.pagination} fixed>
                    <Text style={styles.paginationText} render={({ pageNumber, totalPages }) => (
                        `${pageNumber} / ${totalPages}`
                    )} />
                </View>

            </Page>



        </Document>
    )

}

const PDFPage = () => {
    return (<>
        <div>
            <PDFViewer width='100%' height={2000}>
                <MyDoc />
            </PDFViewer>
        </div>
        <div>
            <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download now!'
                }
            </PDFDownloadLink>
        </div>
    </>
    )
}




export default PDFPage