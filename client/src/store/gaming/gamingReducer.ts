import { SELL_GAMING_PRODUCT, PURCHASE_NEW_BUSINESS, HIRED_NEW_MANAGER, START_INITIAL, START_CALCULATE_CAPITAL } from './gamingType'

import businesses from '../data/business_data'
import managers from '../data/managers_data'

import { ManagerData } from '../data/managersType'
import { BusinessData } from '../data/businessType'

export interface StateInterfacett {
	business : BusinessData;
	managers : ManagerData;
    total_profiet: number;
	type: string;
	skeleton:boolean
  }

let initial_amount = 10;

const inititalState = {
	business: businesses,
	managers: managers,
	total_profiet: initial_amount,
	skeleton : true,
}

const gamingReducer = (state = inititalState, action: StateInterfacett) => {
	switch (action.type) {
		case SELL_GAMING_PRODUCT: return {
			...state,
			loading: false,
			business: action.business,
			total_profiet: action.total_profiet,
		}
		case PURCHASE_NEW_BUSINESS: return {
			...state,
			loading: false,
		//	business: action.payload
		}
		case HIRED_NEW_MANAGER: return {
			...state,
			loading: true,
			business: action.business,
			managers: action.managers,
			total_profiet: action.total_profiet,
		}
		case START_INITIAL: return {
			...state,
			loading: true,
			skeleton: action.skeleton
		}
		case START_CALCULATE_CAPITAL: return {
			...state,
			loading: true,
			business: action.business,
			managers: action.managers,
			total_profiet: action.total_profiet,
			skeleton: action.skeleton
		}
	
		default: return state
	}
}

export default gamingReducer