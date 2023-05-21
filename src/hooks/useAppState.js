import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
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

export default function useAppState() {
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
    setCountriesRes([]);

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
        let apiRes;
        try {
          apiRes = await axios
            .get(`https://restcountries.com/v3.1/name/${randCountry.name}`)
            .then((res) => {
              return res;
            })
            .catch((err) => {
              console.log(err);
            });
          countryWithDetails = apiRes.data[0];
        } catch (err) {
          console.log(err);
        }

        isDuplicate = duplicateExists(countryWithDetails);
      }

      randomCountries.push(countryWithDetails);
    }

    setCountriesRes([...randomCountries]);
  };

  const { loading, error, data } = useQuery(GET_COUNTRIES);

  return {
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
  };
}
