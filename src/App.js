import { gql, useQuery } from '@apollo/client';
import './App.css';

const GET_COUNTRIES = gql`
  {
    continents {
      code
      name
    }
    countries {
      code
      name
      continent {
        code
        name
      }
    }
    languages {
      code
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <h2>'Loading...'</h2>;
  if (error) return <h2>`Error! ${error.message}`</h2>;
  data.continents.map((continent) => {
    console.log(continent.name);
  });

  return <div className='App'></div>;
}

export default App;
