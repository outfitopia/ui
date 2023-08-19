import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import Banner from "../components/home/Banner";
import ProductsFeed from "../components/home/Products/ProductsFeed";
import Layout from "../components/layout/Layout";
import { Product } from "../typings/Product";
import {GenieFab} from "@/components/common/GenieFab";
import Categories from "@/components/home/Categories";
import Trending from "@/components/home/Trending";

const Home: NextPage = () => {
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
                        description: "",
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
                <title>Outfitopia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="w-full">
                <Categories />
                <Banner />
                <Trending />
                <ProductsFeed products={products} />
            </main>
            <GenieFab />
        </Layout>
    );
};

export default Home;
