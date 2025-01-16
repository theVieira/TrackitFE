import { z } from 'zod'

const editProfileSchema = z.object({
	name: z.string().nonempty().min(3).max(60),
	password: z.string().nonempty().min(6).max(60),
	avatar: z.instanceof(FileList),
})

export type EditProfileSchema = z.infer<typeof editProfileSchema>

export { editProfileSchema }
