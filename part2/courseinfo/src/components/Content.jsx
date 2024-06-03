import Part from "./Part"

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} number={part.name} exercises={part.exercises} />
      ))}
    </>
  )
}

export default Content
