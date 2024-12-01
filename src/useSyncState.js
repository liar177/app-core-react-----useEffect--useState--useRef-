import {useEffect, useState, useRef} from "react";


function useCallbackState1 (state) {
    const cbRef = useRef();
    const [data, setData] = useState(state);

    useEffect(() => {
        cbRef.current && cbRef.current(data);
    }, [data]);

    return [data, function (val, callback) {
        cbRef.current = callback;
        console.log('useEffect-callBack',val)
        setData(val);
    }];
}
export {useCallbackState1};