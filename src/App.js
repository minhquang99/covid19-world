import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";
import { useEffect, useState } from "react";
import { getCountries } from "./apis/index";


function App() {

  const [ countries, setCountries ] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      console.log(res); //axios là 1 promise => cần then() để lấy data trả về
      setCountries(res.data);
    })
  }, []); //gọi API 1 lần duy nhất khi component được render lần đầu

  return (
    <div>
      <p>Covid App</p>
      <CountrySelector countries={countries}/>
      <HighLight />
      <Summary />
    </div>
  );
}

export default App;