import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './style'
import { FormProvider, useForm } from 'react-hook-form'

import React from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './components/NewCycleForm'
import { CountDown } from './components/Countdown'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

interface Cycle {
  id: string
  task: string
  minutesAmout: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextInterface {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
}

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O intervalo precisa ser de - no máximo - 5 minutos')
    .max(60, 'O intervalo precisa ser de - no máximo - 60 minutos'),
})

type NewCycleFormDataInterface = zod.infer<typeof newCycleFormValidationSchema>

// eslint-disable-next-line react-hooks/rules-of-hooks
const NewCycleForm = useForm<NewCycleFormDataInterface>({
  resolver: zodResolver(newCycleFormValidationSchema),
  defaultValues: {
    task: '',
    minutesAmount: 0,
  },
})

const { register, handleSubmit, watch, reset } = NewCycleForm

export const CyclesContext = React.createContext({
  activeCycle,
  activeCycleId,
  markCurrentCycleAsFinished,
} as CyclesContextInterface)

export function Home() {
  const [cycles, setCycles] = React.useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = React.useState<string | null>(null)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function handleCreateNewCycle(data: NewCycleFormDataInterface) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmout: data.minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    reset()
  }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  const task: string = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CyclesContext.Provider
          value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished }}
        >
          <FormProvider {...NewCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <CountDown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
