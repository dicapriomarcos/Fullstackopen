const Title = ({text}) => {
    return (
      <h2>{text}</h2>
    )
  }
  

const SubCourse = ({ part }) => {
    return (
        <p>{part.name} {part.exercises}</p>
    )
}

const Total = ({ parts }) => {

    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    if(  total > 0){
      return (
        <p><strong>Total of {total} exercises</strong></p>
      )
    }else{
      return (
        <p><strong>There are no exercises</strong></p>
      )
    }
  }


const Course = ({ course }) => {
  return (
    <div>
        <Title text={course.name} />
        {course.parts.map( part => {
            return (
                <SubCourse key={part.id} part={part} />
            )
        }
        )}
        <Total parts={course.parts} />
    </div>
  )
}

export default Course