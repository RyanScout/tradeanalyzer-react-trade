import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./database-actions";
import DatabaseDetailView from "../../../memberView/trade/database/database-detail-view";
import DatabaseModifyView from "../../../memberView/trade/database/database-modify-view";
import DatabaseSymbolView from "../../../memberView/trade/database/database-detail-view";
import DatabaseView from "../../../memberView/trade/database/database-view";
import DatabaseGraphView from "../../../memberView/trade/database/database-graph-view";
import { createSnapshot } from "./actions/createSnapshot";
import DatabaseSnapshotView from "../../../memberView/trade/database/database-snapshot-view";
import { snapshotView } from "./actions/snapshotView";

function DatabaseContainer() {
  const databaseState = useSelector((state: any) => state.database);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.list());
  }, []);

  function onOption(code: string, item?: any) {
    switch (code) {
      case "SAVE": {
        onSave();
        return true;
      }
      case "DELETE":
        dispatch(actions.deleteItem(item));
        return true;
      case "BACKLOAD":
        dispatch(actions.backload(item));
        return true;
      case "CREATE_GLOBALS":
        dispatch(actions.createGlobals());
        return true;
      case "GET_SYMBOL":
        dispatch(actions.getSymbol(item.tradeSignal, item.symbol));
        return true;
      case "GRAPH_VIEW":
        dispatch(actions.databaseGraphView(item));
        return true;
      case "DETAIL_VIEW":
        dispatch(actions.databaseDetailView(item));
        return true;
      case "SNAPSHOT_VIEW":
        dispatch(snapshotView(item));
        return true;
      case "MODIFY_VIEW":
        dispatch(actions.databaseModifyView(item));
        return true;
      case "CREATE_SNAPSHOT":
        dispatch(createSnapshot(item));
        return true;
      case "CANCEL": {
        dispatch(actions.cancelItem());
        return true;
      }
    }
  }

  function onSave() {
    if (databaseState.item != null) {
      dispatch(actions.saveItem(databaseState.item));
    }
  }

  function inputChange(event) {
    let val = "";

    if (event != null) {
      if (event.target != null) {
        val = event.target.value;
      } else val = event;
      let field = event.target.id;
      dispatch(actions.inputChange(field, val));
    }
  }

  function manuallyInputChange(field, value) {
    dispatch(actions.inputChange(field, value));
  }

  if (databaseState === null || databaseState === undefined) {
    return <div> Loading... </div>;
  }

  switch (databaseState.view) {
    case "DATABASE_MODIFY": {
      return (
        <DatabaseModifyView
          onOption={onOption}
          itemState={databaseState}
          inputChange={inputChange}
          manuallyInputChange={manuallyInputChange}
        />
      );
    }
    case "DATABASE_SNAPSHOT": {
      return (
        <DatabaseSnapshotView
          onOption={onOption}
          itemState={databaseState}
          inputChange={inputChange}
        />
      );
    }
    case "DATABASE_DETAIL": {
      return (
        <DatabaseDetailView
          onOption={onOption}
          itemState={databaseState}
          inputChange={inputChange}
        />
      );
    }
    case "DATABASE_GRAPH": {
      return (
        <DatabaseGraphView onOption={onOption} itemState={databaseState} />
      );
    }
    default: {
      return (
        <DatabaseView
          onOption={onOption}
          itemState={databaseState}
          inputChange={inputChange}
        />
      );
    }
  }
}

export default DatabaseContainer;
