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



export{signUpSchema};