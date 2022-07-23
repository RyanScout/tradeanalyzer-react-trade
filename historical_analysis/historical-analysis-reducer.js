/**
 * 
 */
 export default function historicalAnalysisReducer(state = {}, action) {
	let myState = {};
	switch(action.type) {
		case 'HISTORICAL_ANALYSIS_INPUT_CHANGE': {
			if (action.params != null) {
				let item = {};
				if (state.item == null) {
					item[action.params.field] = action.params.value;
				} else {
					item = Object.assign({}, state.item);
					item[action.params.field] = action.params.value;
				}
				return Object.assign({}, state, {
					item: item
				});
			} else {
        		return state;
    		}
    	}
		case 'HISTORICAL_ANALYSIS_LIST': {
			if (action.responseJson != null && action.responseJson.params != null) {

				let itemCount = {};
				if (action.responseJson.params.HISTORICAL_ANALYSIS_COUNT != null) {
    				itemCount = action.responseJson.params.HISTORICAL_ANALYSIS_COUNT;
  				}

				let items = {};
				if (action.responseJson.params.HISTORICAL_ANALYSES != null) {
    				items = action.responseJson.params.HISTORICAL_ANALYSES;
  				}

				return Object.assign({}, state, {
					itemCount: itemCount,
					items: items,
					item: {},
					view: ""
				});
			
			} else {
        		return state;
    		}
		}

		case 'HISTORICAL_ANALYSIS_HISTORICAL_DETAIL_VIEW':{
			if (action != null) {
				let item = {};
  				if (action.action != null) {
    				item = action.action;
  				}
				return Object.assign({}, state, {
					item: item,
					view: "HISTORICAL_DETAIL"
				});
			
			} else {
        		return state;
    		}
		}

		case 'HISTORICAL_ANALYSIS_SAVE_ITEM': {
			if (action.responseJson != null && action.responseJson.params != null) {
				let item = {};
  				if (action.responseJson.params.ITEM != null) {
    				item = action.responseJson.params.ITEM;
  				}
				return Object.assign({}, state, {
					item: item,
					view: ""
				});
			
			} else {
        		return state;
    		}
		}

		case 'HISTORICAL_ANALYSIS_CANCEL_ITEM': {
			let clone = Object.assign({}, state);
			clone.view = "";
			clone.item = {};
			return clone;
    	}

		default:
		return state;
	}
}