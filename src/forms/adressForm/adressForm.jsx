import React, { Component} from 'react'

import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, FormField, Button, Box } from 'grommet'
import NewSelect from '../../common/template/select'
import { Search } from 'grommet-icons';
import { getLogradouroTypeList } from './adressFormActions'

import {URLlogradouros} from "../../common/consts"

class AdressForm extends Component{

    constructor(props){
        super(props)

        this.state ={
            valueType: 'RUA',
            valueLogradouro:'',
            valueNumber:'',
            logSuggestionsList:[],
            logTypeList:[]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeLogField = this.handleChangeLogField.bind(this)
        this.onSelectSuggestion = this.onSelectSuggestion.bind(this)
        this.onSelectType = this.onSelectType.bind(this)
        this.onChangeNumber = this.onChangeNumber.bind(this)
    }
    
    componentWillMount(){
        this.props.getLogradouroTypeList()  
    }    

    handleChangeLogField(event){
        this.setState({valueLogradouro: event.target.value})       

        if(event.target.value.length >= 3){
            axios.get(URLlogradouros+"?filtrado=true&tipo="+this.state.valueType+"&nome="+event.target.value)
            .then(resp=>{
                var list = []
                if(resp.data.length > 0){       
                    for(var log in resp.data) {         
                        list.push(resp.data[log]["nomelogradouro"])    
                    } 
                    this.setState({logSuggestionsList: list})  
                } else{
                    this.setState({logSuggestionsList: []}) 
                }
                })
                .catch(e=>{
                    console.log('Erro', e)
                })
        }else{
            this.setState({logSuggestionsList: []}) 
        }

        event.preventDefault();
    }

    onSelectSuggestion(event){
        
        this.setState({
            valueLogradouro: event.suggestion
        })
    }
    
    handleSubmit (){        

        if(this.state.valueLogradouro <= 0){
            return null
        }

       axios.get(`${URLlogradouros}/?`
                +(this.state.valueType?'tipo='+this.state.valueType+'&':'')
                +(this.state.valueLogradouro?'nome='+this.state.valueLogradouro+'&':'')
                +(this.state.valueNumber?'numero='+this.state.valueNumber:''))
                .then(resp=>{
                    
                    if(resp.data.length > 0){
                        console.log('Endereços encontrados! ')   
                        console.log(resp.data)    
     
                    }else{
                        console.log('Nenhum endereços encontrado!')   
                    }   
                    })
                .catch(e=>{
                    console.log('Erro', e)
                })

    }

    onSelectType(event){

        this.setState({valueType: event.value,
        valueLogradouro:'',
        logSuggestionsList:[]})
    }

    onChangeNumber(event){

        this.setState({valueNumber: event.target.value})
    }

    render(){        

        return(               
            <Form > 
                <Box direction="row" align="center" alignContent="center" alignSelf="center" pad='xsmall'>                             
                    <Box pad="xsmall" width="170px">
                        <FormField component={NewSelect} options={this.props.logradouroTypeList} onChange={this.onSelectType} value={this.state.valueType} size="xsmall"/> 
                    </Box>
                    <Box pad="xsmall">
                        <FormField value={this.state.valueLogradouro} suggestions = {this.state.logSuggestionsList}
                                onChange={this.handleChangeLogField} onSelect={this.onSelectSuggestion} placeholder="logradouro" size="xsmall"  maxLength={30}/>                                                    
                    </Box>
                    <Box pad="xsmall" width="100px">
                        <FormField size="xsmall"placeholder="Nº" type="number" onChange={this.onChangeNumber} value={this.state.valueNumber} maxLength={5}/>                            
                    </Box>
                    <Box pad="xsmall" width="50px">
                        <Button type="submit" size="small" primary icon={<Search size='small'/>} onClick={this.handleSubmit} onKeyPress={e => {
                            if(e.keyCode === 13 && e.shiftKey === false) {
                                this.handleSubmit()  
                            }}}/>
                    </Box>                    
                </Box>  
            </Form>              
            
        )
    }
}

const mapStateToProps = state => ({ 
    logradouroTypeList: state.adressForm.logradouroTypeList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getLogradouroTypeList}, dispatch)
export default connect( mapStateToProps, mapDispatchToProps)(AdressForm)