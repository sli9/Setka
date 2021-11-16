
type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = (value) => {
    if (value) return undefined;
    return 'Field is required'
}

export const maxLengthCreator = (maxLength: number): FieldValidatorType => (value: string) => {
    if (value && value.length > maxLength) return `Max length could be of ${maxLength} symbols`;
    return undefined
}

