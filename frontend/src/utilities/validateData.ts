import * as z from "zod"

export const RegisterSchema=z.object({
    email:z
        .string({required_error:"Email is required"})
        .email({message:"Invalid email address"}),
    firstname:z.string({required_error:"Name is required"}),
    password:z
        .string({required_error:"Password is required"})
        .min(1,"le mot de passe qdoit avoir au moins 8 caractere")

})