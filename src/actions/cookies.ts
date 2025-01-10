'use server'

import { cookies } from 'next/headers'

interface IDeleteCookie {
	cookieName: string
}

export async function DeleteCookie({
	cookieName,
}: IDeleteCookie): Promise<void> {
	const Cookies = await cookies()

	Cookies.delete(cookieName)

	return
}

interface IGetCookie {
	cookieName: string
}

export async function GetCookie({
	cookieName,
}: IGetCookie): Promise<string | undefined> {
	const Cookies = await cookies()

	return Cookies.get(cookieName)?.value
}

interface ISaveCookie {
	cookieName: string
	cookieValue: string
}

export async function SaveCookie({
	cookieName,
	cookieValue,
}: ISaveCookie): Promise<void> {
	const Cookies = await cookies()

	Cookies.set(cookieName, cookieValue)

	return
}
