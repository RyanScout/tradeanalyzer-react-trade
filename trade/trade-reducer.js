import { bindActionCreators } from "redux";

/**
 *
 */
export default function tradeReducer(state = {}, action) {
  const startOf2022 = 1641016800;

  let defaultItemState = {
    evaluationPeriod: "DAY",
    orderType: "Market",
    currencyType: "Dollars",
    profitLimitType: "Profit Limit Price",
    trailingStopType: "Trailing Stop Price",
    rawBuyCondition: "",
    rawSellCondition: "",
    startTime: startOf2022,
    endTime: startOf2022,
    status: "Not Running",
  };

  switch (action.type) {
    case "TRADE_INPUT_CHANGE": {
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

    case "TRADE_LIST": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let itemCount = {};
        if (action.responseJson.params.TRADECOUNT != null) {
          itemCount = action.responseJson.params.TRADECOUNT;
        }

        let items = {};
        if (action.responseJson.params.items != null) {
          items = action.responseJson.params.items;
        }

        return Object.assign({}, state, {
          itemCount: itemCount,
          items: items,
          item: {},
          view: "",
        });
      } else {
        return state;
      }
    }

    case "TRADE_CUSTOM_TECHNICAL_INDICATORS": {
      return {
        ...state,
        item: {
          ...state.item,
          customTechnicalIndicators: action.payload,
        },
      };
    }

    case "TRADE_CANCEL_ITEM": {
      let clone = Object.assign({}, state);
      clone.view = "";
      clone.item = {};
      return clone;
    }

    case "TRADE_MODIFY_ITEM": {
      if (action != null || action != undefined) {
        let item = defaultItemState;
        if (action.action != null && action.action != undefined) {
          item = Object.assign(defaultItemState, action.action);
        }
        return Object.assign({}, state, {
          item: item,
          view: "MODIFY",
        });
      } else {
        return state;
      }
    }

    case "TRADE_HISTORICAL_ANALYSIS_VIEW": {
      if (action != null) {
        let item = defaultItemState;
        if (action.action != null) {
          item = Object.assign(defaultItemState, action.action);
        }
        return Object.assign({}, state, {
          item: item,
          view: "HISTORICAL_ANALYSIS",
        });
      } else {
        return state;
      }
    }
    case "TRADE_DETAIL_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "TRADE_DETAIL",
        });
      } else {
        return state;
      }
    }

    case "INITIALIZE_TRADE_DETAILS": {
      if (action.action.params != null) {
        let item = {};
        if (state.item == null) {
          item["details"] = action.actions.params.DETAILS;
        } else {
          item = Object.assign({}, state.item);
          item["details"] = action.action.params.DETAILS;
        }
        return Object.assign({}, state, {
          item: item,
        });
      } else {
        return state;
      }
    }

    case "INITIALIZE_TRADE_SYMBOL_DATA": {
      if (action.action.params != null) {
        let item = {};
        if (state.item == null) {
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

    case "TRADE_GRAPH_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "TRADE_GRAPH",
        });
      } else {
        return state;
      }
    }

    case "TRADE_SELECT_VIEW": {
      if (action != null) {
        let field = {};
        if (action.action != null) {
          field = action.action;
        }
        return Object.assign({}, state, {
          field: field,
          view: "SELECT",
        });
      } else {
        return state;
      }
    }

    case "TRADE_SELECT_INPUT_CHANGE": {
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
          view: "MODIFY",
        });
      } else {
        return state;
      }
    }

    case "TRADE_GRAPH_ITEM": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let symbols = [];
        if (action.responseJson.params.SYMBOLS != null) {
          symbols = action.responseJson.params.SYMBOLS;
        }
        return Object.assign({}, state, {
          symbols: symbols,
        });
      }
    }

    case "TRADE_SAVE_ITEM": {
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
    default:
      return state;
  }
}
