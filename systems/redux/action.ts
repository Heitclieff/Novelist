import { AnyAction ,Dispatch } from "redux";
import {ThunkAction } from "redux-thunk";
import { RootState } from "./reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Themedark , Themelight } from "../theme/theme";

export const SET_THEME = 'SET_THEME';
export const LOAD_THEME_FROM_STORAGE = 'LOAD_THEME_FROM_STORAGE';
export const SAVE_THEME_FROM_STORAGE = 'SAVE_THEME_FROM_STORAGE';



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


// export const fetchTopNew = (topnew:any): ThunkAction<void, RootState, unknown, AnyAction> => {
//   return async (dispatch: Dispatch<AnyAction>) => {
//     try {
//       if (topnew) {
//         dispatch({ type: 'FETCH_TOP_NEW', payload: topnew})
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const fetchHotNew = (hotnew:any): ThunkAction<void, RootState, unknown, AnyAction> => {
//   return async (dispatch: Dispatch<AnyAction>) => {
//     try {
//       if (hotnew) {
//         dispatch({ type: 'FETCH_HOT_NEW', payload: hotnew})
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const fetchMostview = (mostview:any): ThunkAction<void, RootState, unknown, AnyAction> => {
//   return async (dispatch: Dispatch<AnyAction>) => {
//     try {
//       if (mostview) {
//         dispatch({ type: 'FETCH_MOST_VIEW', payload: mostview})
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const getCategoryData = (Cate:any) : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return (dispatch: Dispatch <AnyAction>) => {
    dispatch({ type: 'FETCH_CATEGORY_SUCCESS', payload: Cate, iscategoryLoaded : true });
  };
};

export const fetchLibraryData = (libra:any) : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return (dispatch: Dispatch <AnyAction>) => {
    dispatch({ type: 'FETCH_LIBRARY_SUCCESS', payload: libra, iscategoryLoaded : true });
  };
};

export const fetchCreaterData = (creater:any) : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return (dispatch: Dispatch <AnyAction>) => {
    dispatch({ type: 'FETCH_CREATER_SUCCESS', payload: creater, iscategoryLoaded : true });
  };
};

export const setUser = (user:any): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      if (user) {
        dispatch({ type: 'SET_USER', payload: user , isuserLoaded : true})
        // console.log('002')
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const setCategory = (category:any): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch({ type: 'SET_CATEGORY', payload: category , isuserLoaded : true})
    } catch (error) {
      console.log(error);
    }
  };
};

export const clearUser = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ type: 'CLEAR_USER', isuserLoaded : false});
      // console.log('001')
    } catch (error) {
      console.log(error);
    }
  };
};

export const getuserData = () : ThunkAction <void ,RootState, unknown , AnyAction> => {
  return async (dispatch: Dispatch <AnyAction>, getState: () => RootState) => {
    const { userData } = getState();
    dispatch({ type: 'FETCH_USERDATA_SUCCESS', payload: userData , isuserLoaded : true });
  };
};

// export const setChaptercontent = (content:any ,id:string): ThunkAction<void, RootState, unknown, AnyAction> => {

export const setMylibrary = (book:any): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ 
        type: 'SET_MY_LIBRARY', 
        payload : book,
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const setMybookmarks = (slot:any , dockey:any): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ 
        type: 'SET_MY_BOOKMARKS', 
        payload : slot, dockey
      });
    } catch (error) {
      console.log(error);
    }
  };
};



export const setTagSection = (tags:any): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ 
        type: 'SET_TAGS_SECTION', 
        payload :tags , 
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const setTags = (tags:any): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ 
        type: 'SET_TAGS', 
        payload :tags , 
      });
    } catch (error) {
      console.log(error);
    }
  };
}


export const setTempleteCache = (content:any ,path : string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ 
        type: 'SET_TEMPLETE', 
        payload :content , path
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export const setCategoryCache = (category:any , option : string): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
        dispatch({ type: 'SET_CATEGORY_CACHE', payload: category , option , isuserLoaded : true})
    } catch (error) {
      console.log(error);
    }
  };
};

export const setProjectDocument = (docs:any , id:string): ThunkAction<void, RootState, unknown, AnyAction> => {

  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ 
        type: 'PROJECT_DOCUMENT', 
        payload :docs , id
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const setChaptercontent = (content:any ,id:string , teams:any): ThunkAction<void, RootState, unknown, AnyAction> => {

  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ 
        type: 'CHAPTER_CONTENT', 
        payload :content , 
        id,
        teams
      });
    } catch (error) {
      console.log(error);
    }
  };
};


export const setProjectTeams = (teams:any): ThunkAction<void, RootState, unknown, AnyAction> => {

  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      dispatch({ 
        type: 'SET_PROJECT_TEAMS', 
        payload : teams,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
