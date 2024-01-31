import React from 'react';
import { Typography } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { Grid, Box } from '@mui/material';
import DashboardCard from '../../components/shared/DashboardCard';
import SalesOverview from '../dashboard/components/SalesOverview';

import Testcomp_MEMORY from '../dashboard/components/test_memory';
import Testcomp from '../dashboard/components/test';
import Testcomp_CPU from '../dashboard/components/test_cpu';
import { useState } from 'react';
import Testcomp_DISK from '../dashboard/components/test_disk';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html';



const SamplePage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [ch, sch] = useState({ Testcomp_DISK });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/text', {
        username: username,
        password: password,
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // <PageContainer title="Sample Page" description="this is Sample page">

    //   <DashboardCard title="Sample Page">
    //     <Typography>This is a sample page</Typography>
    //   </DashboardCard>
    //   <DashboardCard title="info">
    //     <Typography>test info</Typography>
    //   </DashboardCard>
    //   <DashboardCard title="info2">
    //     <Typography>test info2</Typography>
    //   </DashboardCard>
    //   <div>
    //     hello
    //   </div>
    // </PageContainer>


    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            {/* <Testcomp_MEMORY />
            <Testcomp type='network receive bytes' /> */}

            <Testcomp_CPU />
            {/* <Testcomp_DISK></Testcomp_DISK> */}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button type="submit">Login</button>
            </form>

          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default SamplePage;
