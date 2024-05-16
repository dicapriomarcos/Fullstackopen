import { useState } from 'react'

const Button = ({text, handleClick}) => {
    return (
      <button onClick={handleClick}>
        {text}
      </button>
    )
}

const ShowAnecdote = ({anecdote}) => {
  return (
    <p>"{anecdote}"</p>    
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const [mostVoted, setMostVoted] = useState(0)

  const getAleatory = () => {

    const aleatory = Math.floor(Math.random() * anecdotes.length)

    if( aleatory === selected ){
      return getAleatory()
    }

    setSelected(aleatory)
    
  }

  const voteAnecdote = () => {

    const newVotes = [ ...votes]

    newVotes[selected] = newVotes[selected] + 1
 
    setVotes(newVotes)

    setMostVoted(newVotes.indexOf(Math.max(...newVotes)))
    
  }

  const ShowVotes = ({ votes }) => {
    return (
      <p>Has {votes} votes</p>
    )
  }

  const Title = ({text}) => {
    return(
      <h1>{text}</h1>
    )
  }

  const SubTitle = ({text}) => {
    return(
      <h2>{text}</h2>
    )
  }

  return (
    <div>
      <Title text='Anecdote of the day' />
      <ShowAnecdote anecdote={anecdotes[selected]} />
      <ShowVotes votes={votes[selected]} />
      <Button text='Vote 👍' handleClick={voteAnecdote} />
      <Button text='Next anecdote ⏭️' handleClick={getAleatory} />
      <SubTitle text='Anecdote With most votes' />
      <ShowAnecdote anecdote={anecdotes[mostVoted]} />
      <ShowVotes votes={votes[mostVoted]} />
    </div>
  )
}

export default App