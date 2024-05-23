const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }

  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
    <Header courseName={course}/>
    <Content data={[part1, part2, part3]}/>
    <Total count={part1.exercises + part2.exercises + part3.exercises}/>        
    </div>
  )
}

const Header =(props) => {
  return <h1>{props.courseName}</h1>
}

const Part = (props) => {
  return <p>OK: {props.number} {props.exercises}</p>
}

const Content = (props) => {

  return <>
    <Part number={props.data[0].name} exercises={props.data[0].exercises}/>
    <Part number={props.data[1].name} exercises={props.data[1].exercises}/>
    <Part number={props.data[2].name} exercises={props.data[2].exercises}/>
    </>
}

const Total = (props) => {
  return <p>Number of exercises {props.count}</p>
}

export default App