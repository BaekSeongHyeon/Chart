import React, { useState } from "react";
import axios from "axios";
const GetNetTrans = () => {
    const [data, set] = useState(null);
    axios.get('http://10.10.211.121:30101/api/v1/query?query=node_network_transmit_packets_total{instance=%2210.10.211.120:9100%22}[5m]').then((res) => {
        set(res.data.data.result);
    })
    return data;
}

export default GetNetTrans;