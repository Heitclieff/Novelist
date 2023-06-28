import { SET_THEME , LOAD_THEME_FROM_STORAGE , SAVE_THEME_FROM_STORAGE } from "./action"
export interface RootState {
    collectionsDatashowcase : any
    collectionsData : any
    categoryData : any
    userData : any
    theme : any
    iscollecitonDatashowcaseLoaded : boolean,
    iscollectionLoaded  : boolean,
    isuserLoaded : boolean
    iscategoryLoaded  : boolean,
    isthemeLoaded : boolean ,
    
}

const initialState : RootState= {
    collectionsDatashowcase: [],
    collectionsData : [],
    userData : [] ,
    categoryData : [],
    theme : {},

    iscollecitonDatashowcaseLoaded : false,
    iscollectionLoaded : false,
    isuserLoaded : false,
    iscategoryLoaded : false,
    isthemeLoaded : false,
    
  };
  
 const collectionsReducer = (state = initialState, action:any) : RootState => {
    switch (action.type) {
      case 'FETCH_COLLECTIONS_DATASHOWCASE_SUCCESS':
        return {
          ...state,
          collectionsDatashowcase: action.payload,
          iscollecitonDatashowcaseLoaded : true,
        };
      case 'FETCH_COLLECTIONS_DATA_SUCCESS' :
        return {
          ...state, 
          collectionsData : action.payload,
          iscollectionLoaded : true,
        };
      case 'FETCH_CATEGORY_SUCCESS' :
        return {
          ...state, 
          categoryData : action.payload,
          iscategoryLoaded : true,
        }
      
      case 'FETCH_USERDATA_SUCCESS' :
        return {
          ...state, 
          userData : action.payload,
          isuserLoaded : true,
        }
      case SET_THEME :
        return {
          ...state, 
          theme : action.payload,
      }
      case LOAD_THEME_FROM_STORAGE :
        return {
          ...state, 
          theme : action.payload,
          isthemeLoaded : true,
      }
      case SAVE_THEME_FROM_STORAGE :
        return {
          ...state, 
          theme : action.payload,
      }

      default:
        return state;
    }

};

export default collectionsReducer;