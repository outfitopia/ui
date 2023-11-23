import Link from "next/link";
import React from "react";
import { MdShoppingCart } from "react-icons/md";
import { signIn, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { selectItems } from "../../redux/slices/basketSlice";
import { useRouter } from 'next/router';

interface Tab {
    path: string;
    label: string;
}

const tabs: Tab[] = [
    { path: '/', label: 'Home' },
    { path: '/genie', label: 'Store' },
    { path: '/genie', label: 'Genie' },
    { path: '/genie', label: 'About' },
];

function Header() {
    const cartItems = useSelector(selectItems);
    const { data: session } = useSession();
    const router = useRouter();

    const isTabActive = (pathname: string) => {
        return router.pathname === pathname;
    };

    return (
        <div className="w-screen py-1 px-6 flex justify-between items-center font-poppins bg-white z-10 sticky top-0">
            <div className="flex-[0.4] flex justify-start py-2">
                <Link href={"/"}>
                    <img
                        src="/assets/images/Outfitopia.svg"
                        alt="Outfitopia"
                        className="h-24 object-contain cursor-pointer"
                    />
                </Link>
            </div>

            <ul className="flex-[0.3] flex justify-start items-center space-x-6 py-2 px-12">
                {tabs.map((tab: Tab) => {
                    return <li key={tab.path} className={`cursor-pointer text-sm transition rounded-full px-4 py-1 ${isTabActive(tab.path) ? 'bg-gray-900 text-white' : ''}`}>
                        <Link href={tab.path}>{tab.label}</Link>
                    </li>
                })}
            </ul>

            <ul className="flex-[0.3]  flex items-center justify-end space-x-6 py-2 px-12">
                <li className="cursor-pointer text-3xl relative">
                    <Link href={"/cart"}>
                        <p>
                            <span className="absolute -top-2 -right-2 text-xs  bg-outfitopia-primary h-5 w-5 rounded-full flex items-center justify-center">
                                {cartItems.length}
                            </span>
                            <MdShoppingCart className="hover:text-outfitopia-primary" />
                        </p>
                    </Link>
                </li>
                <li className="cursor-pointer transition rounded-full px-4 py-1 bg-gray-900 text-white text-sm">
                    {session ? (
                        <Link href={"/account"}>
                            <p className="flex items-center">
                                {`${session.user?.name}`}
                            </p>
                        </Link>
                    ) : (
                        <p className="" onClick={() => signIn()}>
                            LogIn
                        </p>
                    )}
                </li>
            </ul>
        </div>
    );
}

export default Header;
