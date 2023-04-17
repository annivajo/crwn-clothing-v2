import {createSelector} from "reselect";

const selectCategoryReducer = state => {
    return state.categories;
}


export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categories) => {
        return categories.categories
    }
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return   categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
          }, {})
    }
   
  );


  export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
  );