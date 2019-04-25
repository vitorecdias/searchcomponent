import React, { Component} from 'react'

import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, FormField, Button, Box } from 'grommet'
import NewSelect from '../../common/template/select'
import If from '../../common/operator/if'
import { Search } from 'grommet-icons';
import { getCamadasList } from './filterFormActions'

class FilterForm extends Component{

    constructor(props){
        super(props)

        this.state ={
            valueCamada: '',
            valueAtributo:'',
            valueOperador:'== (Igual)',
            valueValor:'',
            valueValor1:'',
            valueValor2:'',
            atributosList:[],
            operadorList:['== (Igual)','!= (Diferente)','< (Menor)','> (Maior)','<= (Menor ou Igual)','>= (Maior ou Igual)','.. (Entre)','~ (Similar)'],
            operadores:{'== (Igual)': '=','!= (Diferente)':'<>','< (Menor)':'<','> (Maior)':'>','<= (Menor ou Igual)':'<=','>= (Maior ou Igual)':'>=',
                '.. (Entre)':'BETWEEN','~ (Similar)':'~'},
            camadasLabelsList:[],
            camada: [],
            exibeValor:true,
            atributoDisabled: true,
            valueValorSuggestions: [],
            valueValorOptionsFixo: []
         }

        this.handleSubmit = this.handleSubmit.bind(this)

    }
    componentWillMount(){
        this.props.getCamadasList()  
        var list =[]
        console.log(this.props.camadasList)
        this.props.camadasList.map(x => !x.privado?list.push(x.display_name):null)
        this.setState({camadasLabelsList:list})
    }    

    handleSubmit (){        

        if(this.state.valueAtributo === '' || this.state.valueValor === '' || this.state.valueCamada === '' || this.state.valueOperador ==='' &&(this.state.valueValor1 === '' || this.state.valueValor2 === '')){
            return null
        }

       axios.get('http://bhmap.pbh.gov.br/v2/api/wfs?version=2.0.0&request=GetFeature&typeName=ide_bhgeo:'+this.state.camada.servicos.wfs.typename+
            '&outputFormat=application/json&CQL_FILTER='+this.state.camada.servicos.wfs.attributes[this.state.valueAtributo]+'%20'+
            (
                this.state.valueOperador==='.. (Entre)'?
                ('BETWEEN%20%27'+this.state.valueValor1+'%27%20AND%20%27'+this.state.valueValor1+'%27'):
                (this.state.operadores[this.state.valueOperador]+'%20%27'+this.state.valueValor+'%27')
            )
            
        ).then(resp=>{                    
            if(resp.data){
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

    render(){        

        return(               
  
                <Box direction='column' pad='xsmall'>
                <Form>
                    <Box direction="row" align="center" alignContent="center" alignSelf="center" gap='small'>                   
                        <FormField 
                            component={NewSelect} 
                            options={this.state.camadasLabelsList} 
                            onChange={option => {
                                this.setState({
                                    camada:this.props.camadasList[option.selected],
                                    valueCamada: option.value,                                
                                    atributosList:this.props.camadasList[option.selected].servicos.display_feature.attributes,
                                    valueAtributo:"",
                                    atributoDisabled:false,
                                    valueValorSuggestions: [],
                                    valueValorOptionsFixo:[]
                                })
                                
                                console.log(this.state.camada)
                            }} 
                            value={this.state.valueCamada} 
                            placeholder="Camada" 
                            size="xsmall"
                            emptySearchMessage='Caregando...'/> 
                        <FormField 
                            disabled = {this.state.atributoDisabled}
                            component={NewSelect} 
                            options={this.state.atributosList} 
                            onChange={option => {
                                this.setState({valueAtributo: option.value,
                                    valueValorSuggestions: []})
                                
                                axios.get('http://bhmapogcbase.pbh.gov.br/bhmapogcbase/wfs/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=ide_bhgeo:'+
                                    this.state.camada.servicos.wfs.typename+'&outputFormat=application%2Fjson')
                                    .then(resp=>{                    
                                        if(resp.data){
                                            console.log('Camada Buscada! ')   
                                            console.log(resp.data)

                                            var list =[]
                                            resp.data.features.map(x => list.push(x.properties[this.state.camada.servicos.wfs.attributes[this.state.valueAtributo]]))
                                            const opts =  [...new Set(list)]
                                            this.setState({valueValorOptionsFixo: opts})
                                        }else{
                                            console.log('Nenhum endereços encontrado!')   
                                        }   
                                        })
                                    .catch(e=>{
                                        console.log('Erro', e)
                                })
                            
                            } }
                            value={this.state.valueAtributo} 
                            placeholder="Atributo" 
                            size="xsmall"
                            emptySearchMessage='Nenhum atributo encontrado'
                            /> 
                    </Box>  
                    <Box direction="row" align="center" alignContent="center" alignSelf="center" gap='small'>                    
                        <FormField placeholder = "Operador" 
                            component={NewSelect} 
                            options={this.state.operadorList} 
                            onChange={option => {
                                this.setState({valueOperador: option.value})                       
                                if(option.value === ".. (Entre)"){
                                    this.setState({
                                        exibeValor:false,
                                        valueValor:'',
                                        valueValor1:'',
                                        valueValor2:''})
                                }else{
                                    this.setState({
                                        exibeValor:true
                                     })
                                }
                            }} 
                            value={this.state.valueOperador} 
                            size="xsmall"

                            /> 
                        <If test={this.state.exibeValor}>
                            <FormField placeholder = "Valor" 
                                value={this.state.valueValor} 
                                size="xsmall"
                                suggestions = {this.state.valueValorSuggestions}
                                onChange={event => {
                                    const exp = new RegExp(event.target.value, "i");    
                              
                                    this.setState({valueValor: event.target.value,
                                        valueValorSuggestions: this.state.valueValorOptionsFixo.filter(o => exp.test(o))
                                        })                                
                                }}
                                onClose={() =>  this.setState({valueValorSuggestions: this.state.valueValorOptionsFixo })}
                                onSelect= {event =>  this.setState({valueValor: event.suggestion })}
                                /> 
                        </If>
                        <If test={!this.state.exibeValor}>
                            <Box direction="column">
                                <FormField placeholder = "Valor 1" 
                                    onChange={event => this.setState({valueValor1: event.target.value})} 
                                    value={this.state.valueValor1} 
                                    size="xsmall"/>
                                <FormField placeholder = "Valor 2" 
                                    onChange={event => this.setState({valueValor2: event.target.value})} 
                                    value={this.state.valueValor2} 
                                    size="xsmall"/>
                            </Box>
                        </If>

                        <Button type="submit" size="small" primary icon={<Search size='small'/>} onClick={this.handleSubmit} onKeyPress={e => {
                            if(e.keyCode === 13 && e.shiftKey === false) {
                                this.handleSubmit()  
                            }}}/>
                        
                    </Box>  
                    </Form>
                </Box>
            
            
        )
    }
}

const mapStateToProps = state => ({ 
    camadasList: state.filterForm.camadasList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getCamadasList}, dispatch)
export default connect( mapStateToProps, mapDispatchToProps)(FilterForm)