import { newCycleFormValidationSchema } from '../schemas/newCycle.schema'
import * as zod from 'zod'

export type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
