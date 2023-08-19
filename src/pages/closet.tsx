import Layout from "@/components/layout/Layout";
import Head from "next/head";
import React from "react";
import {getSession} from "next-auth/react";
import {ClosetItem} from "@/typings/ClosetItem";
import {collection, doc, getDocs, orderBy, query} from "firebase/firestore";
import {db} from "@/serverless/firebase";
import {GenieFab} from "@/components/common/GenieFab";

export default function closet({items}: {items: ClosetItem[]}) {
    return (
        <Layout>
            <Head>
                <title>Closet | Outfitopia</title>
            </Head>
            <div className="w-[85%] mx-auto p-10">
                <h1 className="text-3xl border-b mb-2 pb-1 border-outfitopia-primary">
                    Your Closet
                </h1>
                {
                    items.map(item => {
                        return (
                            <div className="flex flex-row items-center p-[10px] my-[20px] rounded-lg mx-[10px] shadow-lg bg-neutral-200" key={item.details}>
                                <img src={item.imageUrl} alt="Failed to laod image" />
                                <div className="m-[20px]">
                                    <h1 className="font-bold text-lg">Details</h1>
                                    <div>{item.details}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <GenieFab />
        </Layout>
    )
}

export async function getServerSideProps(context: any) {
    const session = getSession(context);

    if (!session) {
        return {
            props: {},
        };
    }

    const items = await getDocs(
        query(
            collection(doc(db, "users", (await session)!.user!.email!), "closet")
        )
    )

    return {
        props: {
            items: items.docs.map(snapshot => {
                const item: ClosetItem = {
                    details: snapshot.get("details"),
                    imageUrl: snapshot.get("imageUrl")
                }
                return item
            })
        }
    }
}