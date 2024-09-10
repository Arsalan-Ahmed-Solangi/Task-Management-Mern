//****ImportingPackages****//
const joi = require("joi");


//****CreatingSchemaObject*******//
const createSchemaObject = (schema) => {
    return joi.object(schema);
}

//****ValidateRequest*****//
const validateRequest = (data, schema) => {
     schema = createSchemaObject(schema);
    return schema.validate(data,{ abortEarly: false });
}


module.exports = { validateRequest }