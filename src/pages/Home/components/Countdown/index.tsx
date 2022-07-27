import { differenceInSeconds } from 'date-fns'
import React from 'react'
import { CyclesContext } from '../..'
import { CountdownContainer, Separator } from './styles'

export const CountDown = () => {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished } =
    React.useContext(CyclesContext)

  const [amountSecondsPassed, setAmountSecondsPassed] =
    React.useState<number>(0)
  const totalSecond = activeCycle ? activeCycle.minutesAmout * 60 : 0

  const currentSecond = activeCycle ? totalSecond - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSecond / 60)
  const secondAmound = currentSecond % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondAmound).padStart(2, '0')

  React.useEffect(() => {
    if (activeCycle) {
      document.title = `Ignite Time - ${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  React.useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifferents: number = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifferents >= totalSecond) {
          markCurrentCycleAsFinished()
          setAmountSecondsPassed(totalSecond)
          clearInterval(interval)
        } else {
          setAmountSecondsPassed(secondsDifferents)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, activeCycleId, markCurrentCycleAsFinished, totalSecond])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
