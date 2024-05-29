import { useState } from "react"

const App = () => {
  const labels = { goodLabel: "good", neutralLabel: "neutral", badLabel: "bad" }

  const [data, setData] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positives: 0,
  })

  const roundNumber = (value, decimalPlaces) => {
    return Number(
      Math.round(parseFloat(value + "e" + decimalPlaces)) + "e-" + decimalPlaces
    )
  }
  const updateAverage = ({ g, n, b }) => {
    const average = (g * 1 + n * 0 + b * -1) / (g + n + b)
    return roundNumber(average, 2)
  }

  const addGood = () => () => {
    const updatedGood = data.good + 1
    const updatedAll = updatedGood + data.neutral + data.bad

    const newData = {
      ...data,
      good: updatedGood,
      all: updatedAll,
      positives: roundNumber((updatedGood * 100) / updatedAll, 2),
      average: updateAverage({ g: updatedGood, n: data.neutral, b: data.bad }),
    }
    setData(newData)
  }

  const addNeutral = () => () => {
    const updatedNeutral = data.neutral + 1
    const updatedAll = data.good + updatedNeutral + data.bad

    const newData = {
      ...data,
      neutral: updatedNeutral,
      all: updatedAll,
      positives: roundNumber((data.good * 100) / updatedAll, 2),
      average: updateAverage({ g: data.good, n: updatedNeutral, b: data.bad }),
    }
    setData(newData)
  }

  const addBad = () => () => {
    const udpatedBad = data.bad + 1
    const updatedAll = data.good + data.neutral + udpatedBad

    const newData = {
      ...data,
      bad: udpatedBad,
      all: updatedAll,
      positives: roundNumber((data.good * 100) / updatedAll, 2),
      average: updateAverage({ g: data.good, n: data.neutral, b: udpatedBad }),
    }
    setData(newData)
  }

  return (
    <>
      <Display title="Give feedback" />
      <Button onSmash={addGood()} text={labels.goodLabel} />
      <Button onSmash={addNeutral()} text={labels.neutralLabel} />
      <Button onSmash={addBad()} text={labels.badLabel} />
      <Statistics title="Statistics" data={data} labels={labels} />
    </>
  )
}

export default App

const Statistics = ({ title, data, labels }) => {
  if (data.all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <Display title={title} />
      <table>
        <tbody>
          <StatisticLine text={labels.goodLabel} value={data.good} />
          <StatisticLine text={labels.neutralLabel} value={data.neutral} />
          <StatisticLine text={labels.badLabel} value={data.bad} />
          <StatisticLine text="all" value={data.all} />
          <StatisticLine text="average" value={data.average} />
          <StatisticLine text="positive" value={data.positives} extra="%" />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ onSmash, text }) => {
  return <button onClick={onSmash}>{text}</button>
}

const Display = ({ title }) => <h2>{title}</h2>

const StatisticLine = ({ text, value, extra }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {extra}
      </td>
    </tr>
  )
}
