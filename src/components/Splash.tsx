import {useEffect,useState} from 'react';
import Logo from './Logo';
export default function Splash({done}:{done:()=>void}){
 const [p,setP]=useState(0);
 useEffect(()=>{const t=setInterval(()=>setP(x=>x+4),70);return()=>clearInterval(t)},[]);
 useEffect(()=>{if(p>=100)setTimeout(done,250)},[p,done]);
 return <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-blush">
  <Logo size={120} className="animate-pulse"/><h1 className="text-3xl font-extrabold text-gold">Sancha</h1>
  <div className="h-1.5 w-48 overflow-hidden rounded-full bg-white"><div className="h-full bg-neon transition-all" style={{width:Math.min(p,100)+'%'}}/></div></div>;
}
