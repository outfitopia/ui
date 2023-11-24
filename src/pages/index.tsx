import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import {GenieFab} from "@/components/common/GenieFab";

const Home: NextPage = () => {
    return (
        <Layout>
            <Head>
                <title>Outfitopia</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GenieFab />
        </Layout>
    );
};

export default Home;
