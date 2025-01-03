// Libraries
import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface FieldComponentProps {
    [key: string]: unknown;
    isRequired?: boolean;
    text: React.ReactNode;
    children: React.ReactNode;
    message?: string;
    isShowMessage?: boolean;
    isShowTooltip?: boolean;
    tooltipMessage?: string | React.ReactNode;
    className?: string;
    wrapperClassname?: string;
    messageClassName?: string;
    renderErrorMessage?: () => React.ReactNode;
    isResizeWhenShowError?: boolean;
    iconTooltip?: any;
}

export const FieldComponent: React.FC<FieldComponentProps> = (props) => {
    const {
        children,
        message,
        isShowMessage,
        wrapperClassname = '',
        className,
        messageClassName,
        isRequired,
        text,
        renderErrorMessage,
        isShowTooltip,
        tooltipMessage,
        isResizeWhenShowError = true,
        iconTooltip = <QuestionCircleOutlined />,
    } = props;
    return (
        <div className={`${isResizeWhenShowError ? '' : 'relative'} ${wrapperClassname} space-y-[1px]`}>
            {text ? (
                <span className={`flex flex-row items-center ${className}`}>
                    {isRequired && <i style={{ color: '#FF7875', marginRight: 5 }}>*</i>}
                    <span className={'mr-[5px]'} style={{ fontWeight: 400, color: 'rgb(0 0 0 / var(--tw-text-opacity, 1))' }}>
                        {text}
                    </span>
                    {isShowTooltip && (
                        <Tooltip
                            className={'cursor-pointer'}
                            overlayStyle={typeof tooltipMessage !== 'string' ? { maxWidth: '500px' } : undefined}
                            placement="bottomLeft"
                            title={tooltipMessage}
                        >
                            {React.cloneElement(iconTooltip, {
                                style: {
                                    opacity: 0.45,
                                },
                            })}
                        </Tooltip>
                    )}
                </span>
            ) : null}
            {children}
            <div
                className={`transition-all ${
                    isResizeWhenShowError ? 'ml-[5px]' : 'absolute left-2 '
                } overflow-hidden text-ellipsis duration-200 ${isShowMessage ? 'max-h-[120px]' : 'max-h-0'}`}
            >
                {typeof renderErrorMessage === 'function' ? (
                    renderErrorMessage()
                ) : (
                    <span
                        className={`max-w-full text-ellipsis overflow-hidden font-normal -bottom-4 text-[#FF4D4F] ${messageClassName}`}
                    >
                        {message}
                    </span>
                )}
            </div>
        </div>
    );
};

export default FieldComponent;
