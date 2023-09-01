import React from 'react'
import Lottie from "lottie-react";

const LottieAnimation = ({ animation, className }) => {
    return (
        <>
            <Lottie
                animationData={animation}
                className={className || ""}
            />
        </>
    )
}

export default LottieAnimation
