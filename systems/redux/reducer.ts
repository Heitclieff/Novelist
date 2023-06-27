
export interface RootState {
    collectionsDatashowcase : any
    collectionsData : any
    categoryData : any
    theme : any
    iscollecitonDatashowcaseLoaded : boolean,
    iscollectionLoaded  : boolean,
    iscategoryLoaded  : boolean,
}


const initialState : RootState= {
    collectionsDatashowcase: [],
    collectionsData : [],
    categoryData : [],
    theme : [],

    iscollecitonDatashowcaseLoaded : false,
    iscollectionLoaded : false,
    iscategoryLoaded : false,
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
      case 'FETCH_THEME_SUCCESS' :
        return {
          ...state, 
          theme : action.payload,
        }
      case 'FETCH_CATEGORY_SUCCESS' :
        return {
          ...state, 
          categoryData : action.payload,
          iscategoryLoaded : true,
        }
      default:
        return state;
    }

};

export default collectionsReducer;