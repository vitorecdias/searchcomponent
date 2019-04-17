import React, { Component} from 'react'
import NewSelect from '../../common/template/select'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, FormField, Button, Box } from 'grommet'
import { Search } from 'grommet-icons';
import { getBairrosList } from './neighborFormActions'

class NeighborForm extends Component{

    constructor(props){
        super(props)

        this.state ={
            valueBairro: ''
        }

        this.onSelectBairro = this.onSelectBairro.bind(this)
    }
    componentWillMount(){
        this.props.getBairrosList()  
    }    
  
    handleSubmit (){        

        /*if(this.state.valueLogradouro <= 0){
            return null
        }

       axios.get(`${URLlogradouros}/?`
                +(this.state.valueType?'tipo='+this.state.valueType+'&':'')
                +(this.state.valueLogradouro?'nome='+this.state.valueLogradouro+'&':'')
                +(this.state.valueNumber?'numero='+this.state.valueNumber:''))
                .then(resp=>{
                    
                    if(resp.data.length > 0){
                        console.log('Endereços encontrados! ')      
                        for(var end in resp.data) {         
                            console.log(resp.data[end])    
                        }   
                    }else{
                        console.log('Nenhum endereços encontrado!')   
                    }   
                    })
                .catch(e=>{
                    console.log('Erro', e)
                })*/

    }

    onSelectBairro(event){

        this.setState({valueBairro: event.value})
    }

    render(){        

        return(               
            <Form > 
                <Box direction="row" align="center" alignContent="center" alignSelf="center">                             
                    <Box pad="small" width="250px" align="center">
                        <FormField component={NewSelect} options={this.props.bairrosList} onChange={this.onSelectBairro} value={this.state.valueBairro} size='xsmall'/> 
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
    bairrosList: state.neighborForm.bairrosList
})

const mapDispatchToProps = dispatch => bindActionCreators({ getBairrosList}, dispatch)
export default connect( mapStateToProps, mapDispatchToProps)(NeighborForm)