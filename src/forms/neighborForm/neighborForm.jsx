import React, { Component} from 'react'
import NewSelect from '../../common/template/select'
import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, FormField, Button, Box } from 'grommet'
import { Search } from 'grommet-icons';
import { getBairrosList } from './neighborFormActions'

class NeighborForm extends Component{

    constructor(props){
        super(props)

        this.state ={
            valueBairro: '',
            options:[]
        }

    }

    componentWillMount(){
        this.props.getBairrosList()          
        this.setState({ options: this.props.bairrosList})  
    }    
  
    handleSubmit (bairro){        

        if(bairro===""){
            console.log("aqui")
            return null
        }

       axios.get("http://bhmap.pbh.gov.br/v2/api/wfs?version=2.0.0&request=GetFeature&typeName=ide_bhgeo_geopackage%3ABAIRRO&outputFormat=application%2Fjson&CQL_FILTER=NOME%3D%27"+bairro+"%27")
                .then(resp=>{
                    
                    if(resp.data.features.length > 0){
                        console.log('Endereços encontrados! ')      
                        console.log(resp.data.features)    
                     
                    }else{
                        console.log('Nenhum bairro encontrado!')   
                    }   
                    })
                .catch(e=>{
                    console.log('Erro', e)
                })

    }

    render(){                         
        
        return(      
                     
            <Form > 
                <Box direction="row" align="center" alignContent="center" alignSelf="center">                             
                    <Box pad="small" width="400px" align="center">
                        <FormField component={NewSelect} 
                            placeholder="Digite o nome do bairro..." 
                            options={ this.state.options} 
                            onChange={({ option }) => this.setState({ valueBairro: option })}
                            value={this.state.valueBairro} 
                            size='xsmall'
                            icon={false}    
                            onClose={() =>  this.setState({options: this.props.bairrosList })}          
                            onSearch={text => {
                                const exp = new RegExp(text, "i");    
                          
                                this.setState({options: this.props.bairrosList.filter(o => exp.test(o))})                                
                              }
                            }
                            /> 
                    </Box>
                    <Box pad="small" width="60px">
                        <Button type="submit" size="small" primary icon={<Search size='small'/>} onClick={() =>this.handleSubmit(this.state.valueBairro)} onKeyPress={e => {
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
    bairrosList: state.neighborForm.bairrosList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getBairrosList}, dispatch)
export default connect( mapStateToProps, mapDispatchToProps)(NeighborForm)