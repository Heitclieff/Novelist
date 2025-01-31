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
    bookMark : any
    headLeader: any
    itemLeader: any
    teams: any
    tags :any
    templete : any,
    category : any
    content : any,
    contentdocs : any
    tagitem :any
    book : any
    slot : any
    rates : any
    field : any
    project : any
    categoryCache : any

    iscollectionMostviewLoaded : boolean,
    iscollectionHotNewLoaded : boolean,
    iscollectionTopNewLoaded : boolean,
    iscategoryLoaded  : boolean,
    islibraryLoaded : boolean,
    iscreaterLoaded : boolean,
    isuserLoaded : boolean,
    isthemeLoaded : boolean ,
    isbookMarkLoaded : boolean,
    isheadLeader: boolean,
    isitemLeader: boolean,
    
}

const initialState : RootState= {
    collectionMostview : [],
    collectionHotNew : [],
    collectionTopNew : [],
    categoryData : [],
    libraryData : [],
    createrData : [],
    userData: {
      bg_image: '',
      birthDate: {},
      createAt: {},
      description: '',
      email: '',
      follower: 0,
      following: 0,
      id: '',
      pf_image: '',
      phone: '',
      project: [],
      username: '',
    },
    theme : {},
    bookMark: [],
    headLeader: [],
    itemLeader: [],
    templete :[],
    teams : [],
    tags : {},
    docs : {},
    tagitem : {},
    category : [],
    theme : {},
    field : [],
    book : [],
    slot : [],
    project : [],
    rates : [],
    content : [],
    contentdocs : {},
    categoryCache : [],

    iscollectionMostviewLoaded : false,
    iscollectionHotNewLoaded : false,
    iscollectionTopNewLoaded : false,
    iscategoryLoaded : false,
    islibraryLoaded : false,
    iscreaterLoaded : false,
    isuserLoaded : false,
    isthemeLoaded : false,
    isbookMarkLoaded : false,
    isheadLeader: false,
    isitemLeader: false,
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
        case 'CHAPTER_WRITE_CONTENT' : 
        return {
          ...state,
          contentdocs: action.payload,
        }
        case 'PROJECT_DOCUMENT' : 
        return {
          ...state,
          docs: action.payload,
        }
        case 'PROJECT_CONTENT' : 
        return {
          ...state,
          project: action.payload,
        }

        case 'SET_COMMIT' : 
        return {
          ...state,
          field : action.payload,
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
          
        case 'SET_RATING' :
          return {
            ...state,
            rates : action.payload,
        }


        case 'SET_MY_LIBRARY' :
          return {
            ...state,
            book : action.payload,
            isuserLoaded : true,
          }
        case 'SET_MY_BOOKMARKS' :
        return {
          ...state,
          slot : action.payload,
          isuserLoaded : true,
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
        case 'SET_CATEGORY' :
          return {
            ...state,
            category : action.payload,
            isuserLoaded : true,
          }
        case 'SET_CATEGORY_CACHE' :
          return {
            ...state,
            categoryCache : action.payload,
            isuserLoaded : true,
          }
        case 'SET_TEMPLETE' :
          return {
            ...state,
            templete : action.payload,
            isuserLoaded : true,
        }
        case 'SET_TAGS_SECTION' :
          return {
            ...state,
            tagitem : action.payload,
            isuserLoaded : true,
          }
        case 'SET_PROJECT_TEAMS':
          return {
            ...state,
            teams : action.payload,
            iscreaterLoaded : true
          }
        case 'CLEAR_USER':
          return {
            ...state,
            userData : action.payload,
            isuserLoaded : false,
          }
        case 'UPDATE_USERFIELD':
          return {
            ...state,
            userData: action.payload
          }
        case 'SET_BOOKMARK':
          return {
            ...state,
            bookMark: action.payload
          }
        case 'SET_HEADLEADER':
          return {
            ...state,
            headLeader: action.payload,
            isheadLeader: true
          }
        case 'SET_ITEMLEADER':
          return {
            ...state,
            itemLeader: action.payload,
            isitemLeader: true
          }
      default:
        return state;
    }
};

export default collectionsReducer;