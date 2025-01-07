'use client';
import React, { useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, DatePicker, Input, InputNumber, Row, Select, TimePicker } from 'antd';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';

import { FieldComponent } from '@/component';
import { PdfComponent } from '@/component/pdf';

import { DON_VI_LABEL, ESUPPLIES_TYPE, LIST_SUPPLIES_TYPE, validateSchemaSuppliesForm } from '@/constant';

const PDFDownloadLink = dynamic(() =>
        import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    { ssr: false }
);

export interface IFormInput {
    constructionName: string;
    suppliesType: ESUPPLIES_TYPE;
    requestDate: string;
    requestTime: string;
    volume: number;
}

export default function Home() {
    const formRef = useRef<HTMLFormElement>(null);

    const formMethods = useForm<IFormInput>({
        defaultValues: { constructionName: '', suppliesType: undefined, requestTime: '', requestDate: '', volume: 1 },
        mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: yupResolver(validateSchemaSuppliesForm)
    });

    const { formState, watch } = formMethods;
    const { isValid } = formState;

    const watchSuppliesType = watch('suppliesType');
    const watchConstructionName = watch('constructionName');
    const watchRequestDate = watch('requestDate');
    const watchRequestTime = watch('requestTime');
    const watchVolume = watch('volume');


    const handleConfirmModalRequest: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
    };

    return (
        <div
            className="min-h-screen items-center p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 items-center sm:items-center">
                <p className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">PHIẾU YÊU CẦU</p>
                <form className="w-full max-w-xs flex flex-col gap-4" ref={formRef}
                      onSubmit={handleConfirmModalRequest}>
                    <FormProvider {...formMethods}>
                        <Row gutter={[16, 16]}>
                            <Col span={24}>
                                <Controller
                                    control={formMethods.control}
                                    name="constructionName"
                                    render={({ field: { value, ...restField }, fieldState }) => {
                                        return (
                                            <FieldComponent
                                                isRequired
                                                isShowMessage={!!fieldState?.error}
                                                message={fieldState?.error?.message}
                                                text={'Tên công trình'}>
                                                <Input
                                                    {...restField}
                                                    value={value}
                                                    status={fieldState.error ? 'error' : undefined}
                                                    placeholder={'Nhập'}
                                                />
                                            </FieldComponent>
                                        );
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <Controller
                                    control={formMethods.control}
                                    name="suppliesType"
                                    render={({ field: { value, ...restField }, fieldState }) => {
                                        return (
                                            <FieldComponent
                                                isRequired
                                                isShowMessage={!!fieldState?.error}
                                                message={fieldState?.error?.message}
                                                text={'Loại vật tư / Nhiên liệu'}>
                                                <Select
                                                    {...restField}
                                                    value={value}
                                                    style={{ width: '100%' }}
                                                    placeholder="Chọn"
                                                    options={LIST_SUPPLIES_TYPE} />
                                            </FieldComponent>
                                        );
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <Controller
                                    control={formMethods.control}
                                    name="volume"
                                    render={({ field: { value, ...restField }, fieldState }) => {
                                        return (
                                            <FieldComponent
                                                isRequired
                                                isShowMessage={!!fieldState?.error}
                                                message={fieldState?.error?.message}
                                                text={'Khối lượng'}>
                                                <InputNumber style={{ width: '100%' }} {...restField} value={value}
                                                             addonAfter={DON_VI_LABEL[watchSuppliesType]}
                                                             defaultValue={1}
                                                             formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                />
                                            </FieldComponent>
                                        );
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <Controller
                                    control={formMethods.control}
                                    name="requestDate"
                                    render={({ field: { value, ...restField }, fieldState }) => {
                                        return (
                                            <FieldComponent
                                                isRequired
                                                isShowMessage={!!fieldState?.error}
                                                message={fieldState?.error?.message}
                                                text={'Ngày yêu cầu'}>
                                                <DatePicker
                                                    {...restField}
                                                    format={'DD/MM/YYYY'}
                                                    value={value}
                                                    style={{ width: '100%' }}
                                                    placeholder="Chọn ngày"
                                                />
                                            </FieldComponent>
                                        );
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <Controller
                                    control={formMethods.control}
                                    name="requestTime"
                                    render={({ field: { value, ...restField }, fieldState }) => {
                                        return (
                                            <FieldComponent
                                                isRequired
                                                isShowMessage={!!fieldState?.error}
                                                message={fieldState?.error?.message}
                                                text={'Giờ yêu cầu'}>
                                                <TimePicker
                                                    {...restField}
                                                    onChange={(time) => {
                                                        if (time) {
                                                            // Chuyển đổi giá trị từ dayjs về HHmm
                                                            restField.onChange(time.format('HHmm'));
                                                        } else {
                                                            restField.onChange(undefined);
                                                        }
                                                    }}
                                                    style={{ width: '100%' }}
                                                    placeholder="Chọn giờ"
                                                    format={'HH:mm'}
                                                    value={value ? dayjs(value, 'HHmm') : undefined} // Chuyển đổi giá trị từ HHmm sang dayjs
                                                />
                                            </FieldComponent>
                                        );
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={24}>
                                <div className="flex justify-end">
                                    {PDFDownloadLink && isValid && (
                                        <PDFDownloadLink
                                            document={<PdfComponent constructionName={watchConstructionName}
                                                                    suppliesType={watchSuppliesType}
                                                                    requestDate={dayjs(watchRequestDate)}
                                                                    requestTime={dayjs(watchRequestTime, 'HHmm')}
                                                                    volume={watchVolume} />}
                                            fileName="yeu-cau-vat-tu.pdf"
                                            style={{
                                                textDecoration: 'none',
                                                padding: '10px 20px',
                                                color: '#fff',
                                                backgroundColor: '#0070f3',
                                                border: 'none',
                                                borderRadius: '4px'
                                            }}
                                        >
                                            {({ loading }: { loading: boolean }) =>
                                                loading ? 'Đang tạo PDF...' : 'Tải xuống file'
                                            }
                                        </PDFDownloadLink>)}
                                </div>
                            </Col>
                        </Row>
                    </FormProvider>
                </form>
            </main>
        </div>
    );
}
