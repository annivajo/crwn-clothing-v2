import './shop.styles.scss';
import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";

import {getCategoriesAndDocuments} from "../../utils/firebase.utils";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setCategoriesMap} from "../../store/categories/category.action";

const Shop = () => {
    const dispatch = useDispatch();

    useEffect(()=> {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            dispatch(setCategoriesMap(categoryMap));
        }

        getCategoriesMap();
    },[])

    return (
       <Routes>
           <Route index element={<CategoriesPreview/>} />
           <Route path=":category" element={<Category/>} />

       </Routes>
    )
}

export default Shop;