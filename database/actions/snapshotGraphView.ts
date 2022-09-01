import { getHost } from "../../../../App";
import { list } from "../database-actions";

type RequestParams = {
  action: string;
  service: string;
  itemId: number;
  startTime?: number;
  endTime?: number;
};

type Params = {
  requestParams: RequestParams;
  URI: string;
  auth?: string;
};

type Snapshot = {
  id: number;
  firstCheck: number;
  lastCheck: number;
};

export function snapshotGraphView(snapshot: Snapshot) {
  return function (dispatch) {
    const requestParams: RequestParams = {
      action: "GET_SNAPSHOT_DETAILS",
      service: "TA_CACHE_SVC",
      itemId: snapshot.id,
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
          const details = responseJson.params.items;
          dispatch({
            type: "DATABASE_SNAPSHOT_GRAPH",
            payload: {
              details: details,
              snapshot: snapshot,
            },
          });
        } else if (responseJson != null && responseJson.status != null) {
          alert(responseJson.status);
          dispatch({ type: "SHOW_STATUS", error: responseJson.errors });
        }
      })
      .catch(function (error) {});
  };
}
