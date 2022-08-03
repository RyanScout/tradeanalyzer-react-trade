import { zhCN } from "date-fns/locale";
import { bindActionCreators } from "redux";

type DefaultItemState = {
  item?: any;
  evaluationPeriod?: string;
  shortSMAEvaluationDuration?: number;
  longSMAEvaluationDuration?: number;
  lbbEvaluationDuration?: number;
  ubbEvaluationDuration?: number;
  standardDeviations?: number;
  view?: string;
  items?: any[];
};

const defaultItemState: DefaultItemState = {
  item: {},
  evaluationPeriod: "DAY",
  shortSMAEvaluationDuration: 15,
  longSMAEvaluationDuration: 50,
  lbbEvaluationDuration: 20,
  ubbEvaluationDuration: 20,
  standardDeviations: 2,
};

type DefaultAction = {
  params?: any;
  type?: any;
  responseJson?: any;
  action?: any;
};

const defaultAction: DefaultAction = {
  params: {},
};

export default function databaseReducer(
  state: DefaultItemState = defaultItemState,
  action: DefaultAction = defaultAction
) {
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
        if (action.responseJson.params.itemCount != null) {
          itemCount = action.responseJson.params.itemCount;
        }

        let items: any[] = [];
        if (action.responseJson.params.items != null) {
          items = action.responseJson.params.items;
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
      const clone = Object.assign({}, state, {
        item: {},
        view: "",
      });
      return clone;
    }

    default:
      return state;
  }
}
