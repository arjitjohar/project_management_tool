/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AutocompleteProps, GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TaskUpdateFormInputValues = {
    title?: string;
    relatedTasks?: string;
    ES?: number;
    EF?: number;
    LS?: number;
    LF?: number;
    projectID?: string;
    duration?: number;
};
export declare type TaskUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    relatedTasks?: ValidationFunction<string>;
    ES?: ValidationFunction<number>;
    EF?: ValidationFunction<number>;
    LS?: ValidationFunction<number>;
    LF?: ValidationFunction<number>;
    projectID?: ValidationFunction<string>;
    duration?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TaskUpdateFormOverridesProps = {
    TaskUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    relatedTasks?: PrimitiveOverrideProps<TextFieldProps>;
    ES?: PrimitiveOverrideProps<TextFieldProps>;
    EF?: PrimitiveOverrideProps<TextFieldProps>;
    LS?: PrimitiveOverrideProps<TextFieldProps>;
    LF?: PrimitiveOverrideProps<TextFieldProps>;
    projectID?: PrimitiveOverrideProps<AutocompleteProps>;
    duration?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type TaskUpdateFormProps = React.PropsWithChildren<{
    overrides?: TaskUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    task?: any;
    onSubmit?: (fields: TaskUpdateFormInputValues) => TaskUpdateFormInputValues;
    onSuccess?: (fields: TaskUpdateFormInputValues) => void;
    onError?: (fields: TaskUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TaskUpdateFormInputValues) => TaskUpdateFormInputValues;
    onValidate?: TaskUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TaskUpdateForm(props: TaskUpdateFormProps): React.ReactElement;
