import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkCapital  } from '../store'
import Business from './Business' // component 
import { BusinessData } from '../store/data/businessType'
import { Row, Skeleton } from 'antd';

interface IProps {
    business: BusinessData;
    total_profiet: number;
    skeleton: boolean;
    checkCapital: any
}



interface IState {
    business: BusinessData;
    loading: boolean;
  }

class Home extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
    
        this.state = {
            business : this.props.business,
            loading: true,
        };

        
    }

    componentDidMount() {
        this.props.checkCapital()
    }
    componentDidUpdate(previousProps: IProps, previousState: IState){
        if(previousProps.total_profiet !== this.props.total_profiet){ 
            this.setState({
                business: this.props.business	
               }) 
         }
         
         if(this.state.loading) {
            this.setState({
                loading: this.props.skeleton	
               }) 
         }

     }
  

    render() {
        const { loading, business } = this.state;
        return (
            <>
            <Skeleton loading={loading} active>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <h2 className="totalprofitClass">Total Profit - $ {this.props.total_profiet}</h2>
                    <div className="site-card-wrapper">
                        <Row justify="space-around" gutter={12} >
                            {
                                Object.values(business).map( (busines, index) => {
                                    return  <Business  key={busines.id} business={busines} active={busines.active} 
                                    total_profiet={this.props.total_profiet}  />
                                })

                            }
                        </Row>
                    </div>
                </div> 
            </Skeleton>   
            <Skeleton loading={loading} active />    
            </>     
        );
    }
}


const mapStateToProps = (state: any) => {
    return {
        business: state.gaming.business,
        total_profiet: state.gaming.total_profiet,
        skeleton: state.gaming.skeleton,
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        checkCapital: () => dispatch(checkCapital())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    ) (Home);
