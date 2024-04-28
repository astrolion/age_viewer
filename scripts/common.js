/**
 * Calculates the age based on the provided date of birth.
 * @param {string | Date} dateOfBirth The date of birth.
 * @returns {object} An object containing the calculated age or validation error.
 */
export default function calculateAge(dateOfBirth) {
    const validation = validateDateOfBirth(dateOfBirth);
    if (validation.error) {
        return validation;
    }

    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && currentDate.getDate() < birthDate.getDate())) {
        years--;
        months += 12;
    }

    if (months < 0) {
        months += 12;
    }

    if (days < 0) {
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
        days += lastMonth.getDate();
        months--;
    }

    return {
        error: false,
        message: "",
        years,
        months,
        days,
        ageInTextFormat: `${years} years ${months} months ${days} days`
    };
}

/**
 * Validates that the inputted date of birth does not exceed today's date.
 * @param {string} dateOfBirth The inputted date of birth string in "YYYY-MM-DD" format.
 * @returns {object} An object containing the validation result.
 */
function validateDateOfBirth(dateOfBirth) {
    const result = { error: false, message: '' };
    const dob = new Date(dateOfBirth);

    if (isNaN(dob.getTime())) {
        result.error = true;
        result.message = 'Invalid date format.';
        return result;
    }

    const today = new Date();
    if (dob > today) {
        result.error = true;
        result.message = 'Date of birth cannot be in the future.';
    }

    return result;
}