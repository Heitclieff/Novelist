import { SET_THEME , LOAD_THEME_FROM_STORAGE , SAVE_THEME_FROM_STORAGE } from "./action"
export interface RootState {
    collectionMostview : any
    collectionHotNew : any
    collectionTopNew : any
    categoryData : any
    libraryData : any
    createrData : any
    userData : any
    docs : any
    theme : any
    tags :any
    tagitem :any

    iscollectionMostviewLoaded : boolean,
    iscollectionHotNewLoaded : boolean,
    iscollectionTopNewLoaded : boolean,
    iscategoryLoaded  : boolean,
    islibraryLoaded : boolean,
    iscreaterLoaded : boolean,
    isuserLoaded : boolean
    isthemeLoaded : boolean ,
    
}

const initialState : RootState= {
    collectionMostview : [],
    collectionHotNew : [],
    collectionTopNew : [],
    categoryData : [],
    libraryData : [],
    createrData : [],
    userData : [] ,
    tags : {},
    docs : {},
    tagitem : {},
    theme : {},

    iscollectionMostviewLoaded : false,
    iscollectionHotNewLoaded : false,
    iscollectionTopNewLoaded : false,
    iscategoryLoaded : false,
    islibraryLoaded : false,
    iscreaterLoaded : false,
    isuserLoaded : false,
    isthemeLoaded : false,
    
  };
  
 const collectionsReducer = (state = initialState, action:any) : RootState => {
    switch (action.type) {
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
      case 'CHAPTER_CONTENT' : 
        return {
          ...state,
          content: action.payload,
        }
        case 'PROJECT_DOCUMENT' : 
        return {
          ...state,
          docs: action.payload,
        }
      case 'FETCH_TOP_NEW':
        return {
          ...state,
          collectionTopNew: action.payload,
          iscollectionTopNewLoaded : true
        }
      case 'FETCH_HOT_NEW':
        return {
          ...state,
          collectionHotNew: action.payload,
          iscollectionHotNewLoaded : true,
        }
      case 'FETCH_MOST_VIEW':
        return{
          ...state,
          collectionMostview: action.payload,
          iscollectionMostviewLoaded : true
        }
        case 'FETCH_CATEGORY_SUCCESS' :
          return {
            ...state, 
            categoryData : action.payload,
            iscategoryLoaded : true,
          }
        case 'FETCH_LIBRARY_SUCCESS' :
          return {
            ...state,
            libraryData : action.payload,
            islibraryLoaded : true,
          }
        case 'FETCH_CREATER_SUCCESS':
          return {
            ...state,
            createrData : action.payload,
            iscreaterLoaded : true
          }
        case 'SET_USER' :
          return {
            ...state,
            userData : action.payload,
            isuserLoaded : true,
          }
        case 'SET_TAGS' :
          return {
            ...state,
            tags : action.payload,
            isuserLoaded : true,
          }
        case 'SET_TAGS_SECTION' :
          return {
            ...state,
            tagitem : action.payload,
            isuserLoaded : true,
          }
        case 'CLEAR_USER':
          return {
            ...state,
            userData : action.payload,
            isuserLoaded : false,
          }
      default:
        return state;
    }
};

export default collectionsReducer;