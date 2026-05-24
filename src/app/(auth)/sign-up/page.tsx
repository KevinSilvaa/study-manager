import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SignUpForm } from "./_components/sign-up-form";

export default async function SignUpPage() {
  const t = await getTranslations();

  return (
    <div className="mx-auto flex max-h-screen w-full max-w-sm flex-col gap-8 py-20">
      <div className="flex flex-col gap-8 mt-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[28px] font-semibold leading-[42px] text-brand">
              {t("SignUpPage.SignUpAccount")}
            </h1>
            <span className="text-sm">
              {t("SignUpPage.AlreadyHaveAnAccount")}{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-brand hover:underline"
              >
                {t("SignUpPage.SignInNow")}
              </Link>
            </span>
          </div>

          <SignUpForm />
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/terms-of-use"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            {t("SignUpPage.Terms.TermsOfUse")}
            <ArrowRight className="size-4 text-brand" />
          </Link>

          <Link
            href="/privacy-policy"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            {t("SignUpPage.Terms.PrivacyPolicy")}
            <ArrowRight className="size-4 text-brand" />
          </Link>
        </div>
      </div>
    </div>
  );
}
