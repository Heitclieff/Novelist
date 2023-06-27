
export interface RootState {
    collectionsDatashowcase : any
    collectionsData : any
    theme : any
}


const initialState : RootState= {
    collectionsDatashowcase: [],
    collectionsData : [],
    theme : [],
  };
  
 const collectionsReducer = (state = initialState, action:any) : RootState => {
    switch (action.type) {
      case 'FETCH_COLLECTIONS_DATASHOWCASE_SUCCESS':
        return {
          ...state,
          collectionsDatashowcase: action.payload,
        };
      case 'FETCH_COLLECTIONS_DATA_SUCCESS' :
        return {
          ...state, 
          collectionsData : action.payload,
        };
      case 'FETCH_THEME_SUCCESS' :
        return {
          ...state, 
          theme : action.payload,
        }
      default:
        return state;
    }

};

export default collectionsReducer;