module.exports.handleValidationError = function(error){
    let errors = {};
    if (error.name === "ValidationError") {

        Object.keys(error.errors).forEach((key) => {
            errors[key] = error.errors[key].message;
        });
    
        return {
            status : 400,
            errors,
        };
    }
    errors['message'] = 'Internal Server Error';
    return {
        status : 500,
        errors,
    };    
}