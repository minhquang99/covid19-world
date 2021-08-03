import React from 'react'
import { Card, CardContent, makeStyles, Typography } from '@material-ui/core'
import CountUp from 'react-countup';

const useStyles = makeStyles(
    {
        wrapper: (props) => {
            if(props.type === 'confirmed') return { borderLeft: '5px solid red'};
            if(props.type === 'recovered') return { borderLeft: '5px solid green'};
            return { borderLeft: '5px solid gray'};
        },
        title: {
            fontSize: 18,
            marginBottom: 5
        },
        count: {
            fontWeight: 'bold',
            fontSize: 18
        }
    }
)

export default function HighLightCard({ title, count, type }) {

    const styles = useStyles({ type });

    return (
        <Card className={styles.wrapper}>
            <CardContent>
                <Typography className={styles.title} component='p' variant='body2'>
                    {title}
                </Typography>
                <Typography className={styles.count} component='span' variant='body2'>
                    <CountUp end={count} duration={2} separator=' '/>
                </Typography>
            </CardContent>
        </Card>
    )
}
