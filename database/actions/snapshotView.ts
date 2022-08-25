import { getHost } from "../../../../App";

export function snapshotView(item) {
  type RequestParams = {
    action?: string;
    service?: string;
    itemId?: number;
    startTime?: number;
    endTime?: number;
  };

  type Params = {
    requestParams?: RequestParams;
    URI?: string;
    auth?: string;
  };

  return function (dispatch: any) {
    const requestParams: RequestParams = {
      action: "GET_SNAPSHOTS",
      service: "TA_CACHE_SVC",
      itemId: item.id,
    };

    const params: Params = {
      requestParams: requestParams,
      URI: "/api/member/callService",
    };

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
          const snapshots = responseJson.params.items;
          dispatch({ type: "DATABASE_SNAPSHOT_VIEW", payload: item });

          dispatch({
            type: "DATABASE_INITIALIZE_SNAPSHOTS",
            payload: snapshots,
          });
        } else if (responseJson != null && responseJson.status != null) {
          alert(responseJson.status);
          dispatch({ type: "SHOW_STATUS", error: responseJson.errors });
        }
      })
      .catch(function (error) {});
  };
}
