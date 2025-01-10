import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import {
	DEFAULT_LOCALE,
	SUPPORTED_LOCALES,
	LOCALE_COOKIE_NAME,
} from './locales'

export default getRequestConfig(async () => {
	const cookieLocale = (await cookies()).get(LOCALE_COOKIE_NAME)?.value
	const locale = cookieLocale || DEFAULT_LOCALE
	const finalLocale = SUPPORTED_LOCALES.includes(locale)
		? locale
		: DEFAULT_LOCALE

	return {
		locale: finalLocale,
		messages: (await import(`./messages/${finalLocale}.json`)).default,
	}
})
