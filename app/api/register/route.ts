import bcrypt from "bcrypt"
import prisma from "@/libs/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const reqBody = await request.json()

    const { name, email, password } = reqBody;
 
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
        name, 
        email, 
        hashedPassword
        }
    })

    return NextResponse.json(user)
}
