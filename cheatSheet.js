// class component
class App extends Component {
  static contextType = ThemeContext;

  state = {
    activities: null,
  }
}

// functional component
const App2 = () => {
  return (<div></div>);
}

// ts functional component
const LightBoxTwo: React.FC<LightBoxTwoProps> = (props) => { return () }


export default

// recursive await:

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

// Hook for input
import { useState } from 'react';

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(''),
    changeHandler: (e) => {
      setValue(e.target.value);
    },
  };
};

export default useInput;


// post call with authentication

static loginProxyUser = async (email, adminApiToken) => {
  const apiUrl = GlobalConfig.get(GlobalConfig.Key.API_URL);
  const kovaEnv = GlobalConfig.get(GlobalConfig.Key.KOVA_ENV);
  const postBody = { Email: email };
  const config = {
    headers: {
      Authorization: `Bearer ${adminApiToken}`,
      'Content-Type': 'application/json',
    },
  };
  const response = await axios.post(`${apiUrl}LoginProxyUser?kovaEnv=${kovaEnv}`, postBody, config);

  return response.data;
};

//
const funct = async () =>{
try {
  const thing = await asynccall();
} catch (err) {
  console.error(error);
}
}

