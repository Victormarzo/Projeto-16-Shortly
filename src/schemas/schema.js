import joi from 'joi';

const signUpSchema = joi.object({
    name:joi.string()
        .empty()
        .required()
        .trim(),
    email:joi.string()
        .required()
        .email(),
    password:joi.string()
        .required(),
    confirmPassword:joi.ref('password')
        
});

const signInSchema= joi.object({
    email:joi.string()
        .required()
        .email(),
    password:joi.string()
        .required(),
});

const urlSchema=joi.object({
    url:joi.string()
        .pattern(new RegExp(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/))
        .required()
});

export{signUpSchema,signInSchema,urlSchema};