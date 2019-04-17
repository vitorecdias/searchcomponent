import React, { Component} from 'react'
import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, MaskedInput, Button, Box } from 'grommet'
import { Search } from 'grommet-icons';
import { getLogradouroTypeList } from './cepFormActions'

import {URLadress} from "../../common/consts"

class CEPForm extends Component{

    constructor(props){
        super(props)

        this.state ={
            valueCEP: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.onChangeCEP = this.onChangeCEP.bind(this)
    }

    handleSubmit (){        

        if(this.state.valueCEP.replace(".", "").replace("-", "").length < 8){
            return null
        }

       axios.get(`${URLadress}/?`
                +(this.state.valueCEP?'cep='+this.state.valueCEP.replace(".", "").replace("-", ""):''))
                .then(resp=>{
                    if(resp.data.endereco.length > 0){    
                        for(var end in resp.data.endereco) {         
                            console.log(resp.data.endereco[end])    
                        }   
                    }else{
                        console.log('Nenhum endereço encontrado!')   
                    }   
                    })
                .catch(e=>{
                    console.log('Erro', e)
                })

    }


    onChangeCEP(event){

        this.setState({valueCEP: event.target.value})
    }

    render(){        

        return(               
            <Form>
                <Box direction="row" align="center" alignContent="center" alignSelf="center">                             
                    <Box pad="small" width="300px" align="center">
                        <MaskedInput size="xsmall"
                            mask={[
                                {
                                length: 2,
                                regexp: /[0-9]$/,
                                placeholder: '__',
                                },
                                { fixed: '.' },
                                {
                                length: 3,
                                regexp: /[0-9]$/,
                                placeholder: '___',
                                },
                                { fixed: '-' },
                                {
                                length: 3,
                                regexp: /[0-9]$/,
                                placeholder: '___',
                                },
                            ]}
                            width="200px"
                            value={this.state.valueCEP}
                            onChange={this.onChangeCEP}
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

const mapStateToProps = state => ({ 
    logradouroTypeList: state.adressForm.logradouroTypeList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getLogradouroTypeList}, dispatch)
export default connect( mapStateToProps, mapDispatchToProps)(CEPForm)