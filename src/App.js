import CountrySelector from "./components/CountrySelector";
import HighLight from "./components/HighLight";
import Summary from "./components/Summary";
import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis/index";
import './App.css';
import '@fontsource/roboto';
import { Container, Typography } from "@material-ui/core";
import { sortBy } from "lodash";
import moment from "moment";
import 'moment/locale/vi';

moment.locale('vn');


function App() {

  const [ countries, setCountries ] = useState([]);
  const [ selectedCountryID, setSelectedCountryID ] = useState('');
  const [ reports, setReports ] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
       //axios là 1 promise => cần then() để lấy data trả về
      
      //sort tên quốc gia theo abc
      const sortCountry = sortBy(res.data, 'Country');

      setCountries(sortCountry);

      //mặc định VN khi render web
      setSelectedCountryID('vn');
    });
  }, []); //gọi API 1 lần duy nhất khi component được render lần đầu

  const handleOnChange = (e) => {
    setSelectedCountryID(e.target.value);
  };
    //const country = countries.find((country) => country.ISO2 === e.target.value);
    //object destructring để lấy ra field Slug
  useEffect(() => {
    if (selectedCountryID) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryID
      );
      getReportByCountry(Slug).then((res) => {
        res.data.pop();
        setReports(res.data)
      });
    }
    }, [countries, selectedCountryID]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h3" component="h3">TRA CỨU COVID-19 THẾ GIỚI</Typography>
      <Typography>{ moment().format('LLL') }</Typography>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryID}/>
      <p></p>
      <HighLight reports={reports}/>

      <Summary reports={reports} selectedCountryID={selectedCountryID}/>
    </Container>
  );
}

export default App;