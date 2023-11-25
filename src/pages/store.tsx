import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/store/Banner";
import ProductsFeed from "../components/store/Products/ProductsFeed";
import Layout from "../components/layout/Layout";
import { Product } from "../typings/Product";
import Categories from "@/components/store/Categories";
import Trending from "@/components/store/Trending";

function Store(){
    const [products, setProducts] = useState<Product[]>([]);

    const getProducts = () => {
        fetch("/data/data.json", {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (p) {
                let products: Product[] = [];
                p.results.map((product: any)=> {
                    products.push({
                        "id": product.code,
                        "title": product.name,
                        "category": product.code,
                        description: "Clothes",
                        price: product.price.value,
                        image: product.images[0].baseUrl,
                        rating: 4
                    })
                })
                setProducts(products);
            });
    };

    useEffect(() => {
        getProducts();
    });

    return (
        <Layout>
            <Head>
                <title>Outfitopia | Store</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-full">
                <Categories />
                <Banner />
                <Trending />
                <ProductsFeed products={products} />
            </div>
        </Layout>
    );
};

export default Store;
