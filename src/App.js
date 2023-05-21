import { useState } from 'react';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedContinent, setSelectedContinent] =
    useState('Choose a continent');
  const [number, setNumber] = useState(
    Math.floor(Math.random() * (10 - 2) + 2)
  );

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <h2>'Loading...'</h2>;
  if (error) return <h2>`Error! ${error.message}`</h2>;
  const { continents, ountries } = data;

  return (
    <div className='App'>
      <form>
        <div className='dropdown-container'>
          <div className='dropdown-header' onClick={toggleDropdown}>
            {selectedContinent}
          </div>
          {dropdownOpen && (
            <div className='dropdown-list'>
              {continents.map((continent) => (
                <div
                  key={continent.code}
                  onClick={() => {
                    setSelectedContinent(continent.name);
                    toggleDropdown();
                  }}
                >
                  {continent.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label for='number'>
            Pick a number between 2 and 10{' '}
            <input
              type='number'
              value={number}
              onChange={handleNumberChange}
              min={2}
              max={10}
              placeholder='and type it here :)'
              style={{ width: '10em' }}
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default App;
