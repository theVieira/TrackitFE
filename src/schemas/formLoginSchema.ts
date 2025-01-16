import { z } from 'zod'

const formLoginSchema = z.object({
	login: z.string().nonempty('O login é obrigatório'),
	password: z.string().nonempty('A senha é obrigatória'),
})

export type FormLoginSchema = z.infer<typeof formLoginSchema>

export { formLoginSchema }
