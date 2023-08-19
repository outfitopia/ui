import {Fab, Tooltip} from "@mui/material";
import Lottie from "react-lottie-player";
import magic from "../../../public/assets/animations/magic.json"
import {useRouter} from "next/router";

export const GenieFab = () => {
    const router = useRouter()
    return (
        <Tooltip title={<h1 className="text-sm">Create fashion with magic!</h1>} placement="top" arrow>
            <Fab style={{
                bottom: "0",
                right: "0",
                position: "fixed",
                margin: "50px",
                height: "100px",
                width: "100px",
                zIndex: "1000",
                backgroundColor: "white"
            }}
                 onClick={() => router.push("/genie")}
            >
                <Lottie
                    style={{margin: "0 0"}}
                    animationData={magic}
                    play
                    loop />

            </Fab>
        </Tooltip>
    )
}