const Joi = require('@hapi/joi');

/* --- VALIDATION: registration user schema --- */
const registerUserValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(3)
            .max(255)
            .required(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required(),
        name: Joi.string()
            .max(255)
            .required(),
        surname: Joi.string()
            .max(255)
            .required(),
        a_type: Joi.number()
            .required(),
        zip: Joi.string()
            .max(20),
        city: Joi.string()
            .max(255),
        province: Joi.string()
            .max(255),
        nation: Joi.string()
            .max(255),
        street: Joi.string()
            .max(255),
        phone: Joi.string()
            .max(30),
        added_by: Joi.string()
            .required(),
    });
    return schema.validate(data);
}

/* --- VALIDATION: login user schema --- */
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string()
            .min(3)
            .max(255)
            .required(),
        password: Joi.string()
            .min(6)
            .max(1024)
            .required(),
    });
    return schema.validate(data);
}

/* --- VALIDATION: team user schema --- */
const teamValidation = (data) => {
    const schema = Joi.object({
        category: Joi.string()
            .min(3)
            .max(255)
            .required(),
        players: Joi.string()
            .required(),
        coach: Joi.string()
            .required(),
        tm: Joi.string()
            .required(),
        added_by: Joi.string()
            .required()
    });
    return schema.validate(data);
}

/* --- VALIDATION: user type schema --- */
const userTypeValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .required(), 
        type: Joi.number()
            .required(),
    });
    return schema.validate(data);
}

module.exports.registerUserValidation = registerUserValidation;
module.exports.loginValidation = loginValidation;
module.exports.teamValidation = teamValidation;
module.exports.userTypeValidation = userTypeValidation;

    
