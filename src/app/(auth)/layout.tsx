import { LanguageSwitcher } from "@/components/language-switcher";
import Image from "next/image";
import type { ReactNode } from "react";
import authImageUrl from '../../../public/auth-image.png'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-[60%_1fr]">
      <div className="flex flex-col max-h-screen overflow-y-auto py-16 px-32">
        <div className="self-end">
          <LanguageSwitcher />
        </div>

        {children}
      </div>

      <div className="relative size-full max-h-screen">
        <Image
          src={authImageUrl}
          alt="Login image"
          fill
          priority
          className="hidden object-cover md:block"
        />
      </div>
    </div>
  );
}
