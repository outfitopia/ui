const url = {
    client:
        process.env.NODE_ENV === "production"
            ? "https://outfitopia.vercel.app"
            : "http://localhost:3000",
    server: "https://ws.msft.lohani.dev",
};
export { url };
