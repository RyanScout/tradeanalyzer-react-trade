import { getHost } from "../../../App";

export function inputChange(field, value) {
  return function (dispatch) {
    let params = {};
    params.field = field;
    params.value = value;
    dispatch({ type: "DATABASE_INPUT_CHANGE", params });
  };
}

export function createGlobals() {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "CREATE_GLOBALS";
    params.requestParams.service = "TA_CACHE_SVC";

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
          dispatch(cancelItem());
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
    params.requestParams.service = "TA_CUSTOM_TECHNICAL_INDICATOR_SVC";
    let clone = Object.assign({}, item);
    clone.shortSMAType =
      clone.shortSMAType + "-" + clone.evaluationPeriod.toLowerCase();
    clone.longSMAType =
      clone.longSMAType + "-" + clone.evaluationPeriod.toLowerCase();
    clone.lbbType = clone.lbbType + "-" + clone.evaluationPeriod.toLowerCase();
    clone.ubbType = clone.ubbType + "-" + clone.evaluationPeriod.toLowerCase();
    params.requestParams.item = clone;

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
export function deleteItem(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "DELETE";
    params.requestParams.service = "TA_CUSTOM_TECHNICAL_INDICATOR_SVC";
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
          dispatch(list());
        } else if (responseJson != null && responseJson.status != null) {
          alert(responseJson.status);
          dispatch({ type: "SHOW_STATUS", error: responseJson.errors });
        }
      })
      .catch(function (error) {});
  };
}

export function backload(item) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "BACKLOAD";
    params.requestParams.service = "TA_CACHE_SVC";
    params.requestParams.itemId = item.id;
    params.requestParams.DAYS_TO_BACKLOAD = 50;

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

export function getSymbol(tradeSignal, symbol) {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.action = "ITEM";
    params.requestParams.service = "TA_CACHE_SVC";
    params.requestParams.SYMBOL = symbol;
    params.requestParams.TRADE_SIGNAL = tradeSignal;

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
        dispatch({ type: "DATABASE_CACHE", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function getCache() {
  return function (dispatch) {
    let params = {};
    params.requestParams = {};
    params.requestParams.service = "TA_CACHE_SVC";
    params.requestParams.action = "LIST_GENERALS";
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
        dispatch({ type: "DATABASE_CACHE", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function list() {
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
        dispatch({ type: "DATABASE_LIST", responseJson });
        if (info != null) {
          dispatch({ type: "SHOW_STATUS", info: info });
        }
      })
      .catch(function (error) {});
  };
}

export function databaseDetailView(item) {
  return function (dispatch) {
    dispatch({ type: "DATABASE_DETAIL_VIEW", action: item });
  };
}

export function databaseSymbolView(item) {
  return function (dispatch) {
    dispatch({ type: "DATABASE_SYMBOL_VIEW", action: item });
  };
}

export function databaseModifyView(item) {
  return function (dispatch) {
    dispatch({ type: "DATABASE_MODIFY_VIEW", action: item });
  };
}

export function cancelItem() {
  return function (dispatch) {
    dispatch({ type: "DATABASE_CANCEL_ITEM" });
  };
}
