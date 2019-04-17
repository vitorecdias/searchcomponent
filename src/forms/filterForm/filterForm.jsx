import React, { Component} from 'react'

import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, FormField, Button, Box } from 'grommet'
import NewSelect from '../../common/template/select'
import { Search } from 'grommet-icons';
import { getCamadasList } from './filterFormActions'

import {URLlogradouros} from "../../common/consts"

class FilterForm extends Component{

    constructor(props){
        super(props)

        this.state ={
            valueCamada: '',
            valueAtributo:'',
            valueOperador:'',
            valueValor:'',
            filterForm:[],
            logTypeList:[]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeLogField = this.handleChangeLogField.bind(this)
        this.onSelectSuggestion = this.onSelectSuggestion.bind(this)

        this.onSelectCamada = this.onSelectCamada.bind(this)
        this.onSelectAtributo = this.onSelectAtributo.bind(this)
        this.onSelectOperador = this.onSelectOperador.bind(this)
        this.onSelectValor = this.onSelectValor.bind(this)

        this.onChangeCamada = this.onChangeCamada.bind(this)
        this.onChangeAtributo = this.onChangeAtributo.bind(this)
        this.onChangeOperador = this.onChangeOperador.bind(this)
        this.onChangeValor = this.onChangeValor.bind(this)
    }


    componentWillMount(){
        this.props.getCamadasList()  
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
        console.log(event.suggestion)
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

    onSelectCamada(event){

        this.setState({valueCamada: event.value})

    }

    onSelectAtributo(event){

        this.setState({valueAtributo: event.value})

    }

    onSelectOperador(event){

        this.setState({valueOperador: event.value})
    }

    onSelectValor(event){

        this.setState({valueValor: event.value})
    }

    onChangeCamada(event){

        this.setState({valueCamada: event.target.value})
    }

    onChangeAtributo(event){

        this.setState({valueAtributo: event.target.value})
    }

    onChangeOperador(event){

        this.setState({valueOperador: event.target.value})
    }

    onChangeValor(event){

        this.setState({valueValor: event.target.value})
    }

    render(){        

        return(               
            <Form > 
                <Box direction='column'>
                    <Box direction="row" align="center" alignContent="center" alignSelf="center" gap='small'>                   
                        <FormField label = "Camada:" name="tipo" component={NewSelect} options={this.props.camadasList} onChange={this.onSelectType} value={this.state.valueCamada} size="xsmall"/> 
                        <FormField label = "Atributo:" name="tipo" component={NewSelect} options={this.props.camadasList} onChange={this.onSelectType} value={this.state.valueAtributo} size="xsmall"/> 
                    </Box>  
                    <Box direction="row" align="center" alignContent="center" alignSelf="center" gap='small'>                    
                        <FormField label = "Operador:" name="tipo" component={NewSelect} options={this.props.camadasList} onChange={this.onSelectType} value={this.state.valueOperador} size="xsmall"/> 
                        <FormField label = "Valor:" name="tipo" onChange={this.onSelectType} value={this.state.valueValor} size="xsmall"/> 

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
    camadasList: state.filterForm.camadasList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getCamadasList}, dispatch)
export default connect( mapStateToProps, mapDispatchToProps)(FilterForm)