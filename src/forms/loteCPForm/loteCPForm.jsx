import React, { Component} from 'react'

import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, FormField, Button, Box } from 'grommet'
import NewSelect from '../../common/template/select'
import { Search } from 'grommet-icons';
import { getLogradouroTypeList } from './loteCPFormActions'

import {URLlogradouros} from "../../common/consts"

class LoteCPForm extends Component{

    constructor(props){
        super(props)

        this.state ={
            valueZonaFiscal: '',
            valueNumQuadra:'',
            valueNumLote:'',
            logSuggestionsList:[],
            logTypeList:[]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeZonaFiscal = this.onChangeZonaFiscal.bind(this)
        this.onChangeNumQuadra = this.onChangeNumQuadra.bind(this)
        this.onChangeNumLote = this.onChangeNumLote.bind(this)
    }


    componentWillMount(){
        this.props.getLogradouroTypeList()  
    }    
    onSelectSuggestion(event){
        console.log(event.suggestion)
        this.setState({
            valueLogradouro: event.suggestion
        })
    }
    
    handleSubmit (){        

        if(this.state.valueZonaFiscal =='' || this.state.valueNumQuadra == '' || this.state.valueNumLote ==''){
            return null
        }

       axios.get('http://bhmap-hm.pbh.gov.br/v2/api/wfs?version=2.0.0&request=GetFeature&typeName=ide_bhgeo%3ALOTE_APROVADO&outputFormat=application%2Fjson&CQL_FILTER=ZONA_FISCAL%3D%27'+this.state.valueZonaFiscal+'%27%20AND%20QUARTEIRAO%3D%27'+this.state.valueNumQuadra+'%27%20AND%20LOTE%3D%27'+this.state.valueNumLote+'%27')
            .then(resp=>{                
                if(resp.data.length > 0){

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

    onChangeZonaFiscal(event){

        this.setState({valueZonaFiscal: event.target.value})
    }

    onChangeNumQuadra(event){

        this.setState({valueNumQuadra: event.target.value})
    }

    onChangeNumLote(event){

        this.setState({valueNumLote: event.target.value})
    }

    render(){        

        return(               
            <Form > 
                <Box direction="row" align="stretch" alignContent="stretch" alignSelf="stretch">                             
                    <Box pad="small" width="150px">
                        <FormField value={this.state.valueZonaFiscal} onChange={this.onChangeZonaFiscal} 
                            placeholder="Nº Zona Fiscal" size="xsmall"  max={99999} type="number" />                                                    
                    </Box>
                    <Box pad="small" width="150px">
                        <FormField value={this.state.valueNumQuadra}
                                onChange={this.onChangeNumQuadra} placeholder="Nº Quadra" size="xsmall"  max={99999} type="number"/>                                                    
                    </Box>
                    <Box pad="small" width="150px">
                        <FormField  size="xsmall"placeholder="Nº Lote" type="number" onChange={this.onChangeNumLote} value={this.state.valueNumLote} max={99999}/>                            
                    </Box>
                    <Box pad="small" width="60px">
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

const mapDispatchToProps = dispatch => bindActionCreators({ getLogradouroTypeList}, dispatch)
export default connect( null, mapDispatchToProps)(LoteCPForm)