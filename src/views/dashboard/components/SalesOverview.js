import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GetNetTrans from './getNetTrans';
const SalesOverview = () => {
    //var dataSet = [];
    const [dataSet, changeSet] = useState([]);

    const [month, setMonth] = React.useState('1');
    const [time1, ct1] = useState();
    const [time2, ct2] = useState();
    const [time3, ct3] = useState();
    const [time4, ct4] = useState();
    const [curtime, ff] = useState([]);
    const handleChange = (event) => {
        setMonth(event.target.value);
    };
    useEffect(() => {
        //axios.get('http://10.10.211.121:30101/api/v1/query?query=irate(node_disk_reads_completed_total{instance=%2210.10.211.120:9100%22}[10d])').then(res => {
        // axios.get('http://10.10.211.121:30101/api/v1/query?query=node_network_transmit_packets_total{instance=%2210.10.211.120:9100%22}[1h]').then(res => {
        //     //res.data.data.result[0 , 1 , 2 , 3] 
        //     // var testlist = [];
        //     // testlist = res.data.data.result;
        //     // console.log(testlist);
        //     console.log(res);
        //     // var unixTimestamp = new Date(res.data.data.result[0].values[0][0] * 1000);
        //     // console.log(unixTimestamp.toLocaleString());
        //     // ct1(unixTimestamp.toLocaleString());
        //     // unixTimestamp = new Date(res.data.data.result[0].values[1][0] * 1000);
        //     // ct2(unixTimestamp.toLocaleString());
        //     // unixTimestamp = new Date(res.data.data.result[0].values[2][0] * 1000);
        //     // ct3(unixTimestamp.toLocaleString());
        //     // unixTimestamp = new Date(res.data.data.result[0].values[3][0] * 1000);
        //     // ct4(unixTimestamp.toLocaleString());

        //     // const newSet = {
        //     //     name: res.data.data.result[0].metric.device,
        //     //     //data: [res.data.data.result[0].values[0][1], res.data.data.result[0].values[1][1], res.data.data.result[0].values[2][1], res.data.data.result[0].values[3][1],],
        //     //     data: []
        //     // };
        //     // for (var i = 0; i < 4; i++) {
        //     //     newSet.data.push(res.data.data.result[0].values[i][1]);
        //     // }
        //     // const newSet2 = {
        //     //     name: res.data.data.result[1].metric.device,
        //     //     data: [res.data.data.result[1].values[0][1], res.data.data.result[1].values[1][1], res.data.data.result[1].values[2][1], res.data.data.result[1].values[3][1],],
        //     // };
        //     // const newSet3 = {
        //     //     name: res.data.data.result[2].metric.device,
        //     //     data: [res.data.data.result[2].values[0][1], res.data.data.result[2].values[1][1], res.data.data.result[2].values[2][1], res.data.data.result[2].values[3][1],],
        //     // };
        //     // const newSet4 = {
        //     //     name: res.data.data.result[3].metric.device,
        //     //     data: [res.data.data.result[3].values[0][1], res.data.data.result[3].values[1][1], res.data.data.result[3].values[2][1], res.data.data.result[3].values[3][1],],
        //     // };

        //     // changeSet([newSet, newSet2, newSet3, newSet4]);
        // })
        //GetNetTrans();
    }, [])
    // chart color
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;

    // chart
    const optionscolumnchart = {
        chart: {
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif;",
            foreColor: '#adb0bb',
            toolbar: {
                show: true,
            },
            height: 370,
        },
        colors: [primary, secondary],
        plotOptions: {
            bar: {
                horizontal: false,
                barHeight: '60%',
                columnWidth: '42%',
                borderRadius: [6],
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'all',
            },
        },

        stroke: {
            show: true,
            width: 5,
            lineCap: "butt",
            colors: ["transparent"],
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
            strokeDashArray: 3,
            xaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            logarithmic: true, // 로그 스케일 사용
        },

        xaxis: {
            //categories: ['16/08', '17/08', '18/08', '19/08', '20/08', '21/08', '22/08', '23/08'],
            categories: [String(time1), String(time2), String(time3), String(time4)],
            //categories: [curtime[0], curtime[1], curtime[2], curtime[3]],
            axisBorder: {
                show: false,
            },
        },
        tooltip: {
            theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
            fillSeriesColor: false,
        },
    };
    // const seriescolumnchart = [
    //     {
    //         name: 'Eanings this month',
    //         data: [355, 390, 300, 350, 390, 180, 355, 390],
    //     },
    //     {
    //         name: 'Expense this month',
    //         data: [280, 250, 325, 215, 250, 310, 280, 250],
    //     }

    // ];
    const seriescolumnchart = dataSet;
    const options = {
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            categories: [String(time1), String(time2), String(time3), String(time4)]
        },
        // yaxis: {
        //     logarithmic: true, // 로그 스케일 사용
        // },
    };


    return (

        <DashboardCard title="node_disk_reads_completed_total{instance='10.10.211.120:9100'}" action={
            < Select
                labelId="month-dd"
                id="month-dd"
                value={month}
                size="small"
                onChange={handleChange}
            >
                <MenuItem value={1}>March 2023</MenuItem>
                <MenuItem value={2}>April 2023</MenuItem>
                <MenuItem value={3}>May 2023</MenuItem>
            </Select >
        }>
            {/* <Chart
                options={optionscolumnchart}
                series={seriescolumnchart}
                type="bar"
                height="370px"
            /> */}
            {/* <Chart
                options={options}
                series={seriescolumnchart}
                //series={[{ name: 'bb', data: [200, 300, 200, 100] }, { name: 'zxc', data: [200, 100, 140, 20] }]}
                type="line"
                width="730"
                height={470}
            /> */}
        </DashboardCard >

    );
};

export default SalesOverview;
