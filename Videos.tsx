import {useState} from 'react';
import Card from '../components/Card';import {useLocal} from '../hooks/useLocal';import {j} from '../lib/api';
const CH=[['تلاوات','quran recitation'],['محاضرات','islamic lecture'],['أطفال','islamic kids'],['مقاطع قصيرة','islamic shorts']];
export default function Videos(){
 const [key,setKey]=useLocal('yt-key','');const [v,setV]=useState<any[]>([]);const [play,setPlay]=useState('');const [later,setLater]=useLocal<any[]>('yt-later',[]);const [tab,setTab]=useState(false);const [err,setErr]=useState('');
 const find=(q:string)=>{setErr('');j(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=12&videoEmbeddable=true&q=${encodeURIComponent(q)}&key=${key}`).then(r=>setV(r.items.map((i:any)=>({id:i.id.videoId,t:i.snippet.title})))).catch(()=>setErr('تعذّر الجلب، تحققي من مفتاح YouTube'))};
 const chip='rounded-full bg-neon/15 px-3 py-1 text-xs text-[#C2457F]';
 const mark=(x:any)=>setLater(later.some(l=>l.id===x.id)?later.filter(l=>l.id!==x.id):[...later,x]);
 return <div className="space-y-4"><h1 className="text-xl font-extrabold">الفيديو <small className="text-sm text-gray-400">Video</small></h1>
  <input value={key} onChange={e=>setKey(e.target.value)} placeholder="YouTube Data API v3 key" dir="ltr" className="w-full rounded-full border border-white bg-white/80 px-4 py-2 text-xs"/>
  <div className="flex flex-wrap gap-2">{CH.map(([a,b])=><button key={a} className={chip} onClick={()=>{setTab(false);find(b)}}>{a}</button>)}<button className={chip} onClick={()=>setTab(!tab)}>⏰ أشاهدها لاحقاً ({later.length})</button></div>
  {err&&<p className="text-sm text-red-500">{err}</p>}
  {play&&<iframe title="video" className="aspect-video w-full rounded-3xl" src={`https://www.youtube.com/embed/${play}?autoplay=1`} allow="autoplay; fullscreen" allowFullScreen/>}
  {(tab?later:v).map(x=><Card key={x.id}><button className="w-full text-start text-sm font-bold" onClick={()=>setPlay(x.id)}>▶ {x.t}</button><button className={chip+' mt-2'} onClick={()=>mark(x)}>{later.some(l=>l.id===x.id)?'إزالة':'⏰ لاحقاً'}</button></Card>)}</div>;
}
