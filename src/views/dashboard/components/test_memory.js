import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DashboardCard from '../../../components/shared/DashboardCard';
import Chart from 'react-apexcharts';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Testcomp_MEMORY = (props) => {
    //var dataSet = [];
    const [dataSet, changeSet] = useState(['']);

    const [month, setMonth] = React.useState('1');

    const [timeArr, setTimeArr] = useState([]);
    const [instance, setInstance] = useState({});
    const [success, ss] = useState(true);

    const handleChange = (event) => {
        setMonth(event.target.value);
    };
    //var ar = new Array();
    //var te = {};
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://mhub.nimbusnetworks.co.kr:3001/api/v1/query?query=node_memory_MemAvailable_bytes{instance=%2210.10.211.120:9100%22}[5m]');
                const response2 = await axios.get('http://mhub.nimbusnetworks.co.kr:3001/api/v1/query?query=node_memory_MemTotal_bytes{instance=%2210.10.211.120:9100%22}[5m]');
                console.log(response);
                console.log("sadas");
                var ob = {};

                const time = response.data.data.result[0].values.map(item => item[0]);
                const value = response.data.data.result[0].values.map(item => item[1]);
                const value2 = response2.data.data.result[0].values.map(item => item[1]);


                var resultArray = [];


                for (var i = 0; i < value.length; i++) {
                    resultArray.push((parseInt((value2[i] - value[i]) / 1000000)));
                }

                ob.name = response.data.data.result[0].metric.instance;
                ob.data = resultArray;
                setInstance(ob);
                setTimeArr(time);

            } catch (error) {
                console.error("Error fetching data:", error);
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

            //categories: [String(time1), String(time2), String(time3), String(time4)],
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
            categories: timeArr.map(value => {
                const t = new Date(value * 1000);
                return t.toLocaleString().substring(13);
            }),
        },
        yaxis: {
            //logarithmic: true, // 로그 스케일 사용
            title: {
                //text: 'MB',
                //fontFamily: 'Helvetica, Arial, sans-serif',

            },

        },
    };


    return (
        <div>
            {timeArr && instance &&
                <DashboardCard title='memory usage'>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MB
                    <Chart
                        options={options}
                        series={[instance]}
                        type="line"
                        width="700"
                        height={470}
                    />
                </DashboardCard >}
        </div>

    );
};

export default Testcomp_MEMORY;
