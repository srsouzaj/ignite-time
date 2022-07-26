import { differenceInSeconds } from 'date-fns'
import React from 'react'
import { CountdownContainer, Separator } from './styles'

export const CountDown = () => {
  const [amountSecondsPassed, setAmountSecondsPassed] =
    React.useState<number>(0)
  const totalSecond = activeCycle ? activeCycle.minutesAmout * 60 : 0

  React.useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifferents: number = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifferents >= totalSecond) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              } else {
                return cycle;
              }
            })
          );
          setAmountSecondsPassed(totalSecond);
          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifferents);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, activeCycleId, totalSecond]);

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
