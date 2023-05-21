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

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

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
              <div
                onClick={() => {
                  setSelectedContinent('option#1');
                  toggleDropdown();
                }}
              >
                Option #1
              </div>
              <div
                onClick={() => {
                  setSelectedContinent('option#2');
                  toggleDropdown();
                }}
              >
                Option #2
              </div>
              <div
                onClick={() => {
                  setSelectedContinent('option#3');
                  toggleDropdown();
                }}
              >
                Option #3
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
