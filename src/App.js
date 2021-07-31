import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Chart from "./components/Chart";
import { useEffect, useState } from "react";
import { getCountries } from "./apis/api";


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
      <Chart />
    </div>
  );
}

export default App;
