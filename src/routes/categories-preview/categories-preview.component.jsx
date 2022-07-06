import {Fragment} from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import {useSelector} from "react-redux";
import {selectCategories} from "../../store/categories/category.selector";

const CategoriesPreview = () => {
    //const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategories);
    return (
        <Fragment>
            {
                categoriesMap && Object.keys(categoriesMap).map((title)=>{
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products}/>
                })
            }
        </Fragment>
    )
}

export default CategoriesPreview;