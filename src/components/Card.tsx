import {ReactNode,useEffect,useRef} from 'react';
import {Rose} from './Bg';
export default function Card({children,className=''}:{children:ReactNode;className?:string}){
 const r=useRef<HTMLDivElement>(null);
 useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){e.target.classList.add('in');o.disconnect()}});o.observe(r.current!);return()=>o.disconnect()},[]);
 return <div ref={r} className={`rv relative rounded-3xl border border-white/80 bg-white/70 p-4 shadow-[0_8px_30px_rgba(255,111,174,.18)] backdrop-blur-xl ${className}`}>
  <Rose s={30} className="absolute -top-3 -end-2 rotate-12"/>{children}</div>;
}
