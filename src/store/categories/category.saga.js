import {takeLatest, all, call, put} from 'redux-saga/effects';
import {CATEGORIES_ACTION_TYPES} from "./category.types";
import {getCategoriesAndDocuments} from "../../utils/firebase.utils";
import { fetchCategoriesFailed, fetchCategoriesSuccess, fetchCategoriesStart} from './category.action';



// export const fetchCategoriesAsync = () => async (dispatch) => {
//     dispatch(fetchCategoriesStart());
//     try {
//         const categoriesArray = await getCategoriesAndDocuments('categories');
//         dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error){
//         dispatch(fetchCategoriesFailed(error))
//     }
// }

export function* fetchCategoriesAsync(){
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments,'categories');
        yield put(fetchCategoriesSuccess(categoriesArray))    
    } catch (error){
        yield put(fetchCategoriesFailed(error))
    }
}

export function* onFetchCategories(){
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}