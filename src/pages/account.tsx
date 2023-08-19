import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Layout from "../components/layout/Layout";
import {GenieFab} from "@/components/common/GenieFab";

function account() {
    return (
        <Layout>
            <Head>
                <title>Outfitopia | Account</title>
            </Head>
            <div className="h-[50%] w-full grid place-items-center">
                <p className="text-[5rem] font-poppins">Coming Soon</p>
                <p>
                    Check the{" "}
                    <Link href={"/orders"}>
                        <span className="text-outfitopia-primary cursor-pointer">
                            Orders
                        </span>
                    </Link>{" "}
                    page.
                </p>
                <button className="cursor-pointer" onClick={() => signOut()}>
                    Sign Out
                </button>
            </div>
            <GenieFab />
        </Layout>
    );
}

export default account;
