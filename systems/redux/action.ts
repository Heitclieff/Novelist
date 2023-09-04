import { AnyAction ,Dispatch } from "redux";
import {ThunkAction } from "redux-thunk";
import { RootState } from "./reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
//Data for prepair fast loading
import { CollectionsdataShowcase , Collectionsdata , Categorydata, userdata} from "../../assets/content/VisualCollectionsdata";
import { Themedark , Themelight } from "../theme/theme";

export const SET_THEME = 'SET_THEME';
export const LOAD_THEME_FROM_STORAGE = 'LOAD_THEME_FROM_STORAGE';
export const SAVE_THEME_FROM_STORAGE = 'SAVE_THEME_FROM_STORAGE';

export const getCollectionsDataShowcase = () : ThunkAction <void ,RootState, unknown , AnyAction> => {
    return (dispatch: Dispatch <AnyAction>) => {
      dispatch({ type: 'FETCH_COLLECTIONS_DATASHOWCASE_SUCCESS', payload: CollectionsdataShowcase , iscollecitonDatashowcaseLoaded : true });
    };
};

export const getCollectionData = () : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return (dispatch: Dispatch <AnyAction>) => {
    dispatch({ type: 'FETCH_COLLECTIONS_DATA_SUCCESS', payload: Collectionsdata , iscollectionLoaded : true});
  };
};

export const getuserData = () : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return (dispatch: Dispatch <AnyAction>) => {
    dispatch({ type: 'FETCH_USERDATA_SUCCESS', payload: userdata , isuserLoaded : true });
  };
};


export const getCategoryData = () : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return (dispatch: Dispatch <AnyAction>) => {
    dispatch({ type: 'FETCH_CATEGORY_SUCCESS', payload: Categorydata , iscategoryLoaded : true });
  };
};


export const setTheme = (theme:any) : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return (dispatch: Dispatch <AnyAction>) => {
    dispatch({ type: SET_THEME, payload: Themedark });
  };
};

export const loadThemefromStorage = () : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return async (dispatch: Dispatch <AnyAction>) => {
    try {
      const theme = await AsyncStorage.getItem('theme');
      const selectedTheme = theme === 'dark' ? Themedark : Themelight 
      dispatch({ 
        type: LOAD_THEME_FROM_STORAGE, 
        payload: selectedTheme,
        isthemeLoaded : true,
      });
     
    }catch(error) {
      console.log(error)
    }
  };
};

export const saveThemetoStorage = (theme:any) : ThunkAction <void , RootState , unknown ,AnyAction> => {
    return async (dispatch : Dispatch <AnyAction>) => {
      try {
        await AsyncStorage.setItem('theme',theme.themeMode)
        dispatch({type : SAVE_THEME_FROM_STORAGE , payload : theme})
      } catch(error){
        console.log(error)
      }
    }
}