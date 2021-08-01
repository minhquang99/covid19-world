import { Grid } from '@material-ui/core'
import React from 'react'
import LineChart from '../Charts/LineChart'
import MapChart from '../Charts/MapChart'

export default function Summary() {
    return (
        <Grid container spacing={3}>
            <Grid sm={8} xs={12}>
                <LineChart />
            </Grid>
            <Grid sm={4} xs={12}>
                <MapChart />
            </Grid>

        </Grid>
    )
}
