import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Col, Button } from 'antd';
import { sellproductsAction, purchasenewbusiness, upgradebusiness  } from '../store'
import { BusinessData } from '../store/data/businessType'

interface IProps {
    business:BusinessData;
    sellproductsAction: any;
    purchasenewbusiness: any;
    upgradebusiness: any;
    active: boolean;
    total_profiet: number;
}


interface IState {
    business: BusinessData,
    time: {
        hours: number,
        minutes: number,
        seconds: number
    };
    startTime: number;
    duration: number;
    timer: number;
    ismanager: boolean;
    loading: boolean;
    disabled: boolean;
    animationName: string;
    animationDuration: string;
  }

class Business extends Component<IProps, IState> {
    constructor( business: IProps) {
        super(business);
    let timetaken = Number(this.props.business.timeTaken) * 1000
        this.state = {
            business : this.props.business,

            duration: timetaken,
            time: {
                hours: Number((Math.floor((timetaken / (1000 * 60 * 60)) % 24)).toString().padStart(2, '0')),
                minutes: Number( (Math.floor(( timetaken / (1000 * 60)) % 60)).toString().padStart(2, '0')),
                seconds: Number((Math.floor(( timetaken / 1000) % 60)).toString().padStart(2, '0')),
               
              },
              startTime : Date.now(),
            
              timer: 0,
              ismanager: false,
              disabled: false,
              loading: true,
              animationName: '',
              animationDuration: '',
        };
      
      
    }

    componentDidMount() {
        if(this.state.business.hasManager) {
            this.sellProductAuto();
            this.setState({
                ismanager: true	
            })
        }
    }

    componentDidUpdate(previousProps: IProps, previousState: IState){
        if(previousProps.active !== this.props.active){ 
            this.setState({
                business: this.props.business	
            }) 
        }
        if(this.state.business.hasManager && !this.state.ismanager) {
            this.sellProductAuto();
            this.setState({
                ismanager: true	
            }) 
        }   
      
      
    }

    animationKeyFrm = () => {
        let styleSheet = document.styleSheets[0];
     
        let animationName = `animation${Math.round(Math.random() * 100)}`;
        
        let keyframes =
        `@-webkit-keyframes ${animationName} {
            0%   {background-color:yellow; width:0%; opacity: .3;}
            100%  {background-color:red; width:107%; opacity: .9;}
        }`;
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    
        this.setState({
        animationName: animationName
        });
    }


    /***********************  TIMER METHOD *************************/
    /***********************  TIMER METHOD *************************/

    startTimer = () => {
       
        if (this.state.timer === 0) {
            this.setState({
                startTime: Date.now(),
                timer:	window.setInterval(() => this.run(), 10)
               }) 
         
        }
      }

    msToTime = (duration: number) => {
       
        let seconds = Number((Math.floor((duration / 1000) % 60)).toString().padStart(2, '0'));
        let minutes =  Number( (Math.floor((duration / (1000 * 60)) % 60)).toString().padStart(2, '0'));
        let hours =  Number((Math.floor((duration / (1000 * 60 * 60)) % 24)).toString().padStart(2, '0'));
      
        return {
          hours,
          minutes,
          seconds
        };
    }

    run() {
        const diff = Date.now() - this.state.startTime;
        let remaining = this.state.duration - diff;
        if (remaining < 0) {
          remaining = 0;
        }
     
        this.setState({
            time: this.msToTime(remaining)
        });
        if (remaining === 0) {
            window.clearTimeout(this.state.timer);

            this.setState({
                time: {
                    hours: Number(( Math.floor((this.props.business.timeTaken / ( 60 * 60)) % 24)).toString().padStart(2, '0')),
                    minutes: Number( (Math.floor(( this.props.business.timeTaken / ( 60)) % 60)).toString().padStart(2, '0')),
                    seconds: Number((Math.floor(( this.props.business.timeTaken ) % 60)).toString().padStart(2, '0')),    
                },
                duration:  Number(this.props.business.timeTaken) * 1000,
                timer: 0
            }) 


        }
    }
    /*********************** END TIMER METHOD *************************/
    /*********************** END TIMER METHOD *************************/

    sellProduct = (event: any) => {
    
        if(!this.state.business.hasManager) {
            let timeTaken = Number(this.state.business.timeTaken) * 1000;
            this.setState({ animationDuration: timeTaken.toString(), disabled: true });
            this.animationKeyFrm();
            setTimeout(() => {
                this.props.sellproductsAction(this.state.business)
                this.setState({animationName: '', disabled: false});
            }, timeTaken);
            this.startTimer()
        }
    }

    sellProductAuto = () => {
        if(this.state.business.hasManager) {
            let timeTaken = (Number(this.state.business.timeTaken)  * 1000) + 500
            this.setState({ animationDuration: timeTaken.toString() });
            this.animationKeyFrm();
            setInterval(() => {
                this.setState({ animationDuration: timeTaken.toString() });
                this.animationKeyFrm();
                this.props.sellproductsAction(this.state.business)
            }, timeTaken);
            setInterval(() => {
                this.startTimer()
            }, 500);
        }
    }

   

    
    purchaseBusness = (event: any) => {
        let update_bus = this.state.business
        update_bus.isbuy = true
        this.setState({
            business: update_bus	
        }) 
        this.props.purchasenewbusiness(this.state.business)
       
    }

    upgradeBusines = () => {
        if(this.props.total_profiet >= this.state.business.price) {
            this.props.upgradebusiness(this.state.business)
        } 
    }


    render() {

        let style = {
            animationName: this.state.animationName,
            animationTimingFunction: 'ease-in-out',
            animationDuration: (this.state.business.timeTaken).toString() + 's',
            animationDelay: '0.0s',
            animationIterationCount: 1,
            animationDirection: 'normal',
            animationFillMode: 'forwards'
          };

       const { business, disabled } = this.state
       const computedClassName = this.state.business.active ? 'buy-please active' : 'buy-please deactive';
     
       const upgeadeStatusClass = (this.props.total_profiet >= this.state.business.price) ? 'business-down-inner first activeted' : 'business-down-inner first inactive';
         return (
            <React.Fragment>
                <Col  xs={{ span: 24 }} lg={{ span: 10 }} className="businessCard">

                    {business.isbuy ? (
                        
                        <Card bordered={false} >
                            <div className="business-top">
                                <div className="business-inner">
                                    <Button disabled={disabled}  id={business.id} value={business.profit} onClick={this.sellProduct} danger shape="circle"  size={'large'} >
                                        <i className={business.icon} ></i>
                                    </Button>
                                    <p className="quantityPurchased">{business.quantityPurchased}</p>
                                </div>
                                <div className="business-inner last " >
                                    <p>$ {business.profit}</p>
                                    <div className="slide-animation" style={style}></div>
                                </div>

                            </div>
                            <div className="business-down">
                            <div className={upgeadeStatusClass} onClick={this.upgradeBusines}>
                                    <p>Buy <sub>1x</sub></p>
                                    <p className="down-inner-p">$ {business.price} </p>
                                </div>
                                <div className="business-down-inner last">
                                    <div>
                                    {
                                        this.state.time.hours
                                    }: {
                                        this.state.time.minutes
                                    }: {
                                        this.state.time.seconds
                                    }
                                    </div>
                                </div>
                            </div>

                        </Card>


                        ) : (
                            <Card  bordered={false}  onClick={this.purchaseBusness}>
                                    <div className={computedClassName} >
                                    <p>{business.name}</p>
                                    <p>{business.price}</p>
                                </div> 
                            </Card>
                        )
                    }


                </Col>
                
            </React.Fragment>

         )

        }
}


const mapStateToProps = (state: any) => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch: any) => {
    return {
        sellproductsAction: (state: BusinessData) => dispatch(sellproductsAction(state)),
        purchasenewbusiness: (state: BusinessData) => dispatch(purchasenewbusiness(state)),
        upgradebusiness: (state: BusinessData) => dispatch(upgradebusiness(state))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
    ) (Business);