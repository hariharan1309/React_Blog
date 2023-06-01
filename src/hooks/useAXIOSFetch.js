import {useState,useEffect} from 'react'
import axios from 'axios';
const useAXIOSFetch = (dataUrl) => {
    const [data,setData]=useState([]);
    const [fetchErr,setFetchErr]=useState(null);
    const [isLoad,setIsLoad]=useState(false);
    useEffect(()=>{

        let isMount=true;
        const source=axios.CancelToken.source();
        const fetchData=async (url)=>{
            try {
                const response=await axios.get(url,{
                    cancelToken:source.token
                });
                if(isMount){
                    setData(response.data);
                    setFetchErr(null)
                }
                
            } catch (err) {
                if(isMount){
                    setFetchErr(err.message);
                    setData([]);
                }
            }
            finally{
                isMount && setTimeout(()=>setIsLoad(false),2000)
            }
        }
        fetchData(dataUrl);
        
        const cleanUp=()=>{
            console.log('Clean Up function');
            isMount=false;
            source.cancel();
        }
        return cleanUp;
    },[dataUrl])
    return {data,fetchErr,isLoad}
}

export default useAXIOSFetch