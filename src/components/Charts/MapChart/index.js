import React, { useRef, useState } from 'react'
import Highchart from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import highchartsMap from 'highcharts/modules/map'
import { useEffect } from 'react';
import { cloneDeep } from 'lodash';

highchartsMap(Highchart);

const initOptions = {
    chart: {
        height: '500',
    },
    title: {
        text: null,
    },
    //di chuyển map:
    mapNavigation: {
        enabled: true,
    },
    colorAxis: {
        min: 0,
        stops: [
            [0.2, '#FFC4AA'],
            [0.4, '#FF8A66'],
            [0.6, '#FF392B'],
            [0.8, '#B71525'],
            [1, '#7A0826'],
        ],
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'bottom',
    },
    series: [
        {
            mapData: {},
            name: 'Địa điểm',
            joinBy: ['hc-key', 'key'],
        },
    ],
};

export default function MapChart({ mapData }) {

    const [options, setOptions ] = useState({});
    const chartRef = useRef(null);
    //tạo 1 cờ để kiểm tra trước khi return
    const [ configLoaded, setConfigLoaded] = useState(false);

    useEffect(() => {

        if (mapData && Object.keys(mapData).length) {
            //loop array features để tạo data giả cho từng tỉnh
            const fakeData = mapData.features.map((features, index) => ({
                key: features.properties['hc-key'],
                value: index,
            }));
            setOptions({
                ...initOptions,
                series: [
                    {
                        ...initOptions.series[0],
                        mapData: mapData,
                        data: fakeData,
                    }
                    
                ]
            });
        if(!configLoaded) setConfigLoaded(true);
        }
        
    }, [mapData, configLoaded]);

    //vì thay đổi mapData trong options nên cần mothod update để load đúng bản đồ
    useEffect(() => {
        if (chartRef && chartRef.current) {
            chartRef.current.chart.series[0].update({
                mapData,
            });
        }
    }, [mapData])

    if (!configLoaded) return null;
    return (
        <HighchartsReact 
            highcharts={Highchart}
            options={cloneDeep(options)}
            constructorType='mapChart'
            ref={chartRef}
        />
    )
}
