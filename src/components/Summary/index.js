import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import LineChart from '../Charts/LineChart'
import MapChart from '../Charts/MapChart'

export default function Summary({ reports, selectedCountryID }) {

    const [ mapData, setMapData] = useState({});
    console.log(selectedCountryID);

    useEffect(() => {
        if (selectedCountryID) {
            import(
                `@highcharts/map-collection/countries/${selectedCountryID}/${selectedCountryID}-all.geo.json`
            ).then(res => setMapData(res));
        };
    }, [selectedCountryID]);

    return (
        <Grid container spacing={3}>
            <Grid sm={8} xs={12}>
                <LineChart data={reports}/>
            </Grid>
            <Grid sm={4} xs={12}>
                <MapChart mapData={mapData}/>
            </Grid>

        </Grid>
    )
}
