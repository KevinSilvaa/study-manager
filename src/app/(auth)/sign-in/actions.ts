'use server'

import { ErrorCodes } from "@/utils/error-codes";
import { signIn } from "auth";
import type { SignInFormSchema } from "./_components/sign-in-form";

export async function signInAction(formValues: SignInFormSchema) {
  try {
    await signIn("credentials", {
      email: formValues.email,
      password: formValues.password,
      // TODO: USE REMEMBER PASSWORD WHEN THE USER SIGN IN
      // rememberPassword: formValues.rememberPassword,
      redirect: false,
    });

    return {
      success: true,
      message: null,
      error: null,
    }
  } catch (error) {
    if (error instanceof Error) {
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
