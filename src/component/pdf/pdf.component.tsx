'use client'
import React from 'react';

import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import { ESUPPLIES_TYPE } from '@/constant';

interface IYEU_CAU {
    constructionName: string;
    suppliesType?: ESUPPLIES_TYPE;
    requestDate?: string;
    requestTime?: string;
    volume?: number;
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});


export const PdfComponent: React.FC<IYEU_CAU> = ({constructionName, suppliesType, requestDate, requestTime, volume}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>{constructionName}</Text>
                </View>
                <View style={styles.section}>
                    <Text>{suppliesType}</Text>
                </View>
                <View style={styles.section}>
                    <Text>{requestDate}</Text>
                </View>
                <View style={styles.section}>
                    <Text>{requestTime}</Text>
                </View>
                <View style={styles.section}>
                    <Text>{volume}</Text>
                </View>
            </Page>
        </Document>
    )
};
