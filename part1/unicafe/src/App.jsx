import { useState } from 'react';

const Title = ({ text }) => <h1>{text}</h1>;

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr><td>{ text }:</td><td>{value}</td></tr>  
  )
  
}

const Statistics = ({ good, neutral, bad}) => {

  const allReviews = good + neutral + bad


  if (allReviews === 0){
    return (
      <div>
        <p>No Reviews</p>
      </div>
    )
  }



  const average = (good - bad) / allReviews;
  const positive = (good / allReviews) * 100 + '%';

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="Good" value={good}/>
          <StatisticLine text="Neutral" value={neutral}/>
          <StatisticLine text="Bad" value={bad}/>
          <StatisticLine text="Total Reviews" value={allReviews}/>
          <StatisticLine text="Average Reviews" value={average}/>
          <StatisticLine text="Positive" value={positive}/>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const submitGoodReview = () => {
    setGood(good + 1);

  };

  const submitNeutralReview = () => {
    setNeutral(neutral + 1);
  };

  const submitBadReview = () => {
    setBad(bad + 1);
  };



  return (
    <div>
      <Title text="UniCafe reviews" />
      <Button handleClick={submitGoodReview} text="Good :D"/>
      <Button handleClick={submitNeutralReview} text="Neutral :|"/>
      <Button handleClick={submitBadReview} text="Bad :C"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  );
};

export default App;