import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import axios from 'axios';
import getNetTrans from './getNetTrans';
const Testcomp_CPU = (props) => {
    //var dataSet = [];
    const [dataSet, changeSet] = useState(['']);

    const [month, setMonth] = React.useState('1');
    const [time1, ct1] = useState();
    const [time2, ct2] = useState();
    const [time3, ct3] = useState();
    const [time4, ct4] = useState();
    const [test, zzz] = useState([1, 2, 3, 4, 5]);


    const [targetObj, setObj] = useState();

    const [timeArr, setTimeArr] = useState([]);
    const [valueArr, setValueArr] = useState([]);
    const [val_enp1s0, setVal_enp1s0] = useState({});

    const [data, setData] = useState([]);
    const [instance, setInstance] = useState({});
    const [instance2, setInstance2] = useState({});
    const handleChange = (event) => {
        setMonth(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // const query = '(1-rate(node_cpu_seconds_total{instance="10.10.211.120:9100",mode="idle"}[5m]))*100';
                // const url = `http://mhub.nimbusnetworks.co.kr:3001/api/v1/query_range?query=${query}&start=${Math.floor(Date.now() / 1000) - 300}&end=${Math.floor(Date.now() / 1000)}&step=31`;
                //const url = "http://mhub.nimbusnetworks.co.kr:3001/api/v1/query?query=(node_cpu_seconds_total{instance='10.10.211.120:9100',mode='idle',cpu='0'}[5m])"
                const url = "/api/v1/query?query=http_requests_total{instance='10.10.211.209:9100'}"
                const response = await axios.post(url);

                console.log(response);

                const value = response.data.data.result[0].values.map(item => item[1]);
                const value2 = response.data.data.result[1].values.map(item => item[1]);
                const time = response.data.data.result[0].values.map(item => item[0]);
                setTimeArr(time);
                const ob = {};
                const ob2 = {};
                ob.name = "cpu: " + response.data.data.result[0].metric.cpu;
                ob.data = value;
                setInstance(ob);
                ob2.name = "cpu: " + response.data.data.result[1].metric.cpu;
                ob2.data = value2;

                setInstance2(ob2);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        fetchData();
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
            //categories: [timeArr],
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
    //var unixTimestamp = new Date(res.data.data.result[0].values[0][0] * 1000);
    //console.log(unixTimestamp.toLocaleString());
    const options = {
        chart: {
            id: "basic-bar",
        },
        xaxis: {
            //categories: [String(time1), String(time2), String(time3), String(time4)]
            //categories: [timeArr[0], timeArr[1], timeArr[2], timeArr[3], timeArr[4], timeArr[5]],


            categories: timeArr.map(value => {
                const t = new Date(value * 1000);
                return t.toLocaleString().substring(12);
            }),
        },
        yaxis: {
            //logarithmic: true, // 로그 스케일 사용
            //title: { text: 'MB' }
        },
    };


    return (
        <DashboardCard title='cpu usage'>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;percent(%)
            <Chart
                options={options}
                series={[instance, instance2]}
                type="line"
                width="700"
                height={470}
            />
            {/* <button onClick={() => { console.log(val_enp1s0) }}>clo</button> */}
        </DashboardCard >
    );
};

export default Testcomp_CPU;
