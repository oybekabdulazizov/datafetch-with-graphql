import React from 'react';
import Country from './Country';

export default function Countries({ selectedContinent, countries }) {
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
    <section>
      <h2>
        Continent{': '}
        {selectedContinent === ''
          ? '(please choose a continent from the above dropdown menu)'
          : selectedContinent}
      </h2>
      <div>
        {countries.map(
          (
            { name, capital, population, currencies, subregion, languages },
            idx
          ) => (
            <Country
              key={idx}
              name={name['common']}
              capital={capital[0]}
              population={population}
              currencies={getCurrencies(currencies)}
              subregion={subregion}
              languages={getLanguages(languages)}
            />
          )
        )}
      </div>
    </section>
  );
}
