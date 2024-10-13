import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#000',
        lineHeight: 1.5,
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textDecoration: 'underline',
    },
    photo: {
        width: 150,
        height: 'auto',
        borderRadius: '75%',
    },
});

const CV = ({ user }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>{user.Fname} {user.Lname}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Address: {user.Adresse}</Text>
                <Text>Phone: {user.Tel}</Text>
                <Text>Driver's License: {user.Permis}</Text>
                <Text>Skills: {user.Skills}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Experience</Text>
                {user.Experience.map((exp, index) => (
                    <Text key={index}>
                        {exp.title} at {exp.company} ({exp.years})
                    </Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Education</Text>
                {user.Formations.map((formation, index) => (
                    <Text key={index}>
                        {formation.degree} from {formation.school} ({formation.years})
                    </Text>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Photo</Text>
                {user.Photo && <Image style={styles.photo} src={URL.createObjectURL(user.Photo)} />}
            </View>
        </Page>
    </Document>
);

export default CV;
