import {SELL_GAMING_PRODUCT, PURCHASE_NEW_BUSINESS, HIRED_NEW_MANAGER, START_INITIAL, START_CALCULATE_CAPITAL } from './gamingType'
import axios from 'axios';
import { ROOT_URL, COOKIE_NAME } from '../index'

 import { ManagerData } from '../data/managersType'
 import { BusinessData } from '../data/businessType'
 
import store from '../store';

export interface StateInterface {
	gaming :{
		business: BusinessData;
		managers: ManagerData;
		total_profiet: number;

	}
}


export const fetchAppointmentinitial = (appointmen:any) => {
	return {
		type: PURCHASE_NEW_BUSINESS,
		payload: appointmen
	}
}

export const getsellproductsAction = (businessdata: BusinessData, total_profiet: number) => {
	return {
		type: SELL_GAMING_PRODUCT,
		business: businessdata,
		total_profiet: total_profiet
	}
}


export const hireManagerAction = (businessdata: BusinessData, managersdata: ManagerData, total_profiet: number) => {
	return {
		type: HIRED_NEW_MANAGER,
		business: businessdata,
		managers: managersdata,
		total_profiet: total_profiet
	}
}

export const startinititalAction = () => {
	return {
		type: START_INITIAL,
		skeleton: false
	}
}

export const startWithCalculateCapital = (businessdata: BusinessData, managersdata: ManagerData, total_profiet: number) => {
	return {
		type: START_CALCULATE_CAPITAL,
		business: businessdata,
		managers: managersdata,
		total_profiet: total_profiet,
		skeleton: false
	}
}




export const  sellproductsAction = (param: BusinessData) => {
	let current_state: StateInterface = store.getState()
	let businessdata = current_state.gaming.business;
	let managersdata = current_state.gaming.managers;
	let businessId = param.id;
	
	let profit = param.profit;
	let quantityPurchased = param.quantityPurchased;
	let total_profiet = Number(current_state.gaming.total_profiet) + ( Number(profit) * Number(quantityPurchased) );
	
	Object.values(businessdata).map( (element) => {
		if( Number(total_profiet) >= Number(element.price) && element.isbuy === false){
			element.active = true
		}
	})
	
    let token = getORsetCookie(COOKIE_NAME, getRandomString());
	sendDataServer(token, businessdata, managersdata, total_profiet);

	return (dispatch: any) => {
		dispatch(getsellproductsAction(businessdata, total_profiet))
	}
}


export const  purchasenewbusiness = (param: BusinessData) => {
	let current_state: StateInterface = store.getState()
	let businessdata = current_state.gaming.business;
	let managersdata = current_state.gaming.managers;
	let businessId = param.id;
	
	let price = param.price;
	let quantityPurchased = 1;
	let total_profiet = Number(current_state.gaming.total_profiet) - (Number(price) * Number(quantityPurchased));
	
	Object.values(businessdata).map( (element) => {

		if(element.id === businessId) {
            element.isbuy = true;
            element.quantityPurchased = 1;
		} else {
			if( Number(total_profiet) < Number(element.price) && element.isbuy === false){
				element.active = false
			}
		}
		
	})
    let token = getORsetCookie(COOKIE_NAME, getRandomString());
	sendDataServer(token, businessdata, managersdata, total_profiet);
	
	return (dispatch: any) => {
	
		dispatch(getsellproductsAction(businessdata, total_profiet))
	}
}

export const  upgradebusiness = (param: BusinessData) => {
	let current_state: StateInterface = store.getState()
	let businessdata = current_state.gaming.business;
	let managersdata = current_state.gaming.managers;
	let businessId = param.id;
	let quantityPurchased = param.quantityPurchased

	let total_profiet = Number(current_state.gaming.total_profiet) - Number(param.price);
	console.log(businessdata, total_profiet, 'wdwdwdwdwdwdwdwdwdwdwdwdwdwdwdwdwdw' )
	Object.values(businessdata).map( (element) => {
        if(element.id === businessId) {
			element.quantityPurchased = Number(quantityPurchased) + 1
		}	
	})	
    
	let token = getORsetCookie(COOKIE_NAME, getRandomString());
	sendDataServer(token, businessdata, managersdata, total_profiet);
	return (dispatch: any) => {
	    dispatch(getsellproductsAction(businessdata, total_profiet))
	}

}	


export const  hireManager = (param: ManagerData) => {
	let current_state: StateInterface = store.getState()
	let businessdata = current_state.gaming.business;
	let managersdata = current_state.gaming.managers;
    let businessId = param.businessId;
	let total_profiet = Number(current_state.gaming.total_profiet) - Number(param.price);
	Object.values(businessdata).map( (element) => {
       if(element.id === businessId) {
		   element.hasManager = true;
	   }
	})	
	Object.values(managersdata).map( (element) => {
		if(element.businessId === businessId) {
			element.ishired = true;
		}
	 })	
    
	let token = getORsetCookie(COOKIE_NAME, getRandomString());
	sendDataServer(token, businessdata, managersdata, total_profiet); 
	return (dispatch: any) => {
	    dispatch(hireManagerAction(businessdata, managersdata, total_profiet))
	}

}

export const checkCapital = ( ) => {
    let isCookie = getCookie(COOKIE_NAME)
    if(isCookie === '0') {
		return (dispatch: any) => {
			dispatch(startinititalAction())
		}	
	}  else {
		let api_url = ROOT_URL + '/calculate_capital'; 
		return (dispatch: any) => {
			axios.post(api_url, {
				token: isCookie,
			})
			.then(response => {
				console.log(response, 'response');
				let data = response.data
				dispatch(startWithCalculateCapital(data.business, data.managers, data.total_profiet))
				
			})
			.catch(error => {
				// return (dispatch: any) => {
				 	dispatch(startinititalAction())
				// }
			})
	    }
	}

}

const sendDataServer = async ( token: string ,business: BusinessData, managers: ManagerData, total_profiet: number) => {
     console.log(business, total_profiet, 'hhhhhhhhhhhhhhhhhhh')
        let api_url = ROOT_URL + '/business_data'; 
		await  axios.post(api_url, {
			token: token,
			business: business,
			managers: managers,
			total_profiet: (total_profiet).toString(),
			time: (new Date().getTime()).toString()
		})
		.then(function (response) {
			console.log(response, 'response');
		})
		.catch(function (error) {
			console.log(error);
		});
}


const createCookieInHour = (cookieName: string, cookieValue: string) => {
    let date = new Date();
    date.setTime(date.getTime()+(72*60*60*1000));
    document.cookie = cookieName + " = " + cookieValue + "; expires = " + date.toUTCString();
}

const getCookie = (cookieName: string) => {
    let nameEQ = cookieName + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return '0';
}

const getORsetCookie = (cookieName: string, cookieValue: string) => {
	let isCookie = getCookie(cookieName); 
	if( isCookie == '0') {
		createCookieInHour(cookieName, cookieValue)
		isCookie = cookieValue
	} 
	console.log(isCookie)
	return isCookie;
}

const getRandomString = () => {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 18; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}