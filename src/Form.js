import React from 'react';

import './Form.css';

export default function Form({
  handleSubmit,
  toggleDropdown,
  selectedContinent,
  dropdownOpen,
  continents,
  number,
  setSelectedContinent,
  handleNumberChange,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <section className='dropdown-wrapper'>
        <span className='label'>Choose a continent</span>
        <div className='dropdown-container'>
          <div className='dropdown-header' onClick={toggleDropdown}>
            {selectedContinent === '' ? '...' : selectedContinent}
          </div>
          {dropdownOpen && (
            <div className='dropdown-list'>
              {continents.map((continent) => (
                <div
                  className='dropdown-item'
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
      </section>
      <div className='input-wrapper'>
        <label className='label'>
          Pick a number (2-10){' '}
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
  );
}
