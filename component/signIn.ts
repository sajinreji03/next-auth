"use server"
import bcrypt from 'bcrypt';
import { signIn } from '@/auth';
import { prisma } from '@lib/prisma';

export const CredentialSignIn = async (email: string, password: string) => {
    console.log("email=", email);
    console.log("password=", password);

    const user = await prisma.user.findFirst({
        where: { email },
    });
    console.log("user=", user);

    if (!user) {
        return { message: "User not found", status: 400 };
    }

    const hash = user?.password as string;
    if (!hash) {
        console.error("No password hash found for the user:", email);
        return { message: "Invalid credentials", status: 400 };
    }
    const match = bcrypt.compareSync(password, hash);

    if (!match) {
        return { message: "Invalid credentials", status: 400 };
    }

    return await signIn("credentials", { email, password, redirect: false });
};
