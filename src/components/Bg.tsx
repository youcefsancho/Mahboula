import {useEffect} from 'react';
export const Rose=({s=44,className=''}:{s?:number;className?:string})=>(
 <svg width={s} height={s} viewBox="-20 -20 40 40" className={className} aria-hidden>
  <ellipse cx="-12" cy="9" rx="8" ry="4" transform="rotate(30 -12 9)" fill="#5BAE7A"/><ellipse cx="12" cy="9" rx="8" ry="4" transform="rotate(-30 12 9)" fill="#5BAE7A"/>
  <circle r="13" fill="#FF6FAE"/><circle r="9" fill="#FF8DC0"/><circle r="5" fill="#FFB3D4"/>
  <path d="M-3-1a3 3 0 0 1 6 0a2 2 0 0 1-4 1.5" fill="none" stroke="#C2457F" strokeWidth="1.2"/>
 </svg>);
export default function Bg(){
 useEffect(()=>{const f=()=>document.documentElement.style.setProperty('--sy',String(scrollY));addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
 const p=(m:number)=>({transform:`translateY(calc(var(--sy,0)*${m}px))`});
 return <div className="fixed inset-0 -z-10 overflow-hidden bg-blush">
  <svg className="absolute inset-0 h-full w-full opacity-20"><defs><pattern id="p" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 4l7 19 19 7-19 7-7 19-7-19-19-7 19-7z" fill="none" stroke="#D4AF37"/><circle cx="30" cy="30" r="3" fill="#FF6FAE"/></pattern></defs><rect width="100%" height="100%" fill="url(#p)"/></svg>
  <Rose s={150} className="absolute -start-10 -top-8 rotate-12 opacity-70" />
  <div className="absolute -end-12 top-1/3" style={p(-.15)}><Rose s={130} className="-rotate-12 opacity-60"/></div>
  <div className="absolute -start-8 bottom-24" style={p(-.25)}><Rose s={100} className="rotate-45 opacity-60"/></div>
 </div>;
}
