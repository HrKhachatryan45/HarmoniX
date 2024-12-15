import React, {useState} from 'react';
import {CiSearch} from "react-icons/ci";
import useSearch from "../hooks/useSearch";
import {useNavigate} from "react-router-dom";

function SearchInput(props) {
    const [query,setQuery] = useState('')
    const {search,loading} = useSearch()
    let navigate = useNavigate();
    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const object = await search(query);
        localStorage.setItem('media',JSON.stringify({media:object,query}))
        navigate('/search');
    }
    return (
            <form onSubmit={handleSubmit} className={'xl:w-[70%] lg:w-[70%] md:w-[70%] sm:w-[70%] w-[100%] h-fit flex relative'}>
                <button><CiSearch
                    className={'xl:text-[25px] lg:text-[23px] md:text-[20px] sm:text-[17px] text-[14px] text-[#B0B0B8] absolute xl:right-5 xl:top-2 lg:right-5 lg:top-2 md:right-3 md:top-[6px] sm:right-3 sm:top-[6px] right-2 top-[8px] '}/>
                </button>
                <input type={'text'}
                       value={query}
                       onChange={(ev) => setQuery(ev.target.value)}
                       className={'w-full xl:text-[16px] lg:text-[15px] md:text-[14px] sm:text-[11px] text-[8px] h-[30px] xl:h-[40px] lg:h-[36px] md:h-[33px] sm:h-[30px] xl:pl-4 lg:pl-4 md:pl-4 sm:pl-4 pl-2  xl:pr-14 lg:pr-12 md:pr-10 sm:pr-8 pr-8 bg-transparent border-[1px] border-[#B0B0B8] focus:border-[1px] outline-none text-[#B0B0B8] xl:rounded-3xl lg:rounded-xl md:rounded-3xl sm:rounded-3xl rounded-2xl'}
                       placeholder={'Search for Songs'}
                />
            </form>
    );
}

export default SearchInput;