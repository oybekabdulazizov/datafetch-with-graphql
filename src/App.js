import useAppState from './hooks/useAppState';

import Form from './Form';

import './App.css';

function App() {
  const {
    countriesRes,
    data,
    dropdownOpen,
    error,
    loading,
    handleNumberChange,
    handleSubmit,
    number,
    selectedContinent,
    setSelectedContinent,
    toggleDropdown,
  } = useAppState();

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

  const getCurrencies = (object) => {
    let currencies = '';
    for (const key in object) {
      const innerObj = object[key];
      currencies += `${innerObj['name']}, `;
    }
    currencies = currencies.trim();
    return currencies.slice(0, currencies.length - 1);
  };

  return (
    <div className='App'>
      <Form
        handleSubmit={handleSubmit}
        toggleDropdown={toggleDropdown}
        selectedContinent={selectedContinent}
        dropdownOpen={dropdownOpen}
        continents={continents}
        setSelectedContinent={setSelectedContinent}
        number={number}
        handleNumberChange={handleNumberChange}
      />
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
              <li>Capital: {country.capital[0] ? country.capital[0] : ''}</li>
              <li>Population: {country.population}</li>
              <li>Currency: {getCurrencies(country.currencies)}</li>
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
