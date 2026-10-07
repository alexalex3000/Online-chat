"use client"

import {ReactNode, useEffect, useState} from "react";

interface Props{
    mobile: ReactNode,
    pc: ReactNode,
}

export default function Sidebar({mobile, pc}: Props){
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;

            if(windowWidth < 768){
                setIsMobile(true);
                return
            }

            setIsMobile(false);
        }

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <>
            {
                isMobile ? (mobile) : (pc)
            }
        </>
    )
}