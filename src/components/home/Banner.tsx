import React from "react";
import * as LottiePlayer from "@lottiefiles/lottie-player";
function Banner() {
    return (
        <div className="w-[85%] bg-outfitopia-primary h-[600px] mx-auto relative flex">
            <div className="absolute h-10 w-10 bg-white top-0 left-0" />
            <div className="absolute h-10 w-10 bg-white top-10 left-10" />

            <div className="w-1/2 bg-outfitopia-primary h-full flex justify-center items-start flex-col pl-[5%]">
                <p className="font-poppins">Why relying on us? When you can</p>
                <div className="text-[5rem] font-poppins">
                    <p>Design</p>
                    <p>Your</p>
                    <p>Own Outfit</p>
                </div>

                <button className="bg-black text-white px-6 py-2 text-sm">
                    Shop Now
                </button>
            </div>

            <div className="w-2/3 h-full object-contain bg-white">
                <img src="/assets/images/banner5.png" alt="" className="h-full w-full object-contain" />
            </div>
        </div>
    );
}

export default Banner;
