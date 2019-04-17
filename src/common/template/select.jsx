
import React,{Component} from 'react';
import {Select } from 'grommet'

export default class NewSelect extends Component{
   
  render() {
    return (
      <Select {...this.props}/>
    )
  }
}