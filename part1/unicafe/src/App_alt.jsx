import { useState } from "react"

const App = () => {
  const labels = { goodLabel: "good", neutralLabel: "neutral", badLabel: "bad" }
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <Display title="Give feedback" />
      <Button onSmash={() => setGood(good + 1)} text={labels.goodLabel} />
      <Button
        onSmash={() => setNeutral(neutral + 1)}
        text={labels.neutralLabel}
      />
      <Button onSmash={() => setBad(bad + 1)} text={labels.badLabel} />
      <Statistics good={good} neutral={neutral} bad={bad} labels={labels} />
    </>
  )
}

export default App

const Statistics = ({ good, neutral, bad, labels }) => {
  const total = good + neutral + bad

  const roundNumber = (value, decimalPlaces) => {
    return Number(
      Math.round(parseFloat(value + "e" + decimalPlaces)) + "e-" + decimalPlaces
    )
  }

  if (total === 0) {
    return (
      <div>
        <Display title="Statistics" />
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <>
      <Display title="Statistics" />
      <table>
        <tbody>
          <StatisticLine label={labels.goodLabel} value={good} />
          <StatisticLine label={labels.neutralLabel} value={neutral} />
          <StatisticLine label={labels.badLabel} value={bad} />
          <StatisticLine label="all" value={total} />
          <StatisticLine
            label="average"
            value={roundNumber((good - bad) / total, 2)}
          />
          <StatisticLine
            label="positive"
            value={roundNumber((good * 100) / total, 2) + "%"}
          />
        </tbody>
      </table>
    </>
  )
}

const Button = ({ onSmash, text }) => {
  return <button onClick={onSmash}>{text}</button>
}

const Display = ({ title }) => <h2>{title}</h2>

const StatisticLine = ({ label, value }) => {
  return (
    <tr>
      <td>{label}</td>
      <td>{value}</td>
    </tr>
  )
}
