import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import './App.css';
import axios from 'axios';

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
  const [selectedContinent, setSelectedContinent] = useState('');
  const [number, setNumber] = useState(
    Math.floor(Math.random() * (10 - 2) + 2)
  );
  const [countriesRes, setCountriesRes] = useState([]);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedContinent === '') {
      alert('Please choose a continent!');
      return;
    }

    const selectedContinentCountries = data.countries.filter(
      (country) => country.continent.name === selectedContinent
    );

    const randomCountries = [];

    for (let index = 0; index < number; index++) {
      let randIdx = Math.floor(
        Math.random() * selectedContinentCountries.length
      );

      function duplicateExists(countryWithDetails) {
        return randomCountries.some(
          ({ name }) => name['common'] === countryWithDetails.name['common']
        );
      }

      const randCountry = selectedContinentCountries[randIdx];
      let countryWithDetails;
      let isDuplicate = true;
      while (isDuplicate) {
        countryWithDetails = await axios
          .get(`https://restcountries.com/v3.1/name/${randCountry.name}`)
          .then((res) => {
            return res.data[0];
          })
          .catch((err) => {
            return err;
          });
        isDuplicate = duplicateExists(countryWithDetails);
      }
      randomCountries.push(countryWithDetails);
    }
    setCountriesRes([...randomCountries]);
  };

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! {error.message}</h2>;
  const { continents } = data;

  const getLanguages = (object) => {
    let languages = '';
    for (const key in object) {
      languages += `${object[key]}, `;
    }
    languages = languages.trim();
    return languages.slice(0, languages.length - 1);
  };

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <div className='dropdown-container'>
          <div className='dropdown-header' onClick={toggleDropdown}>
            {selectedContinent === ''
              ? 'Choose a continent'
              : selectedContinent}
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
          <label>
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
        <button type='submit'>Submit</button>
      </form>
      <section>
        <h2>
          Continent{': '}
          {selectedContinent === ''
            ? '(please choose a continent from the above dropdown menu)'
            : selectedContinent}
        </h2>
        <div>
          {countriesRes.map((country) => (
            <ul key={country.flag}>
              <li>Name: {country.name['common']}</li>
              <li>Capital: {country.capital[0]}</li>
              <li>Population: {country.population}</li>
              <li>
                Currency:{' '}
                {country.currencies[Object.keys(country.currencies)[0]]['name']}
              </li>
              <li>Subregion: {country.subregion}</li>
              <li>Languages: {getLanguages(country.languages)}</li>
            </ul>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
