'use client';
import React from 'react';

import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import { DON_VI_LABEL, ESUPPLIES_TYPE, LIST_SUPPLIES_TYPE_LABEL } from '@/constant';

// Đăng ký font Roboto
Font.register({
    family: 'Roboto',
    fonts: [
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
            fontWeight: 300
        },
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf',
            fontWeight: 400
        },
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf',
            fontWeight: 500
        },
        {
            src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
            fontWeight: 700
        }
    ]
});

// Đăng ký font Times New Roman với encoding
Font.register({
    family: 'Times New Roman',
    fonts: [
        {
            src: '/fonts/font-times-new-roman/SVN-Times New Roman.ttf',
            fontWeight: 400,
            fontStyle: 'normal'
        },
        {
            src: '/fonts/font-times-new-roman/SVN-Times New Roman Bold.ttf',
            fontWeight: 700,
            fontStyle: 'bold'
        },
        {
            src: '/fonts/font-times-new-roman/SVN-Times New Roman Italic.ttf',
            fontWeight: 400,
            fontStyle: 'italic'
        },
        {
            src: '/fonts/font-times-new-roman/SVN-Times New Roman Bold Italic.ttf',
            fontWeight: 700,
            fontStyle: 'bold italic'
        }
    ],
    encode: true // Bật encoding cho Unicode
});

interface IYEU_CAU {
    constructionName: string;
    suppliesType: ESUPPLIES_TYPE;
    requestDate?: dayjs.Dayjs;
    requestTime?: dayjs.Dayjs;
    volume?: number;
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
        fontFamily: 'Times New Roman'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontStyle: 'bold'
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 40
    },
    text: {
        margin: 8,
        fontSize: 12,
        textAlign: 'justify',
        fontStyle: 'normal'
    },
    author: {
        marginTop: 18,
        fontSize: 12,
        fontStyle: 'bold italic'
    },
    end: {
        fontSize: 12,
        fontStyle: 'italic'
    }
});


export const PdfComponent = ({
     constructionName,
     suppliesType,
     requestDate,
     requestTime,
     volume
}: IYEU_CAU) => {
    return (
        <Document>
            <Page size="A4" style={styles.body}>
                <View>
                    <Text style={styles.title}>PHIẾU YÊU CẦU VẬT TƯ</Text>
                    <Text style={styles.subtitle}>Kính gửi: Ban Giám Đốc</Text>
                    <Text style={styles.text}>Tên công trình: {constructionName}</Text>
                    <Text style={styles.text}>Ngày giờ yêu cầu cấp: {`${dayjs(requestDate, 'DD/MM/YYYY').format('DD/MM/YYYY')} vào lúc ${dayjs(requestTime, 'HH:mm').format('HH:mm')}`}</Text>
                    <Text style={styles.text}>Hạng mục: {`${LIST_SUPPLIES_TYPE_LABEL[suppliesType]}`}</Text>
                    <Text style={styles.text}>Khối lượng yêu cầu: {`${volume}`?.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ` ${DON_VI_LABEL[suppliesType]}`} </Text>
                    <Text style={styles.author}>Kính đề nghị BGĐ xem xét duyệt cấp.</Text>
                    <Text style={styles.end}>Trân Trọng.</Text>
                </View>
            </Page>
        </Document>
    );
};
