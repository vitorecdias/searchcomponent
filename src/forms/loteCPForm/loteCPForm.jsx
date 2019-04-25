import React, { Component} from 'react'

import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, FormField, Button, Box,MaskedInput } from 'grommet'
import { Search } from 'grommet-icons';

class LoteCPForm extends Component{

    constructor(props){
        super(props)

        this.state ={
            valueZonaFiscal: '',
            valueNumQuadra:'',
            valueNumLote:'',
        }

        this.handleSubmit = this.handleSubmit.bind(this)

    }

    
    handleSubmit (){        

        if(this.state.valueZonaFiscal ==='' || this.state.valueNumQuadra === '' || this.state.valueNumLote ===''){
            return null
        }

       axios.get('http://bhmap-hm.pbh.gov.br/v2/api/wfs?version=2.0.0&request=GetFeature&typeName=ide_bhgeo%3ALOTE_APROVADO&outputFormat=application%2Fjson&CQL_FILTER=ZONA_FISCAL%3D%27'+this.state.valueZonaFiscal+'%27%20AND%20QUARTEIRAO%3D%27'+this.state.valueNumQuadra+'%27%20AND%20LOTE%3D%27'+this.state.valueNumLote.toUpperCase()+'%27')
            .then(resp=>{ 
                                  
                if(resp.data){

                    console.log(resp.data)    
    
                }else{
                    console.log('Nenhum lote encontrado!')   
                }   
                })
            .catch(e=>{
                console.log('Erro', e)
            })

    }

    render(){        

        return(               
            <Form > 
                <Box direction="row" align="stretch" alignContent="stretch" alignSelf="stretch" pad='xsmall'>                             
                    <Box pad="xsmall" width="150px">
                        <MaskedInput size="xsmall"
                            mask={[
                                {
                                length: 3,
                                regexp: /[0-9]$/,
                                placeholder: '',
                                }
                            ]}
                            placeholder="Nº Zona Fiscal" 
                            value={this.state.valueZonaFiscal}
                            onChange={event => this.setState({valueZonaFiscal: event.target.value})}
                            />                                                   
                    </Box>
                    <Box pad="xsmall" width="150px"> 
                        <MaskedInput size="xsmall"
                            mask={[
                                {
                                length: 3,
                                regexp: /[0-9-a-z-A-Z]$/,
                                placeholder: '',
                                }
                            ]}
                            placeholder="Nº Quadra"
                            value={this.state.valueNumQuadra}
                            onChange={event => this.setState({valueNumQuadra: event.target.value})}
                            />                                                    
                    </Box>
                    <Box pad="xsmall" width="150px">
                        
                        <MaskedInput size="xsmall"
                            mask={[
                                {
                                length: 3,
                                regexp: /[0-9-a-z-A-Z]$/,
                                placeholder: '',
                                },
                                {
                                length: 1,
                                regexp: /[a-z-A-Z]$/,
                                placeholder: '',
                                }
                            ]}
                            placeholder="Nº Lote"
                            value={this.state.valueNumLote}
                            onChange={event => this.setState({valueNumLote: event.target.value})}
                            />                            
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

//const mapDispatchToProps = dispatch => bindActionCreators({ getLogradouroTypeList}, dispatch)
//export default connect( null, mapDispatchToProps)(LoteCPForm)
export default LoteCPForm