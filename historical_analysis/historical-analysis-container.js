/**
 *
 */
"use-strict";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "./historical-analysis-actions";
import HistoricalAnalysisView from "../../../memberView/trade/historical_analysis/historical-analysis-view";
import HistoricalDetailView from "../../../memberView/trade/historical_analysis/historical-detail-view";

function HistoricalAnalysisContainer() {
  const historicalAnalysisState = useSelector((state) => state.historicalAnalysis);
  const appPrefs = useSelector((state) => state.appPrefs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.list());
  }, []);

  function onOption(code, item) {
    switch (code) {
      case "DELETE": {
        dispatch(actions.deleteItem(item));
        return true;
      }
      case "HISTORICAL_DETAIL_VIEW":{
        dispatch(actions.historicalDetailView(item));
        return true
      }
      case "CANCEL": {
        dispatch(actions.cancelItem(item));
      }
    }
  }

  
  if (
    historicalAnalysisState != null &&
    historicalAnalysisState.view != "HISTORICAL_DETAIL"
  ) {
    return (
      <HistoricalAnalysisView
        itemState={historicalAnalysisState}
        appPrefs={appPrefs}
        onOption={onOption}
      />
    );
  } else if(
    historicalAnalysisState != null &&
    historicalAnalysisState.view == "HISTORICAL_DETAIL"
  ){
    return (
      <HistoricalDetailView
        itemState={historicalAnalysisState}
        appPrefs={appPrefs}
        onOption={onOption}
      />
    );
  }
  else {
    return <div> Loading... </div>;
  }
}

export default HistoricalAnalysisContainer;
