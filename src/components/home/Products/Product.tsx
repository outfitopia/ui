import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToBasket } from "../../../redux/slices/basketSlice";
import { Product } from "../../../typings/Product";

function Product({ product }: { product: Product }) {
    const { category, price, image, title, description } = product;
    const dispatch = useDispatch()
    const addItem = () => {
        dispatch(addToBasket(product))
    };
    return (
        <div className="relative flex flex-col m-2 bg-white z p-2 border items-center">  
            <Image alt="" src={image} height={100} width={100} objectFit="contain" />

            <h4 className=" text-black truncate">{title}</h4>

            <p className="text-xs line-clamp-2 truncate">
                {description}
            </p>

            <div className="font-bold">{"$" + price}</div>

            <button
                className="mt-auto w-full py-2 bg-blue-200 rounded-lg font-bold hover:bg-white hover:border border-outfitopia-primary"
                onClick={addItem}
            >
                Add to cart
            </button>
        </div>
    );
}

export default Product;
