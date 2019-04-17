import React, { Component } from 'react';

import {
   Box,
   Grommet,
   Tabs,
   Tab
  } from 'grommet';

import { deepFreeze } from "grommet/utils"
import NeighborForm from './forms/neighborForm/neighborForm';
import CEPForm from './forms/cepForm/cepForm'
import IptuForm from './forms/iptuForm/iptuForm'
import LoteCPForm from './forms/loteCPForm/loteCPForm'
import AdressForm from './forms/adressForm/adressForm'
import FilterForm from './forms/filterForm/filterForm'

const theme = deepFreeze(
  {
  "global": {
    "colors": {
      "brand": "#0096D6",
      "control": {
        "dark": "#00A8F0",
        "light": "#0096D6"
      },
      "focus": "#99d5ef",
      "accent-1": "#E6734B",
      "accent-2": "#E6C84B",
      "accent-3": "#915591",
      "dark-1": "#000001",
      "dark-2": "#676767",
      "light-1": "#F2F2F2",
      "light-2": "#E8E8E8",
      "light-3": "#CCCCCC",
      "neutral-1": "#006996",
      "neutral-2": "#A65336",
      "neutral-3": "#A69136",
      "neutral-4": "#774677",
      "status-critical": "#F04B37",
      "status-warning": "#F0AA3C",
      "status-ok": "#509137",
      "status-unknown": "#848484",
      "status-disabled": "#848484"
    }
  },
  "anchor": {
    "color": {
      "dark": "#00A8F0",
      "light": "#2883d7"
    }
  }
}
)

class App extends Component {

  render() {    
    
    return (
   
        <Grommet theme={theme}>            
           <Box background="light-1" pad="medium" round="small" height="250px" width="600px" alignSelf="center" align="center" alignContent="stretch"> 
            <Tabs plain={false} alignContent="stretch" align="center">
                <Tab title="Endereço" >
                    <AdressForm />
                </Tab>
                <Tab title="Bairro">
                    <NeighborForm />
                </Tab>
                <Tab title="CEP">
                    <CEPForm />
                </Tab>
                <Tab title="IPTU">
                    <IptuForm />
                </Tab>
                <Tab title="Lote CP">
                    <LoteCPForm />
                </Tab>
                <Tab title="Filtro">
                    <FilterForm />
                </Tab>
            </Tabs>  
            </Box>  
        </Grommet>         
      
    );
  }
}

export default App;
