import React, { Component } from 'react';
import { Modal, Button, Card, Col, Row  } from 'antd';
import { connect } from 'react-redux';
import { hireManager  } from '../store'
import { ManagerData } from '../store/data/managersType'

interface IProps {
    managers: ManagerData;
    visible: boolean;
    total_profiet: number;
    parentCallback: any;
    hireManager: any;
}

interface IState {
    managers: ManagerData;
    loading: boolean;
    visible: boolean;
}

class Managers extends Component<IProps, IState> {
    constructor(visible: IProps) {
        super(visible);
    
        this.state = {
          managers: this.props.managers,  
          loading: false,
          visible: false,
        };
        
    }

    componentDidUpdate(previousProps: IProps, previousState: IState){
        if(previousProps.visible !== this.props.visible){ 
            this.setState({
                visible: this.props.visible	
               }) 
         }

         if(previousProps.total_profiet !== this.props.total_profiet){ 
            this.setState({
                managers: this.props.managers	
               }) 
         }
    }


    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, visible: false });

          this.props.parentCallback(this.state.visible);
        }, 500);
    };

    handleCancel = () => {
        this.setState({ visible: false });
        this.props.parentCallback(false);
      };
     
      hairedAmanagers = (e:any, manager: ManagerData) => {
     //   let data = event.target.parentNode.getAttribute("id")
        if(this.props.total_profiet >= manager.price) {
            console.log(manager, 'ssssssssssssss');
            console.log(manager.businessId, 'ssssssssssssss');
            this.props.hireManager(manager)
            this.setState({ visible: false });
            this.props.parentCallback(false);
        }
      }

    render() {
        const { visible, loading } = this.state;
        return (
            <Modal
                    visible={visible}
                  
                  
                    onCancel={this.handleOk}
                    footer={[
                       
                      ]}
                    >
                       
                   <Row justify="space-around" gutter={24}>
                        {
                            Object.values(this.state.managers).map( (manager, index) => {

                                const managerCardClass = (this.props.total_profiet >= manager.price) ? 'managersCard active' : 'managersCard inactive';
                                if(!manager.ishired) {
                                    return (
                                      
                                            <Col span={24}   className={managerCardClass}  key={manager.businessId} id={manager.businessId}  onClick={((e) => this.hairedAmanagers(e, manager))}>
                                                <Card bordered={false} >
                                                    <p>{manager.name}</p>
                                                    <span>{manager.description}</span>
                                                    <p>{manager.price}</p>  
                                                </Card>
                                            </Col>  
                                     
                                    
                                    )
                                }
                            })

                        }
                    </Row>
            </Modal>
        )

    }



}

const mapStateToProps = (state: any) => {
    return {
        managers: state.gaming.managers,
        total_profiet: state.gaming.total_profiet,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        hireManager: (state: ManagerData) => dispatch(hireManager(state))
    }
}


export default  connect(
    mapStateToProps,
    mapDispatchToProps
    ) (Managers);