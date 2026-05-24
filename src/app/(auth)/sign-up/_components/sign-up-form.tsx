"use client";

import Checkbox from "@/components/form/checkbox";
import { FormProvider } from "@/components/form/form-provider";
import { Input } from "@/components/form/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { signUpAction } from "../actions";
import { ErrorCodes } from "@/utils/error-codes";
import { formatToPascalCase } from "@/utils/functions/format-to-pascal-case";

const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Name must have at least 4 characters." }),
    email: z.email(),
    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters." }),
    passwordConfirm: z
      .string()
      .min(8, { message: "Password must have at least 8 characters." }),
    acceptTerms: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords must be the same.",
        path: ["passwordConfirm"],
      });
    }

    if (!data.acceptTerms) {
      ctx.addIssue({
        code: "custom",
        message: "You must accept the terms.",
        path: ["acceptTerms"],
      });
    }
  });

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

export function SignUpForm() {
  const router = useRouter();

  const t = useTranslations();

  const methods = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      passwordConfirm: "",
      acceptTerms: false
    }
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  async function handleSignUpFormSubmit(formValues: SignUpFormSchema) {
    try {
      const signUpResponse = await signUpAction(formValues);

      if (signUpResponse.success) {
        toast.success(`${t("Toast.Success")}!`, {
          description: t("Toast.SuccessCodes.SignedUpSuccessfully"),
        });

        router.push("/sign-in");
      } else {
        switch (signUpResponse.error) {
          case ErrorCodes.UserWithSameEmailAlreadyExists:
            const formattedUserWithSameEmailAlreadyExistsError =
              formatToPascalCase(ErrorCodes.UserWithSameEmailAlreadyExists);

            return toast.error(`${t("Toast.Error")}!`, {
              description: t(
                `Toast.ErrorCodes.${formattedUserWithSameEmailAlreadyExistsError}`,
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
      onSubmit={handleSubmit(handleSignUpFormSubmit)}
      className="flex flex-col gap-4"
    >
      <div className="flex flex-col gap-2">
        <Input
          id="email"
          name="email"
          type="email"
          // startContent={<Mail className="size-5 text-brand" />}
          label={t("SignUpPage.Form.InputLabel.Email")}
          placeholder={t("SignUpPage.Form.EmailInputPlaceholder")}
        />

        <Input
          id="name"
          name="name"
          // startContent={<User className="size-5 text-brand" />}
          label={t("SignUpPage.Form.InputLabel.Name")}
          placeholder={t("SignUpPage.Form.NameInputPlaceholder")}
        />

        <div className="grid grid-cols-2 gap-2">
          <Input
            id="password"
            name="password"
            type="password"
            // startContent={<Lock className="size-5 text-brand" />}
            label={t("SignUpPage.Form.InputLabel.Password")}
            placeholder={t("SignUpPage.Form.PasswordInputPlaceholder")}
          />

          <Input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            // startContent={<Lock className="size-5 text-brand" />}
            label={t("SignUpPage.Form.InputLabel.ConfirmPassword")}
            placeholder={t("SignUpPage.Form.PasswordConfirmInputPlaceholder")}
          />
        </div>
      </div>

      <Checkbox
        id="acceptTerms"
        name="acceptTerms"
        label={t("SignUpPage.Form.InputLabel.AcceptTerms")}
      />

      <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
        {t("SignUpPage.Form.Buttons.SignUp")}
      </Button>
    </FormProvider>
  );
}
