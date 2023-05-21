import useAppState from './hooks/useAppState';

import Form from './Form';
import Countries from './Countries';

import './App.css';

export default function App() {
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
      <Countries
        selectedContinent={selectedContinent}
        countries={countriesRes}
      />
    </div>
  );
}
