import HighchartsReact from 'highcharts-react-official'
import React, { useEffect, useState } from 'react'
import Highchart, { Point, seriesType } from 'highcharts'
import { isArguments } from 'lodash'
import moment from 'moment'
import { Button, ButtonGroup } from '@material-ui/core'

const generateOptions = (data) => {
    const categories = data.map(item => moment(item.Date).format('DD/MM/YYYY'));
    console.log({categories});    
    return {
        //chieu cao linechart:
        chart: {
            height: 500,
        },
        title: {
            text: 'Tổng số ca nhiễm'
        },
        //truc x nam ngang (ngaythangnam)
        xAxis: {
            categories: categories,
            crosshair: true,
        },
        colors: ['#083755'],
        yAxis: {
            min: 0,
            title: {
                text: null,
            },
        },
        //bieu do
        tooltip: {
            headerFormat: '<span style="font-size: 10px">{point.key}</span><table>',
            printFormat: 
            '<tr><td style="color:{series.color}; padding: 0">{series.name}: </td>' + 
            '<td style="padding: 0"><b>{point.y} ca</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true,
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
            },
        },
        series: [
            {
                name: 'Tổng ca nhiễm',
                data: data.map((item) => item.Confirmed),
            }
        ]
    };
}

export default function LineChart({ data }) {
    //Khi data thay đổi, cần thực thi lại generateOp() để lấy ra options mới
    //và gán vào options state

    const [ options, setOptions ] = useState([]);
    const [ lineType, setLineType] = useState('');

    useEffect(() => {

        let customData = [];
        switch (lineType) {
            case 'all':
                customData = data;
                break;
            case '30days':
                customData = data.slice(data.length - 30);
                break;
            case '7days':
                customData = data.slice(data.length - 7);
                break;
            default: 
                customData = data;
                break;
        }
        setOptions(generateOptions(customData));
    }, [data, lineType]);
    
    return (
        <div>
            <ButtonGroup size='small' style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Button color={ lineType === 'all' ? 'secondary' : ''} onClick={() => setLineType('all')}>Tất cả</Button>
                <Button color={ lineType === '30days' ? 'secondary' : ''} onClick={() => setLineType('30days')}>30 ngày</Button>
                <Button color={ lineType === '7days' ? 'secondary' : ''} onClick={() => setLineType('7days')}>7 ngày</Button>
            </ButtonGroup>
            <HighchartsReact
                highchartr={Highchart}
                options={options}
            />
        </div>
    )
}
