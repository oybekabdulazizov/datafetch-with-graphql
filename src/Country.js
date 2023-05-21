import React from 'react';

import './Country.css';

export default function Country({
  name,
  capital,
  population,
  currencies,
  subregion,
  languages,
}) {
  return (
    <div className='country'>
      <span className='span'>Name: {name}</span>
      <span className='span'>Capital: {capital ? capital : ''}</span>
      <span className='span'>Population: {population}</span>
      <span className='span'>Currency: {currencies}</span>
      <span className='span'>Subregion: {subregion}</span>
      <span className='span'>Languages: {languages}</span>
    </div>
  );
}
