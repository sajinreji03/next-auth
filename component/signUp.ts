"use server"
import bcrypt from 'bcrypt';
import { prisma } from '@lib/prisma';


export const Register = async (name : string, email : string, password : string) => {
       console.log(name,email,password);

    try{
        const checkUser = await prisma.user.findFirst({
            where: {
                email,
            },
    });
    if (checkUser) {
        return {message: "User already exists", status: 400}
    }
    
    const hash = bcrypt.hashSync(password, 10);
    await prisma.user.create({
        data: {
            name : name,
            email,
            password: hash,
        },
    });
    return {message: "User created successfully", status: 200}
} catch (error) {
    console.log(error);
    return {message: "Failed to Register, please try again", status: 400}
}
};