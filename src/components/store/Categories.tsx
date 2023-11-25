import React from "react";

function Categories() {
    const categories = [
        "Top wear",
        "Bottom wear",
        "Ethnic",
        "Western",
        "Kids wear",
        "Men's shoes",
        "Women's shoes",
        "Essentials",
        "Winter",
    ];

    const images = [
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        "https://lp2.hm.com/hmgoepprod?set=source[/c8/d9/c8d97506a36c1eeae067549d04d7c3cf7c56562c.jpg],origin[dam],category[],type[LOOKBOOK],res[m],hmver[1]&call=url[file:/product/main]",
        "https://grabandpack.com/media/catalog/product/cache/1/image/500x750/9df78eab33525d08d6e5fb8d27136e95/w/o/womens-off-white-soft-silk-saree-with-blouse-piece-soft-silk-sarees-india-gnp006358.jpg",
        "https://littleboxindia.com/cdn/shop/products/630ae5bad6d7dee73757f0e70f5a1d3b_540x.jpg?v=1684138460",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/kids-dress/d/3/w/2-3-years-bada-ankh-peach-and-sky-blue-top-and-bottom-cap-original-imagdy3hpubtz7tn-bb.jpeg?q=70",
        "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ef7d1e6b-bac1-4da9-89f1-90b9e9311e39/air-jordan-3-retro-shoes-TJf2lm.png",
        "https://rukminim2.flixcart.com/image/832/832/kydb3ww0/sandal/w/r/q/5-h-hb13-5-denill-peach-original-imagamfm3gyerjqb.jpeg?q=70",
        "https://rukminim2.flixcart.com/image/832/832/l1ch4sw0/bra/m/9/1/lightly-padded-36-3-yes-regular-regular-kamini-sashu-original-imagcxe2yzbkmrzv.jpeg?q=70",
        "https://rukminim2.flixcart.com/image/832/832/xif0q/sweater/g/u/8/l-black-high-neck-b-fashlook-original-imagju9urdmaqaaz.jpeg?q=70",
    ];

    const items = categories.map((c, i) => {
        return {
            name: c,
            image: images[i],
        };
    });
    return (
        <div className="w-[80%] h-[100px] mx-auto relative flex my-2 mb-12 bg-opacity-75">
            {items.map((item, i) => {
                return (
                    <div key={i} className="flex w-full justify-center flex-col items-center space-y-2">
                        <img src={item.image} alt="" className="h-20 w-20 object-cover" />
                        <p className="font-poppins text-center font-semibold text-sm">{item.name}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Categories;
