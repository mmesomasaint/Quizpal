import Timer from './timer'

export default function useCountdown({ startTime, quizTime }, onTimeout) {
  const CURRENT_TIME = Date.now()
  const USED_TIME = CURRENT_TIME - new Date(startTime)
  const REMAINING_TIME = startTime
    ? Math.abs(parseInt(quizTime) - USED_TIME)
    : parseInt(quizTime)

  return {
    Timer: () => <Timer number={REMAINING_TIME || 100} timeout={onTimeout} />,
  }
}
