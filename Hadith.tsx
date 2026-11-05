import {useEffect,useState} from 'react';
import Card from '../components/Card';import {useLocal} from '../hooks/useLocal';import {H,j,share} from '../lib/api';
const C=[['ara-nawawi','الأربعون النووية'],['ara-bukhari','صحيح البخاري'],['ara-muslim','صحيح مسلم']];
export default function Hadith(){
 const [c,setC]=useState(C[0][0]);const [sec,setSec]=useState(1);const [l,setL]=useState<any[]>([]);const [q,setQ]=useState('');const [only,setOnly]=useState(false);const [err,setErr]=useState(false);
 const [fav,setFav]=useLocal<any[]>('h-fav',[]);
 useEffect(()=>{setL([]);setErr(false);j(c==='ara-nawawi'?`${H}/${c}.json`:`${H}/${c}/sections/${sec}.json`).then(r=>setL(r.hadiths)).catch(()=>setErr(true))},[c,sec]);
 const shown=(only?fav:l).filter(h=>h.text.includes(q)).slice(0,60);
 const tog=(h:any)=>setFav(fav.some(f=>f.text===h.text)?fav.filter(f=>f.text!==h.text):[...fav,{text:h.text,n:h.hadithnumber??h.n}]);
 const chip='rounded-full bg-neon/15 px-3 py-1 text-xs text-[#C2457F]';
 return <div className="space-y-4"><h1 className="text-xl font-extrabold">الأحاديث <small className="text-sm text-gray-400">Hadith</small></h1>
  <div className="flex flex-wrap gap-2"><select value={c} onChange={e=>{setC(e.target.value);setSec(1)}} className="rounded-full bg-white px-3 py-1 text-sm">{C.map(([k,n])=><option key={k} value={k}>{n}</option>)}</select>
   {c!=='ara-nawawi'&&<input type="number" min={1} value={sec} onChange={e=>setSec(Math.max(1,+e.target.value))} className="w-20 rounded-full bg-white px-3 py-1 text-sm" aria-label="الكتاب"/>}
   <button className={chip} onClick={()=>setOnly(!only)}>{only?'الكل':'❤️ المفضلة'}</button></div>
  <input value={q} onChange={e=>setQ(e.target.value)} placeholder="بحث بالكلمة المفتاحية…" className="w-full rounded-full border border-white bg-white/80 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-neon"/>
  {err&&<p className="text-sm text-red-500">تعذّر التحميل، تحققي من الاتصال.</p>}{!l.length&&!err&&<p className="text-sm text-gray-400">جارٍ التحميل…</p>}
  {shown.map((h,i)=><Card key={i}><p className="font-quran text-xl leading-[2.2]">{h.text}</p>
   <div className="mt-2 flex gap-2"><button className={chip} onClick={()=>tog(h)}>{fav.some(f=>f.text===h.text)?'❤️':'🤍'}</button><button className={chip} onClick={()=>share(h.text)}>🖼️ صورة</button><span className="ms-auto text-xs text-gray-400">{h.hadithnumber??h.n}</span></div></Card>)}</div>;
}
