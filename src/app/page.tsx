'use client';
import React, { useRef } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Row, Col, Select, DatePicker, TimePicker, InputNumber } from 'antd';

import { FieldComponent } from '@/component';

import { ESUPPLIES_TYPE, LIST_SUPPLIES_TYPE, validateSchemaSuppliesForm } from '@/constant';


interface IFormInput {
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

    const { formState } = formMethods;
    const { isValid } = formState;

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
                                    render={({ field: { ref, value, ...restField }, fieldState }) => {
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
                                    render={({ field: { ref, value, ...restField }, fieldState }) => {
                                        return (
                                            <FieldComponent
                                                isRequired
                                                isShowMessage={!!fieldState?.error}
                                                message={fieldState?.error?.message}
                                                text={'Loại vật tư / Nhiên liệu'}>
                                                <Select
                                                    {...restField}
                                                    value={value}
                                                    // showSearch
                                                    style={{ width: '100%' }}
                                                    placeholder="Chọn"
                                                    // optionFilterProp="label"
                                                    // filterSort={(optionA, optionB) =>
                                                    //     (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                    // }
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
                                    render={({ field: { ref, value, ...restField }, fieldState }) => {
                                        return (
                                            <FieldComponent
                                                isRequired
                                                isShowMessage={!!fieldState?.error}
                                                message={fieldState?.error?.message}
                                                text={'Khối lượng'}>
                                                <InputNumber style={{ width: '100%' }} {...restField} value={value} addonAfter={'$'}
                                                             defaultValue={1} />
                                            </FieldComponent>
                                        );
                                    }}
                                />
                            </Col>
                            <Col span={24}>
                                <Controller
                                    control={formMethods.control}
                                    name="requestDate"
                                    render={({ field: { ref, value, ...restField }, fieldState }) => {
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
                                    render={({ field: { ref, value, ...restField }, fieldState }) => {
                                        return (
                                            <FieldComponent
                                                isRequired
                                                isShowMessage={!!fieldState?.error}
                                                message={fieldState?.error?.message}
                                                text={'Giờ yêu cầu'}>
                                                <TimePicker
                                                    {...restField}
                                                    style={{ width: '100%' }}
                                                    placeholder="Chọn giờ"
                                                />
                                            </FieldComponent>
                                        );
                                    }}
                                />
                            </Col>
                        </Row>
                    </FormProvider>
                </form>
                {/*<Form*/}
                {/*    className="w-full max-w-xs flex flex-col gap-4"*/}
                {/*    validationBehavior="native"*/}
                {/*    onReset={() => setAction('reset')}*/}
                {/*    onSubmit={(e) => {*/}
                {/*        e.preventDefault();*/}
                {/*        const data = Object.fromEntries(new FormData(e.currentTarget));*/}

                {/*        setAction(`submit ${JSON.stringify(data)}`);*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Input*/}
                {/*        isRequired*/}
                {/*        errorMessage="Vui lòng nhập"*/}
                {/*        label="Tên công trình"*/}
                {/*        labelPlacement="outside"*/}
                {/*        name="name"*/}
                {/*        placeholder="Nhập tên công trình"*/}
                {/*        type="text"*/}
                {/*    />*/}

                {/*    <Select name="type_request" isRequired errorMessage="Vui lòng chọn" label="Loại yêu cầu"*/}
                {/*            labelPlacement="outside" placeholder="Chọn">*/}
                {/*        {LOAI_VAT_TU.map((item) => (*/}
                {/*            <SelectItem key={item.key}>{item.label}</SelectItem>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*    <Input*/}
                {/*        isRequired*/}
                {/*        errorMessage="Vui lòng nhập"*/}
                {/*        label="Hạng mục"*/}
                {/*        labelPlacement="outside"*/}
                {/*        name="type"*/}
                {/*        placeholder="Nhập hạng mục"*/}
                {/*        type="text"*/}
                {/*    />*/}
                {/*    <I18nProvider locale="en-GB">*/}
                {/*        <DatePicker*/}
                {/*            isRequired*/}
                {/*            hideTimeZone*/}
                {/*            showMonthAndYearPickers*/}
                {/*            defaultValue={now(getLocalTimeZone())}*/}
                {/*            minValue={now(getLocalTimeZone())}*/}
                {/*            labelPlacement={'outside'}*/}
                {/*            label="Ngày giờ yêu cầu"*/}
                {/*            errorMessage="Vui lòng chọn"*/}
                {/*            variant="flat"*/}
                {/*            name="date"*/}
                {/*            hourCycle={24}*/}
                {/*        />*/}
                {/*    </I18nProvider>*/}
                {/*    <div className="flex gap-2">*/}
                {/*        <Button color="primary" type="submit">*/}
                {/*            Submit*/}
                {/*        </Button>*/}
                {/*        <Button type="reset" variant="flat">*/}
                {/*            Reset*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*    {action && (*/}
                {/*        <div className="text-small text-default-500">*/}
                {/*            Action: <code>{action}</code>*/}
                {/*        </div>*/}
                {/*    )}*/}
                {/*</Form>*/}
            </main>
        </div>
    );
}
