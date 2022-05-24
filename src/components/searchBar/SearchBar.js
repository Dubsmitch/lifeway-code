import React from 'react';
// import PropTypes from 'prop-types';
import useInput from '../../hooks';
import styles from './SearchBar.module.css';

/**
 * the Search Bar search fields can be updated to search for other fields on the 
 * character object. For example adding 'eye_color' as an additional entry into the 
 * searchFields param array will allow for the eye_color field to be searched.
 */

function SearchBar({
  characters,
  setCharacter,
  searchFields,
  selectedCharacter
}) {
  const { changeHandler: handleSearchChange, value: characterInfo } = useInput('');

  const showPossibleResults = () => {
    const filteredArray = [...characters];
    const queryString = characterInfo.toUpperCase();
    const matches = [];

    filteredArray.forEach((character) => {
      let ischaracterMatch = false;
      searchFields.forEach((field) => {
        const checkText = String(character[field]).toUpperCase();
        if (checkText.includes(queryString)) {
          ischaracterMatch = true;
        }
      });
      if (ischaracterMatch) {
        matches.push(character);
      }
    });
    // format matches for readability
    const formattedMatches = matches.map((match) => {
      const matchObj = {};
      matchObj.matchString = `${match.name}`;
      matchObj.match = match;

      return matchObj;
    });

    return formattedMatches.map((match) => {
      const currentcharacter = characters.find((character) => character.name === match.match.name);
      const isSelected = selectedCharacter.name === currentcharacter.name;
 
      return (
        <div key={match.matchString}>
          <div
            onClick={() => setCharacter(currentcharacter)}
            style={ isSelected ?
              {
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '10px'
              } : {

              }
            }
          >
            {match.matchString}
          </div>
        </div>
      );
    });
  };

  return (
    <div
      className={styles.SearchBar}
    >
      <form
        onSubmit={(e) => { e.preventDefault(); }}
      >
        <label htmlFor="characterInfo">
          Character Search:
          <input
            id="characterInfo"
            name="characterInfo"
            onChange={handleSearchChange}
            placeholder="Search Here"
            type="text"
            value={characterInfo}
          />
        </label>
      </form>
      <div className={styles.possibleResults}>
        {showPossibleResults()}
      </div>
    </div>
  );
}

// Search.propTypes = {
//   setLot: PropTypes.func.isRequired,
//   characters: PropTypes.array.isRequired,
// };

export default SearchBar;
