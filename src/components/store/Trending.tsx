import React from "react";
import { Carousel } from "@material-tailwind/react";

function Trending() {
    return (
        <div className="w-[85%] my-4 mb-8 mx-auto relative">
            <h1 className="text-4xl font-poppins text-center my-4">
                Latest in Trends
            </h1>
            <Carousel className="rounded-xl">
                <div className="h-[300px] font-poppins">
                    <img
                        src="https://assets.vogue.com/photos/64dd4068451c2293c4bf21aa/4:3/w_1600,c_limit/cphfwss24-hero-v3.jpg"
                        alt="vogue 1"
                        className="h-[90%] w-full object-cover"
                    />
                    <p>
                        The Top Trends from Copenhagen Tell One Story: Fashion
                        Is Rocking in the State of Denmark
                    </p>
                </div>
                <div className="h-[300px] font-poppins">
                    <img
                        src="https://assets.vogue.com/photos/64adb694321e5a10a0c8c65b/4:3/w_1600,c_limit/couture2024-holding.png"
                        alt="vogue 1"
                        className="h-[90%] w-full object-cover"
                    />
                    <p>
                        The Fall 2023 Couture Trend Report: Beauty and Body
                        Anxiety Come Together at the Shows
                    </p>
                </div>
                <div className="h-[300px] font-poppins">
                    <img
                        src="https://assets.vogue.com/photos/64afffc7bb72800f1f0754dc/4:3/w_1600,c_limit/resort2024-header.png"
                        alt="vogue 1"
                        className="h-[90%] w-full object-cover"
                    />
                    <p>
                        The Resort 2024 Trend Report: Capes Swirl, Hems Are
                        Unpredictable, and the Waist Stays in Focus
                    </p>
                </div>
            </Carousel>
        </div>
    );
}

export default Trending;
