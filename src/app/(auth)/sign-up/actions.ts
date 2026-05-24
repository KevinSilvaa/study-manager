'use server'

import type { SignUpFormSchema } from "./_components/sign-up-form";
import { ErrorCodes } from "@/utils/error-codes";
import { hash } from "bcryptjs";
import { AuthError } from "@auth/core/errors";
import prisma from "prisma/prisma";

export async function signUpAction(formValues: SignUpFormSchema) {
  try {
    const userWithSameEmail = await prisma.user.findFirst({
      where: {
        email: formValues.email
      }
    })

    if (userWithSameEmail) {
      return {
        success: false,
        message: "User with same email already exits.",
        error: ErrorCodes.UserWithSameEmailAlreadyExists
      }
    }

    const passwordHashed = await hash(formValues.password, 6)

    console.log(formValues)

    await prisma.user.create({
      data: {
        username: formValues.name,
        email: formValues.email,
        password: passwordHashed,
      }
    })

    return {
      success: true,
      message: 'Signed up successfully',
      error: null
    }
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        success: false,
        message: null,
        error: error.cause as unknown as string
      }
    }

    return {
      success: false,
      message: null,
      error: ErrorCodes.InternalServerError
    }
  }
}
