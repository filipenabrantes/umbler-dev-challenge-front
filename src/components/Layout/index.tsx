import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  AppBar,
  makeStyles,
  Box,
} from '@material-ui/core';
import {
  Search as SearchIcon
} from '@material-ui/icons'
import Registrant from '../Registrant';
import TechnicalContact from '../TechnicalContact';
import NameServers from '../NameServers';
import IPs from '../IPs';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: '20px',
    marginTop: '10px'
  },
  bar: {
    backgroundColor: '#557cf2',
    height: '65px '
  },
  button: {
    backgroundColor: '#98bf49',
    color: '#FFFF',
    borderRadius: '20px',
  },
  status: {
    marginTop: '20px',
    marginBottom: '10px'
  }
}));

export default function Layout() {
  const classes = useStyles();
  const [domain, setDomain] = useState('');
  const [whoisInfo, setWhoisInfo] = useState('');
  const [status, setStatus] = useState('');

  const isValidDomain = (domain: string) => {
    if (!domain) return false;
    var re = /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi;
    re.test(domain) ? setDomain(domain) : setDomain('0');
  }

  const getDomainInfo = async (domain: string) => {
    const response = await axios.get(`http://localhost:3001/dns?domain=${domain}`);
    if (response.data) {
      setWhoisInfo(response.data);
      setStatus(response.data['Status'])
    }
  }

  useEffect(() => {
  }, [whoisInfo]);

  return (
    <Container>
      <div className={classes.root}>
        <AppBar className={classes.bar}>
          <Typography variant="h6" className={classes.title} >
            Umbler Technical Test
          </Typography>
        </AppBar>
      </div>

      <Grid container spacing={1} style={{ marginTop: '8%' }}>
        <Grid item xs={8}>
          <TextField
            error={domain === '0' ? true : false}
            style={{ width: '100%' }}
            id="outlined-basic"
            label="Digite o domínio que deseja pesquisar"
            variant="outlined"
            onChange={(e) => isValidDomain(e.target.value)}

          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            className={classes.button}
            size="large"
            startIcon={<SearchIcon />}
            onClick={() => getDomainInfo(domain)}
            disabled={domain === '' ? true : false}
          >
            Pesquisar...
            </Button>
        </Grid>

        <Grid item xs={6}>
          {whoisInfo &&
            <Typography className={classes.status}>
              {status && `Status: ${status}`}
            </Typography>}
          {whoisInfo && <Registrant data={whoisInfo} />}
          {whoisInfo && <TechnicalContact data={whoisInfo} />}
          {whoisInfo && <NameServers data={whoisInfo} />}
          {whoisInfo && <IPs data={whoisInfo} />}

        </Grid>
      </Grid>

    </Container>
  );
}
