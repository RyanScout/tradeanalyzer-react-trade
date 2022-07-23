/**
 *
 */
import { getHost } from "../../../App";

export function inputChange(field, value) {
  return function (dispatch) {
    let params = {};
    params.field = field;
    params.value = value;
    dispatch({ type: "TRADE_INPUT_CHANGE", params });
  };
}

export function list() {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "TA_TRADE_SVC";
    params.requestParams.action = "LIST";
    params.URI = "/api/member/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        dispatch({ type: "TRADE_LIST", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function getCustomTechnicalIndicators() {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "TA_CACHE_SVC";
    params.requestParams.action = "LIST";
    params.URI = "/api/member/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        dispatch({ type: "TRADE_CUSTOM_TECHNICAL_INDICATORS", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function cancelItem() {
  return function (dispatch) {
    dispatch({ type: "TRADE_CANCEL_ITEM", action: {} });
  };
}

export function modifyItem(item) {
  return function (dispatch) {
    dispatch({ type: "TRADE_MODIFY_ITEM", action: item });
  };
}

export function historicalAnalysisView(item) {
  return function (dispatch) {
    dispatch({ type: "TRADE_HISTORICAL_ANALYSIS_VIEW", action: item });
  };
}

export function tradeDetailView(item) {
  return function (dispatch) {
    dispatch({ type: "TRADE_DETAIL_VIEW", action: item });
  };
}

export function tradeGraphView(item) {
  return function (dispatch) {
    dispatch({ type: "TRADE_GRAPH_VIEW", action: item });
  };
}

export function deleteItem(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "TA_TRADE_SVC";
    params.requestParams.action = "DELETE";
    params.requestParams.ITEMID = item.id;

    params.URI = "/api/member/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        dispatch(list());
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

function compare(a, b) {
  if (a.placedAt > b.placedAt) return 1;
  if (a.placedAt < b.placedAt) return -1;
  return 0;
}

export function graphItem(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "TA_TRADE_SVC";
    params.requestParams.action = "SYMBOL_DATA";
    let arr = item.tradeDetails.slice().sort(compare);
    params.requestParams.FIRST_POINT = arr[0].placedAt;
    params.requestParams.LAST_POINT = arr[arr.length - 1].placedAt;
    params.requestParams.SYMBOL = item.symbol;
    params.requestParams.EVALUATION_PERIOD = item.evaluationPeriod;

    params.URI = "/api/member/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        dispatch({ type: "TRADE_GRAPH_ITEM", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function resetItem(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "RESET";
    params.requestParams.service = "TA_TRADE_SVC";
    params.requestParams.ITEMID = item.id;

    params.URI = "/api/member/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        if (
          responseJson != null &&
          responseJson.status != null &&
          responseJson.status == "SUCCESS"
        ) {
          dispatch(list());
        } else if (
          responseJson != null &&
          responseJson.status != null &&
          responseJson.status == "ACTIONFAILED"
        ) {
          dispatch({ type: "SHOW_STATUS", error: responseJson.errors });
        }
      })
      .catch(function (error) {});
  };
}

export function saveItem(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "SAVE";
    params.requestParams.service = "TA_TRADE_SVC";
    params.requestParams.ITEM = item;

    params.URI = "/api/member/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        if (
          responseJson != null &&
          responseJson.status != null &&
          responseJson.status == "SUCCESS"
        ) {
          dispatch(list());
        } else if (responseJson != null && responseJson.status != null) {
          alert(responseJson.status);
          dispatch({ type: "SHOW_STATUS", error: responseJson.errors });
        }
      })
      .catch(function (error) {});
  };
}

export function historicallyAnalyzeSwingTrade(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "HISTORICALLY_ANALYZE_SWING_TRADE";
    params.requestParams.service = "TA_HISTORICALLY_ANALYZE_SVC";
    params.requestParams.ITEM = item;

    params.URI = "/api/member/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
          let responseMsg = { status: "ERROR", protocalError: response.status };
        } else {
          return response.json();
        }
      })
      .then((responseJson) => {
        dispatch(list());
      })
      .catch(function (error) {});
  };
}
export function historicallyAnalyzeDayTrade(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "HISTORICALLY_ANALYZE_DAY_TRADE";
    params.requestParams.service = "TA_HISTORICALLY_ANALYZE_SVC";
    params.requestParams.ITEM = item;

    params.URI = "/api/member/callService";

    const uri = getHost() + params.URI;
    let headers = new Headers();
    headers.set("Content-type", "application/json");
    if (params.auth != null) {
      headers.set("Authorization", "Basic " + params.auth);
    }
    fetch(uri, {
      method: "POST",
      credentials: "same-origin",
      headers: headers,
      body: JSON.stringify({ params: params.requestParams }),
    })
      .then(function (response) {
        if (response.status >= 400) {
        } else {
          return response.json();
        }
      })
      .then(() => {
        dispatch(list());
      })
      .catch(function () {});
  };
}
