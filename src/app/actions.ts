'use server'

import { cookies } from "next/headers"

const COOKIE_NAME = 'NEXT_LOCALE'

export async function setUserLocale(locale: 'en' | 'ptbr' | 'es') {
  (await cookies()).set(COOKIE_NAME, locale)
}
