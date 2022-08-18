/**
 *
 */
"use-strict";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as historicalAnalysisActions from "./historical-analysis-actions";
import HistoricalAnalysisView from "../../../memberView/trade/historical_analysis/historical-analysis-view";
import HistoricalDetailView from "../../../memberView/trade/historical_analysis/historical-analysis-detail-view";
import HistoricalAnalysisGraphView from "../../../memberView/trade/historical_analysis/historical-analysis-graph-view";

function HistoricalAnalysisContainer() {
  const historicalAnalysisState = useSelector(
    (state) => state.historicalAnalysis
  );
  const appPrefs = useSelector((state) => state.appPrefs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(historicalAnalysisActions.list());
  }, []);

  function onOption(code, item) {
    switch (code) {
      case "DELETE": {
        dispatch(historicalAnalysisActions.deleteItem(item));
        return true;
      }
      case "HISTORICAL_ANALYSIS_DETAIL_VIEW": {
        dispatch(historicalAnalysisActions.historicalAnalysisDetailView(item));
        return true;
      }
      case "HISTORICAL_ANALYSIS_GRAPH_VIEW": {
        dispatch(historicalAnalysisActions.historicalAnalysisGraphView(item));
        return true;
      }
      case "CANCEL": {
        dispatch(historicalAnalysisActions.cancelItem(item));
        return true;
      }
    }
  }

  if (
    historicalAnalysisState === null ||
    historicalAnalysisState === undefined
  ) {
    return <div> Loading... </div>;
  }

  switch (historicalAnalysisState.view) {
    case "HISTORICAL_ANALYSIS_DETAIL":
      return (
        <HistoricalDetailView
          itemState={historicalAnalysisState}
          appPrefs={appPrefs}
          onOption={onOption}
        />
      );
    case "HISTORICAL_ANALYSIS_GRAPH":
      return (
        <HistoricalAnalysisGraphView
          itemState={historicalAnalysisState}
          appPrefs={appPrefs}
          onOption={onOption}
        />
      );
    default:
      return (
        <HistoricalAnalysisView
          itemState={historicalAnalysisState}
          appPrefs={appPrefs}
          onOption={onOption}
        />
      );
  }
}

export default HistoricalAnalysisContainer;
