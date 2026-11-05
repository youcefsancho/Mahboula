import {useCallback,useEffect,useState} from 'react';
import {HashRouter} from 'react-router-dom';
import Bg from './components/Bg';import Splash from './components/Splash';import BottomNav from './components/BottomNav';import AppRoutes from './routes';
export default function App(){
 const [ready,setReady]=useState(false);const done=useCallback(()=>setReady(true),[]);
 useEffect(()=>{const f=(e:PointerEvent)=>{const t=(e.target as HTMLElement).closest('button,a,.rip') as HTMLElement|null;if(!t)return;
  const r=t.getBoundingClientRect(),s=document.createElement('span');s.className='ripple';s.style.left=e.clientX-r.left+'px';s.style.top=e.clientY-r.top+'px';t.appendChild(s);setTimeout(()=>s.remove(),600)};
  document.addEventListener('pointerdown',f);return()=>document.removeEventListener('pointerdown',f)},[]);
 return <HashRouter><Bg/>{!ready&&<Splash done={done}/>}<main className="mx-auto max-w-xl px-4 pb-28 pt-6"><AppRoutes/></main><BottomNav/></HashRouter>;
}
