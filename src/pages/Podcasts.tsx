import {useEffect,useRef,useState} from 'react';
import Card from '../components/Card';import {j} from '../lib/api';
const CH=[['Bayyinah','Bayyinah'],['Yaqeen','Yaqeen Institute'],['Mufti Menk','Mufti Menk'],['Omar Suleiman','Omar Suleiman'],['تفسير','tafsir quran podcast'],['سيرة','seerah podcast'],['أسرة','islamic family podcast'],['تحفيز','islamic motivation podcast']];
export default function Podcasts(){
 const [shows,setShows]=useState<any[]>([]);const [eps,setEps]=useState<any[]>([]);const [now,setNow]=useState<any>(null);const [sl,setSl]=useState(0);
 const au=useRef<HTMLAudioElement>(null);const t=useRef<number>();
 const find=(term:string)=>{setEps([]);j(`https://itunes.apple.com/search?media=podcast&limit=10&term=${encodeURIComponent(term)}`).then(r=>setShows(r.results)).catch(()=>{})};
 const open=(f:string)=>j(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(f)}`).then(r=>setEps(r.items)).catch(()=>{});
 const sleep=(m:number)=>{clearTimeout(t.current);setSl(m);if(m)t.current=window.setTimeout(()=>{au.current?.pause();setSl(0)},m*60000)};
 useEffect(()=>{find('Bayyinah')},[]);
 const chip='rounded-full bg-neon/15 px-3 py-1 text-xs text-[#C2457F]';
 return <div className="space-y-4 pb-24"><h1 className="text-xl font-extrabold">البودكاست <small className="text-sm text-gray-400">Podcasts</small></h1>
  <div className="flex flex-wrap gap-2">{CH.map(([a,b])=><button key={a} className={chip} onClick={()=>find(b)}>{a}</button>)}</div>
  {!eps.length&&shows.map(s=><Card key={s.collectionId}><button className="flex w-full items-center gap-3 text-start" onClick={()=>open(s.feedUrl)}><img src={s.artworkUrl100} alt="" className="h-14 w-14 rounded-2xl"/><span className="text-sm font-bold">{s.collectionName}</span></button></Card>)}
  {eps.map(e=><Card key={e.guid}><button className="w-full text-start text-sm font-bold" onClick={()=>setNow(e)}>▶ {e.title}</button></Card>)}
  {now&&<div className="fixed inset-x-3 bottom-24 z-40 rounded-3xl border border-white bg-white/90 p-3 shadow-xl backdrop-blur-xl"><p className="mb-1 truncate text-xs font-bold">{now.title}</p>
   <audio ref={au} src={now.enclosure?.link} controls autoPlay className="w-full"/>
   <div className="mt-2 flex flex-wrap items-center gap-2"><button className={chip} onClick={()=>{if(au.current)au.current.currentTime-=10}}>−10</button><button className={chip} onClick={()=>{if(au.current)au.current.currentTime+=10}}>+10</button>
    <select className="rounded-full bg-white px-2 text-xs" onChange={e=>{if(au.current)au.current.playbackRate=+e.target.value}} defaultValue="1">{[.5,.75,1,1.25,1.5,2].map(r=><option key={r} value={r}>{r}x</option>)}</select>
    <select className="rounded-full bg-white px-2 text-xs" value={sl} onChange={e=>sleep(+e.target.value)}><option value={0}>مؤقت النوم</option>{[15,30,60].map(m=><option key={m} value={m}>{m} د</option>)}</select></div></div>}</div>;
}
