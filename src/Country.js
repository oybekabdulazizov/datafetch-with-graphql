import React from 'react';

export default function Country({
  name,
  capital,
  population,
  currencies,
  subregion,
  languages,
}) {
  return (
    <ul>
      <li>Name: {name}</li>
      <li>Capital: {capital ? capital : ''}</li>
      <li>Population: {population}</li>
      <li>Currency: {currencies}</li>
      <li>Subregion: {subregion}</li>
      <li>Languages: {languages}</li>
    </ul>
  );
}
