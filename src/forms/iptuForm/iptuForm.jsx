import React, { Component} from 'react'
import axios from 'axios'

import { Form, MaskedInput, Button, Box } from 'grommet'
import { Search } from 'grommet-icons';

class IptuForm extends Component{

    constructor(props){
        super(props)

        this.state ={
            valueIPTU: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeIPTU = this.onChangeIPTU.bind(this)
    }

    handleSubmit (){        
        const iptu = this.state.valueIPTU.replace(/./g, "")
        console.log(iptu)
        if(iptu.length < 15){
            return null
        }

       axios.get('http://bhmap-hm.pbh.gov.br/v2/api/wfs?version=2.0.0&request=GetFeature&typeName=pbh_sirgas%3AS2000_LOTE_CTM&outputFormat=application%2Fjson&CQL_FILTER=INDICE_CADASTRAL%3D%27'
                +iptu+"%27")
                .then(resp=>{
                    if(resp.data.endereco.length > 0){   
      
                        console.log(resp.data.endereco)    
                        
                    }else{
                        console.log('Nenhum endereço encontrado!')   
                    }   
                    })
                .catch(e=>{
                    console.log('Erro', e)
                })

    }


    onChangeIPTU(event){

        this.setState({valueIPTU: event.target.value})
    }

    render(){        

        return(               
            <Form>
                <Box direction="row" align="center" alignContent="center" alignSelf="center">                             
                    <Box pad="small" width="400px" align="center">
                        <MaskedInput size="xsmall"
                            mask={[
                                {
                                    length: 3,
                                    regexp: /[0-9]$/,
                                    placeholder: '___',
                                },
                                { fixed: '.' },
                                {
                                    length: 3,
                                    regexp: /[0-9]$/,
                                    placeholder: '___',
                                },
                                {
                                    length: 1,
                                    regexp: /[a-z-A-Z]$/,
                                    placeholder: '_',
                                },
                                { fixed: '.' },
                                {
                                    length: 3,
                                    regexp: /[0-9]$/,
                                    placeholder: '___',
                                },
                                {
                                    length: 1,
                                    regexp: /[' ']$/,
                                    placeholder: '_',
                                },
                                { fixed: '.' },
                                {
                                    length: 3,
                                    regexp: /[0-9]$/,
                                    placeholder: '___',
                                },
                                { fixed: '-' },
                                {
                                    length: 1,
                                    regexp: /[0-9]$/,
                                    placeholder: '_',
                                }                                
                            ]}
                            width="200px"
                            value={this.state.valueIPTU}
                            onChange={this.onChangeIPTU}
                            />                                                  
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

//const mapDispatchToProps = dispatch => bindActionCreators({ getLogradouroTypeList}, dispatch)
//export default connect( null, mapDispatchToProps)(CEPForm)
export default IptuForm