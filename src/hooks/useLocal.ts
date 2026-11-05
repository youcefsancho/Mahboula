import {useEffect,useState} from 'react';
export function useLocal<T>(k:string,d:T):[T,(v:T)=>void]{
 const [v,s]=useState<T>(()=>{try{const r=localStorage.getItem(k);return r?JSON.parse(r):d}catch{return d}});
 useEffect(()=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}},[k,v]);
 return [v,s];
}
