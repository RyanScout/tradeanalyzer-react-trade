import { bindActionCreators } from "redux";

export default function databaseReducer(state = {}, action) {
  let defaultItemState = {
    evaluationPeriod: "DAY",
    shortSMAType: "15",
    longSMAType: "50",
    lbbType: "20",
    ubbType: "20",
    standardDeviations: "2",
  };

  switch (action.type) {
    case "DATABASE_BACKLOAD": {
      return state;
    }

    case "DATABASE_INPUT_CHANGE": {
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
    case "DATABASE_LIST": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let itemCount = {};
        if (action.responseJson.params.ITEMCOUNT != null) {
          itemCount = action.responseJson.params.ITEMCOUNT;
        }

        let items = [];
        if (action.responseJson.params.ITEMS != null) {
          items = action.responseJson.params.ITEMS;
          items.forEach((item) => {
            if (item.symbols != null) {
              for (let i = 0; i < item.symbols.length; i++) {
                item.symbols[i] = item.symbols[i].symbol;
              }
            }
            if (item.evaluationPeriod != null) {
              if (item.longSMAType != null) {
                item.longSMAType = item.longSMAType.substring(
                  0,
                  item.longSMAType.length - item.evaluationPeriod.length - 1
                );
              }
              if (item.shortSMAType != null) {
                item.shortSMAType = item.shortSMAType.substring(
                  0,
                  item.shortSMAType.length - item.evaluationPeriod.length - 1
                );
              }
              if (item.lbbtype != null) {
                item.lbbType = item.lbbtype.substring(
                  0,
                  item.lbbtype.length - item.evaluationPeriod.length - 1
                );
              }
              if (item.ubbtype != null) {
                item.ubbType = item.ubbtype.substring(
                  0,
                  item.ubbtype.length - item.evaluationPeriod.length - 1
                );
              }
            }
          });
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

    case "DATABASE_CACHE": {
      if (action.responseJson != null && action.responseJson.params != null) {
        let cache = new Object();
        let goldenCross = new Object();
        let lowerBollingerBand = new Object();
        let upperBollingerBand = new Object();
        if (state.cache != null) {
          cache = state.cache;
          if (state.cache.goldenCross != null) {
            goldenCross = state.cache.goldenCross;
          }
          if (state.cache.lowerBollingerBand != null) {
            lowerBollingerBand = state.cache.lowerBollingerBand;
          }
          if (state.cache.upperBollingerBand != null) {
            upperBollingerBand = state.cache.upperBollingerBand;
          }
        }

        if (action.responseJson.params.GOLDEN_CROSS_DAY != null) {
          goldenCross["day"] = action.responseJson.params.GOLDEN_CROSS_DAY;
        }
        if (action.responseJson.params.GOLDEN_CROSS_MINUTE != null) {
          goldenCross["minute"] =
            action.responseJson.params.GOLDEN_CROSS_MINUTE;
        }
        cache["goldenCross"] = goldenCross;

        if (action.responseJson.params.LOWER_BOLLINGER_BAND_DAY != null) {
          lowerBollingerBand["day"] =
            action.responseJson.params.LOWER_BOLLINGER_BAND_DAY;
        }
        if (action.responseJson.params.LOWER_BOLLINGER_BAND_MINUTE != null) {
          lowerBollingerBand["minute"] =
            action.responseJson.params.LOWER_BOLLINGER_BAND_MINUTE;
        }
        cache["lowerBollingerBand"] = lowerBollingerBand;

        if (action.responseJson.params.UPPER_BOLLINGER_BAND_DAY != null) {
          upperBollingerBand["day"] =
            action.responseJson.params.UPPER_BOLLINGER_BAND_DAY;
        }
        if (action.responseJson.params.UPPER_BOLLINGER_BAND_MINUTE != null) {
          upperBollingerBand["minute"] =
            action.responseJson.params.UPPER_BOLLINGER_BAND_MINUTE;
        }
        cache["upperBollingerBand"] = upperBollingerBand;

        return Object.assign({}, state, {
          cache: cache,
          view: "",
        });
      } else {
        return state;
      }
    }

    case "DATABASE_DETAIL_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "DATABASE_DETAIL",
        });
      } else {
        return state;
      }
    }

    case "DATABASE_SYMBOL_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "DATABASE_SYMBOL",
        });
      } else {
        return state;
      }
    }

    case "DATABASE_MODIFY_VIEW": {
      if (action != null) {
        let item = defaultItemState;
        if (action.action != null) {
          item = Object.assign(item, action.action);
        }
        return Object.assign({}, state, {
          item: item,
          view: "DATABASE_MODIFY",
        });
      } else {
        return state;
      }
    }
    case "DATABASE_CANCEL_ITEM": {
      let clone = Object.assign({}, state);
      clone.view = "";
      clone.item = {};
      return clone;
    }

    default:
      return state;
  }
}
