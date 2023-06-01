import {useState,useEffect} from 'react'

const useWindowS = () => {
    const [windowSize,setwindowSize]=useState({
        width:undefined,
        height:undefined
    })
    useEffect(()=>{
        const handleResize=()=>{
            setwindowSize({
                width:window.innerWidth,
                height:window.innerHeight
            })
        }
        handleResize();
        window.addEventListener("resize",handleResize)

        const cleanUp=()=>{
            console.log('Calls the Cleanup while closing function or useEffect Dependency Changes');
            window.removeEventListener("resize",handleResize)
        }
        return cleanUp;
    },[])
    return windowSize
}

export default useWindowS