/**
 *
 */
export default function historicalAnalysisReducer(state = {}, action) {
  let myState = {};
  switch (action.type) {
    case "HISTORICAL_ANALYSIS_INPUT_CHANGE": {
      if (action.params != null) {
        let item = {};
        if (state.item == null) {
          item[action.params.field] = action.params.value;
        } else {
          item = Object.assign({}, state.item);
          item[action.params.field] = action.params.value;
        }
        return Object.assign({}, state, {
          item: item,
        });
      } else {
        return state;
      }
    }
    case "HISTORICAL_ANALYSIS_LIST": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let items = {};
        if (action.responseJson.params.items != null) {
          items = action.responseJson.params.items;
        }

        return Object.assign({}, state, {
          items: items,
          item: {},
          view: "",
        });
      } else {
        return state;
      }
    }

    case "HISTORICAL_ANALYSIS_HISTORICAL_DETAIL_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "HISTORICAL_DETAIL",
        });
      } else {
        return state;
      }
    }

    case "HISTORICAL_ANALYSIS_SAVE_ITEM": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let item = {};
        if (action.responseJson.params.item != null) {
          item = action.responseJson.params.item;
        }
        return Object.assign({}, state, {
          item: item,
          view: "",
        });
      } else {
        return state;
      }
    }

    case "HISTORICAL_ANALYSIS_CANCEL_ITEM": {
      let clone = Object.assign({}, state);
      clone.view = "";
      clone.item = {};
      return clone;
    }

    case "HISTORICAL_ANALYSIS_GRAPH_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "HISTORICAL_ANALYSIS_GRAPH",
        });
      } else {
        return state;
      }
    }

    case "HISTORICAL_ANALYSIS_DETAIL_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "HISTORICAL_ANALYSIS_DETAIL",
        });
      } else {
        return state;
      }
    }

    case "INITIALIZE_HISTORICAL_ANALYSIS_DETAILS": {
      if (action.action.params != null) {
        let item = {};
        if (state.item === null || state.item === undefined) {
          item["details"] = action.actions.params.DETAILS;
        } else {
          let details = action.action.params.DETAILS;
          item = Object.assign({}, state.item, { details: details });
        }
        return Object.assign({}, state, {
          item: item,
        });
      } else {
        return state;
      }
    }

    case "INITIALIZE_HISTORICAL_ANALYSIS_SYMBOL_DATA": {
      if (action.action.params != null) {
        let item = {};
        if (state.item === null || state.item === undefined) {
          item["symbolData"] = action.actions.params.SYMBOL_DATA;
        } else {
          item = Object.assign({}, state.item);
          item["symbolData"] = action.action.params.SYMBOL_DATA;
        }
        return Object.assign({}, state, {
          item: item,
        });
      } else {
        return state;
      }
    }

    default:
      return state;
  }
}
