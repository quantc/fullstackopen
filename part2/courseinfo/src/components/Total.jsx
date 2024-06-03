const Total = ({ parts }) => {
  const total = parts.reduce((sum, item) => sum + item.exercises, 0)

  return (
    <p>
      <b>Total of exercises {total}</b>
    </p>
  )
}

export default Total
