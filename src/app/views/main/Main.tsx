import React from 'react';
import ProductCard from "../../components/product-card/ProductCard";
import {productAPI} from "../../store/services/productService";

const Main = () => {
    const {data: products} = productAPI.useGetBestProductsQuery();

    return (
        <div>
            <hr/>
            Main
            {
                products?.map(product => <ProductCard key={product.id} product={product}/>)
            }
            <hr/>
        </div>
    );
};

export default Main;