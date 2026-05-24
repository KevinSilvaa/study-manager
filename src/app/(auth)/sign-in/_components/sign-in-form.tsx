"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FormProvider } from "@/components/form/form-provider";
import { Input } from "@/components/form/input";
import Checkbox from "@/components/form/checkbox";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { signInAction } from "../actions";
import { ErrorCodes } from "@/utils/error-codes";
import { formatToPascalCase } from "@/utils/functions/format-to-pascal-case";
import { toast } from "sonner";

const signInFormSchema = z.object({
  email: z.email({ error: "Invalid email." }),
  password: z
    .string({ error: "Invalid password." })
    .min(8, { error: "Password must have at least 8 characters" }),
  rememberPassword: z.boolean(),
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;

export function SignInForm() {
  const router = useRouter();

  const t = useTranslations();

  const methods = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberPassword: false
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function handleSignInFormSubmit(formValues: SignInFormSchema) {
    try {
      const signInResponse = await signInAction(formValues);

      if (signInResponse.success) {
        toast.success(`${t("Toast.Success")}!`, {
          description: t("Toast.SuccessCodes.SignedInSuccessfully"),
        });

        router.push("/");
      } else {
        switch (signInResponse.error) {
          case ErrorCodes.InvalidCredentials:
            const formattedInvalidCredentialsError = formatToPascalCase(
              ErrorCodes.InvalidCredentials,
            );

            return toast.error(`${t("Toast.Error")}!`, {
              description: t(
                `Toast.ErrorCodes.${formattedInvalidCredentialsError}`,
              ),
            });
          case ErrorCodes.InternalServerError:
            const formattedInternalServerErrorError = formatToPascalCase(
              ErrorCodes.InternalServerError,
            );

            return toast.error(`${t("Toast.Error")}!`, {
              description: t(
                `Toast.ErrorCodes.${formattedInternalServerErrorError}`,
              ),
            });
          default:
            const formattedUnknownErrorError = formatToPascalCase(
              ErrorCodes.UnknownError,
            );

            return toast.error(`${t("Toast.Error")}!`, {
              description: t(`Toast.ErrorCodes.${formattedUnknownErrorError}`),
            });
        }
      }
    } catch (error) {
      toast.error("An error occurred. Try again later.");
    }
  }

  return (
    <FormProvider
      methods={methods}
      onSubmit={handleSubmit(handleSignInFormSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Input
          id="email"
          name="email"
          type="email"
          // startContent={<Mail className="size-5 text-brand" />}
          label={t("SignInPage.Form.InputLabel.Email")}
          placeholder={t("SignInPage.Form.EmailInputPlaceholder")}
        />

        <Input
          id="password"
          name="password"
          type="password"
          // startContent={<Lock className="size-5 text-brand" />}
          label={t("SignInPage.Form.InputLabel.Password")}
          placeholder={t("SignInPage.Form.PasswordInputPlaceholder")}
        />
      </div>

      <div className="flex items-center justify-between">
        <Checkbox
          id="rememberPassword"
          name="rememberPassword"
          label={t("SignInPage.Form.RememberPassword")}
        />

        {/* <Link
          href="/forgot-password"
          className="text-sm text-brand hover:underline"
        >
          {t("SignInPage.Form.ForgotMyPassword")}
        </Link> */}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {t("SignInPage.Form.Buttons.SignIn")}
      </Button>
    </FormProvider>
  );
}
