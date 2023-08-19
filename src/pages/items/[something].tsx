import Layout from "@/components/layout/Layout";
import Head from "next/head";
import React from "react";
import items from "../../../public/data/items.json"
import {Product} from "@/typings/Product";
import ProductsFeed from "@/components/home/Products/ProductsFeed";
const Items = () => {

    const products = items.map(item => {
        const p: Product = {
            ...item,
            id: new Date().toDateString()
        }
        return p;
    })

    return (
        <Layout>
            <Head>
                <title>Items | Outfitopia</title>
            </Head>
            <div className="w-[85%] mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-outfitopia-primary">
                    Items you can select for your outfit!
                </h1>
                <ProductsFeed products={products} />
            </div>
        </Layout>
    )
}
export default Items;