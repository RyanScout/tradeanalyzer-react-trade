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
  payload?: any;
};

const defaultAction: DefaultAction = {
  params: {},
};

export default function databaseReducer(
  state: any = {},
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

    case "DATABASE_GRAPH_VIEW": {
      if (action != null) {
        let item = {};
        if (action.action != null) {
          item = action.action;
        }
        return Object.assign({}, state, {
          item: item,
          view: "DATABASE_GRAPH",
        });
      } else {
        return state;
      }
    }

    case "DATABASE_MODIFY_VIEW": {
      if (action != null) {
        let item = Object.assign({}, defaultItemState);
        if (action.action != null && action.action != undefined) {
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

    case "DATABASE_INITIALIZE_TECHNICAL_INDICATORS": {
      return {
        ...state,
        item: {
          ...state.item,
          technicalIndicators: action.payload,
        },
      };
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
