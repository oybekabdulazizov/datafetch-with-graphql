import React from 'react';

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
      <div className='dropdown-container'>
        <div className='dropdown-header' onClick={toggleDropdown}>
          {selectedContinent === '' ? 'Choose a continent' : selectedContinent}
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
  );
}
