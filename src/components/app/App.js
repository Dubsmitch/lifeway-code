import React, {useState, useEffect} from 'react';
import styles from './App.module.css';
import axios from 'axios';
import SearchBar from '../searchBar/SearchBar';
import Loading from '../../imgs/Loading.gif';
import { randomInteger } from './utils';
import Header from '../header/Header';


export const CharacterProfile = ({selectedCharacter}) => {

  const [loadingSpecies, setLoadingSpecies] = useState(false);
  const [speciesInfo, setSpeciesInfo] = useState(null);
  const [movies, setMovies] = useState(null);
  const [starships, setStarships] = useState(null);
  const [loadingShips, setLoadingShips] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(false);


  useEffect(() => {
    setSpeciesInfo(null);
    setLoadingMovies(true);
    fetchMovies();
    if (selectedCharacter?.starships[0]?.includes('http')) {
      setLoadingShips(true)
      fetchStarships()
    }
    if (selectedCharacter?.species[0]?.includes('http')) {
      setLoadingSpecies(true)
    }
  }, [selectedCharacter]);

  useEffect(() => {
    if(loadingSpecies) {
      fetchSpeciesInfo();
    }
  }, [loadingSpecies])

  const fetchMovies = async () => {  
    await Promise.all( selectedCharacter.films.map((page) => {
      return axios.get(`${page}`)
    })).then((res) => {
      const titles =  res.map((movie) => {
        return movie.data.title;
      })  
      setMovies(titles);
      setLoadingMovies(false)
    })
  }

  const fetchStarships = async () => {  
    await Promise.all( selectedCharacter.starships.map((page) => {
      return axios.get(`${page}`)
    })).then((res) => {
      const ships =  res.map((response) => {
        return response.data.name;
      })  
      setStarships(ships);
      setLoadingShips(false);
    })
  }

  const fetchSpeciesInfo = async () => {
    let results = await axios.get(selectedCharacter.species[0]);
    const speciesData = {
      average_height: `${results.data.average_height} cm`,
      average_lifespan: `${results.data.average_lifespan} years`,
      classification: results.data.classification,
      designation: results.data.designation,
      eye_colors: results.data.eye_colors,
      hair_colors: results.data.hair_colors,
      language: results.data.language,
      name: results.data.name,
      skin_colors: results.data.skin_colors,
    }
    setSpeciesInfo(speciesData);
    setLoadingSpecies(false);
  }

  const renderMovies = () => {
    return movies.map((movie) =>
      <p> {movie} </p>
    )
  }

  const renderShips = () => {
    return starships.map((ship) =>
      <p> {ship} </p>
    )
  }

  const renderCharacter = () => {
    let speciesKeys = null;
    let speciesKeysFormatted = null;
    if(speciesInfo) {
      speciesKeys = [...Object.keys(speciesInfo)];
      speciesKeysFormatted = speciesKeys.map((key) => {
        return key.replace('_', ' ');
      })
    }

    let speciesDivs = null;
    
    if(speciesKeys) {
      speciesDivs = speciesKeys.map((key, idx) => {
        return (
          <p> {speciesKeysFormatted[idx]}: {speciesInfo[key]} </p>
        )}
      )
    }

    return (
        <div className={styles.characterName}>
          {loadingMovies || loadingShips || loadingSpecies ? (<div> loading </div> ) : (
            <>
              <h1> {selectedCharacter.name} </h1>
              <div>
                <p> height: {selectedCharacter.height} cm </p>
                <p> weight: {selectedCharacter.mass} km </p>
                <p> hair color: {selectedCharacter.hair_color} </p>
                <p> year of birth: {selectedCharacter.birth_year} </p>
                
                {speciesDivs && (<>
                  {speciesDivs}
                </>)}
              </div>
              {movies && (
                <>
                  <h1> Movies </h1>
                  <div>
                    {renderMovies()}
                  </div>
                </>
              )}
              {starships && (
                <>
                  <h1> Ships </h1>
                  <div>
                    {renderShips()}
                  </div>
                </>
              )}
          </>
        )}
        </div>
    )
  }

  return (
    <div className={styles.CharacterProfile}>
      {loadingSpecies ? (
          <div> loading </div>

        ) : (
          <>
            {renderCharacter()}
          </> 
        )
      }
    </div>
  )
};



const App = () => {
  const [loading, setLoading] = useState(true);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0)
  const [characters, setCharacters] = useState([]);
  const [selectedCharacter, setCharacter] = useState('');

  useEffect(() => {
    testMe();
  }, [])

  useEffect(() => {
    if(loading) {
      setTimeout(() => {
        let randomNum = randomInteger(0,9)
        if(randomNum === loadingTextIndex) {
          randomNum = randomInteger(0,9)
        }
        setLoadingTextIndex(randomNum);
      }, 3000)
    }
  }, [loadingTextIndex]);

  const setSelectedCharacter = (character) => {
    setCharacter(character);
  }

  const loadingText = require('./loadingConfig.json');

  async function getSelectAllChars (url) { 
    if (url == null) {
      return []
    }
    let results = await axios.get(url)
    return [ ...results.data.results, ...await getSelectAllChars(results.data.next) ] // <-
  }

  const testMe = () => {
    getSelectAllChars('https://swapi.dev/api/people').then(secondOut, console.error);
  }

  const secondOut = (args) => {
    setCharacters(args);
    setLoading(false);
  }

  return (
    <div className={styles.App}>
      <Header />
      {loading ? (
        <div className={styles.loadingScreen}>
          <p>... {loadingText[loadingTextIndex]} ...</p>
          <img src={Loading} alt="loading..."/> 
        </div>  
      ) : (
        <header className="App-header">

          <SearchBar
            characters={characters}
            setCharacter={setSelectedCharacter}
            searchFields={['name']}
            selectedCharacter={selectedCharacter}
          />
          <p>
          </p>
          {selectedCharacter ?
            (
              <CharacterProfile selectedCharacter={selectedCharacter}/> 
            ) : (
              <div> Select Character </div>
            )
          }
        </header>
      )}
    </div>
  );
}

export default App;
