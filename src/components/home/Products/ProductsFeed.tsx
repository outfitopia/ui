import React from "react";
import { Product } from "../../../typings/Product";
import ProductCard from "./Product";

function ProductsFeed({ products }: { products: Product[] | [] }) {
    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mx-auto w-[85%]">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductsFeed;
