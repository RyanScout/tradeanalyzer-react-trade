/**
 *
 */
import { getHost } from "../../../App";

export function inputChange(field, value) {
  return function (dispatch) {
    let params = {};
    params.field = field;
    params.value = value;
    dispatch({ type: "HISTORICAL_ANALYSIS_INPUT_CHANGE", params });
  };
}

export function list() {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "TA_TRADE_SVC";
    params.requestParams.action = "HISTORICAL_ANALYSIS_LIST";
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
        dispatch({ type: "HISTORICAL_ANALYSIS_LIST", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function historicalDetailView(item) {
  return function (dispatch) {
    dispatch({
      type: "HISTORICAL_ANALYSIS_HISTORICAL_DETAIL_VIEW",
      action: item,
    });
  };
}

export function cancelItem() {
  return function (dispatch) {
    dispatch({ type: "HISTORICAL_ANALYSIS_CANCEL_ITEM" });
  };
}

export function deleteItem(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "TA_HISTORICAL_ANALYSIS_SVC";
    params.requestParams.action = "DELETE";
    params.requestParams.itemId = item.id;

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

export function historicalAnalysisDetailView(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "GET_TRADE_DETAILS";
    params.requestParams.service = "TA_TRADE_SVC";
    params.requestParams.itemId = item.id;

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
          dispatch({ type: "HISTORICAL_ANALYSIS_DETAIL_VIEW", action: item });
          dispatch({
            type: "INITIALIZE_HISTORICAL_ANALYSIS_DETAILS",
            action: responseJson,
          });
        } else if (responseJson != null && responseJson.status != null) {
          alert(responseJson.status);
          dispatch({ type: "SHOW_STATUS", error: responseJson.errors });
        }
      })
      .catch(function (error) {});
  };
}

export function historicalAnalysisGraphView(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "GET_GRAPH_DATA";
    params.requestParams.service = "TA_TRADE_SVC";
    params.requestParams.itemId = item.id;

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
          dispatch({ type: "HISTORICAL_ANALYSIS_GRAPH_VIEW", action: item });
          dispatch({
            type: "INITIALIZE_HISTORICAL_ANALYSIS_DETAILS",
            action: responseJson,
          });
          dispatch({
            type: "INITIALIZE_HISTORICAL_ANALYSIS_SYMBOL_DATA",
            action: responseJson,
          });
        } else if (responseJson != null && responseJson.status != null) {
          alert(responseJson.status);
          dispatch({ type: "SHOW_STATUS", error: responseJson.errors });
        }
      })
      .catch(function (error) {});
  };
}
