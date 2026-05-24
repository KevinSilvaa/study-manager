"use client";

import { setUserLocale } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { BrazilFlagIcon } from "public/icons/brazil-flag";
import { UnitedStatesFlagIcon } from "public/icons/united-states-flag";
import { SpainFlagIcon } from "public/icons/spain-flag";

export function LanguageSwitcher() {
  const locale = useLocale();

  const router = useRouter();

  const dropdownMenuItems = [
    {
      label: "Português",
      value: "pt-BR",
      icon: <BrazilFlagIcon />,
    },
    {
      label: "English",
      value: "en",
      icon: <UnitedStatesFlagIcon />,
    },
    {
      label: "Español",
      value: "es",
      icon: <SpainFlagIcon />,
    },
  ];

  const actualLanguage = dropdownMenuItems.find(
    (item) => item.value === locale,
  );

  async function handleChangeLanguage(locale: "en" | "ptbr" | "es") {
    await setUserLocale(locale);

    router.refresh();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-40" asChild>
        <Button variant="outline">
          {actualLanguage?.icon}
          {actualLanguage?.label}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup aria-label="Dropdown menu with icons">
          {dropdownMenuItems.map((item) => (
            <DropdownMenuItem
              key={item.value}
              onClick={() =>
                handleChangeLanguage(item.value as "ptbr" | "en" | "es")
              }
            >
              {item.icon}
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
