import { AnyAction ,Dispatch } from "redux";
import {ThunkAction } from "redux-thunk";
import { RootState } from "./reducer";

//Data for prepair fast loading
import { CollectionsdataShowcase , Collectionsdata } from "../../assets/VisualCollectionsdata";
import { Themedark } from "../theme";

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

export const getCollectionsDataShowcase = () : ThunkAction <void ,RootState, unknown , AnyAction> => {
    return (dispatch: Dispatch <AnyAction>) => {
      dispatch({ type: 'FETCH_COLLECTIONS_DATASHOWCASE_SUCCESS', payload: CollectionsdataShowcase });
    };
};

export const getCollectionData = () : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return (dispatch: Dispatch <AnyAction>) => {
    dispatch({ type: 'FETCH_COLLECTIONS_DATA_SUCCESS', payload: Collectionsdata });
  };
};

export const getTheme = () : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return (dispatch: Dispatch <AnyAction>) => {
    dispatch({ type: 'FETCH_THEME_SUCCESS', payload: Themedark });
  };
};