import * as Yup from 'yup';

export enum ESUPPLIES_TYPE {
    BE_TONG = 'BE_TONG',
    DAU_DIESEL = 'DAU_DIESEL',
}

export const LIST_SUPPLIES_TYPE = [
    { label: 'Bê Tông thân trụ T1L', value: ESUPPLIES_TYPE.BE_TONG },
    { label: 'Dầu Diesel', value: ESUPPLIES_TYPE.DAU_DIESEL }
];

export const validateSchemaSuppliesForm = Yup.object().shape({
    constructionName: Yup.string().required('Vui lòng nhập thông tin này'),
    suppliesType: Yup.string().required('Vui lòng chọn thông tin này'),
    requestDate: Yup.string().required('Vui lòng nhập thông tin này'),
    requestTime: Yup.string().required('Vui lòng nhập thông tin này'),
    volume: Yup.number().required('Vui lòng nhập thông tin này').min(1, 'Giá trị nhập phải lớn hơn 0')
});

export const TEST = {
    [ESUPPLIES_TYPE.BE_TONG]: 'm3',
    [ESUPPLIES_TYPE.DAU_DIESEL]: 'Lít'
};