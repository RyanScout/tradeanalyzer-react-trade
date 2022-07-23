import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./database-actions";
import DatabaseDetailView from "../../../memberView/trade/database/database-detail-view";
import DatabaseModifyView from "../../../memberView/trade/database/database-modify-view";
import DatabaseSymbolView from "../../../memberView/trade/database/database-symbol-view";
import DatabaseView from "../../../memberView/trade/database/database-view";

function DatabaseContainer() {
  const databaseState = useSelector((state) => state.database);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.list());
  }, []);

  function onOption(code, item) {
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
      case "SYMBOL_VIEW":
        dispatch(actions.databaseSymbolView(item));
        return true;
      case "DETAIL_VIEW":
        dispatch(actions.databaseDetailView(item));
        return true;
      case "MODIFY_VIEW":
        dispatch(actions.databaseModifyView(item));
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

  if (
    databaseState != null &&
    databaseState.view != "DATABASE_DETAIL" &&
    databaseState.view != "DATABASE_MODIFY" &&
    databaseState.view != "DATABASE_SYMBOL"
  ) {
    return (
      <DatabaseView
        onOption={onOption}
        itemState={databaseState}
        inputChange={inputChange}
      />
    );
  } else if (databaseState.view == "DATABASE_MODIFY") {
    return (
      <DatabaseModifyView
        onOption={onOption}
        itemState={databaseState}
        inputChange={inputChange}
        manuallyInputChange={manuallyInputChange}
      />
    );
  } else if (databaseState.view == "DATABASE_SYMBOL") {
    return (
      <DatabaseSymbolView
        onOption={onOption}
        itemState={databaseState}
        inputChange={inputChange}
      />
    );
  } else if (databaseState.view == "DATABASE_DETAIL") {
    return <DatabaseDetailView onOption={onOption} itemState={databaseState} />;
  } else {
    return <div> Loading... </div>;
  }
}

export default DatabaseContainer;
