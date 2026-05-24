import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SignInForm } from "./_components/sign-in-form";
import { getTranslations } from "next-intl/server";

export default async function SignInPage() {
  const t = await getTranslations();

  return (
    <div className="mx-auto flex max-h-screen w-full max-w-sm flex-col gap-8 py-20">
      <div className="flex flex-col gap-8 mt-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1.5">
            <h1 className="text-[28px] font-semibold leading-10.5 text-brand">
              {t("SignInPage.SignInAccount")}
            </h1>
            <span className="text-sm">
              {t("SignInPage.DontHaveAnAccount")}{" "}
              <Link
                href="/sign-up"
                className="font-semibold text-brand hover:underline"
              >
                {t("SignInPage.CreateNow")}
              </Link>
            </span>
          </div>

          <SignInForm />
        </div>

        <div className="flex items-center justify-between">
          <Link
            href="/terms-of-use"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            {t("SignInPage.Terms.TermsOfUse")}
            <ArrowRight className="size-4 text-brand" />
          </Link>

          <Link
            href="/privacy-policy"
            className="flex items-center gap-2 text-sm hover:underline"
          >
            {t("SignInPage.Terms.PrivacyPolicy")}
            <ArrowRight className="size-4 text-brand" />
          </Link>
        </div>
      </div>
    </div>
  );
}
