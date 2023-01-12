import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as api from '../api';

const Nav = () => {
const [topics, setTopics] = useState(['coding', 'football', 'cooking']);
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);

const navigate = useNavigate();

useEffect(() => {
  setApiError(false);
  setIsLoading(true);
  api.fetchTopics()
  .then(({topics}) => {
    setIsLoading(false);
    setTopics(topics);
  })
  .catch(() => {
    setIsLoading(false);
    setApiError(true);
  });
}, []);

return(
    <nav>
      <Link to="/">Home</Link>
      <Link to="articles">All articles</Link>
      {isLoading && <p className="nav__loading">Fetching topics</p>}
      {!isLoading && !apiError && <div className="nav__topics">
       <p> Articles by topic</p>
        {topics.map(({slug}, index) => {
          return <button key={index} id={slug} onClick={e => navigate(`articles?topic=${e.target.id}`)} className="nav__topic-li">{slug}</button>
        })}
      </div>}
    </nav>
  )
};

export default Nav;