
// Prevents user from creating a course with empty spaces as input
export const trimEmptyInput = (inputField) => {
    return inputField.replace(/\s/g, "").length === 0;
};
