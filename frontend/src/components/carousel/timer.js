import { useEffect } from 'react';

export function Timer(callback,msTime){
    useEffect(()=>{
       setTimeout(callback,msTime);
    }  );
}