import {useEffect,useRef,useState} from 'react';
import Card from '../components/Card';import {useLocal} from '../hooks/useLocal';import {A,j,RECITERS} from '../lib/api';
export default function Quran(){
 const [list,setList]=useState<any[]>([]);const [q,setQ]=useState('');const [hits,setHits]=useState<any[]>([]);
 const [cur,setCur]=useLocal<number>('q-cur',0);const [rec,setRec]=useLocal('q-rec',RECITERS[0].id);
 const [night,setNight]=useLocal('q-night',false);const [flow,setFlow]=useLocal('q-flow',false);
 const [marks,setMarks]=useLocal<string[]>('q-marks',[]);const [last,setLast]=useLocal('q-last',0);
 const [txt,setTxt]=useState<any[]>([]);const [aud,setAud]=useState<any[]>([]);const au=useRef<HTMLAudioElement>(null);
 useEffect(()=>{j(`${A}/surah`).then(r=>setList(r.data)).catch(()=>{})},[]);
 useEffect(()=>{if(!cur)return;setTxt([]);j(`${A}/surah/${cur}/quran-uthmani`).then(r=>setTxt(r.data.ayahs)).catch(()=>{})},[cur]);
 useEffect(()=>{if(!cur)return;setAud([]);j(`${A}/surah/${cur}/${rec}`).then(r=>setAud(r.data.ayahs)).catch(()=>{})},[cur,rec]);
 const play=(i:number)=>{const a=au.current;if(!a||!aud[i])return;a.src=aud[i].audio;a.play();a.onended=()=>play(i+1)};
 const mk=(k:string)=>setMarks(marks.includes(k)?marks.filter(m=>m!==k):[...marks,k]);
 const find=()=>j(`${A}/search/${encodeURIComponent(q)}/all/quran-simple`).then(r=>setHits(r.data.matches||[])).catch(()=>setHits([]));
 const chip='rounded-full bg-neon/15 px-3 py-1 text-xs text-[#C2457F]';
 if(cur)return <div className={`rounded-3xl p-3 ${night?'bg-[#2a1a24] text-pink-50':''}`}>
  <div className="mb-3 flex flex-wrap gap-2"><button className={chip} onClick={()=>setCur(0)}>→ السور</button><button className={chip} onClick={()=>setFlow(!flow)}>{flow?'وضع الصفحة':'الوضع المستمر'}</button><button className={chip} onClick={()=>setNight(!night)}>{night?'☀️':'🌙'}</button>
   <select value={rec} onChange={e=>setRec(e.target.value)} className="rounded-full bg-white px-2 text-xs text-gray-700">{RECITERS.map(r=><option key={r.id} value={r.id}>{r.n}</option>)}</select></div>
  <audio ref={au} className="mb-3 w-full" controls/>
  {flow?<p className="font-quran text-2xl leading-[2.8]">{txt.map(a=><span key={a.number}>{a.text} ﴿{a.numberInSurah}﴾ </span>)}</p>
  :txt.map((a,i)=><Card key={a.number} className="mb-3"><p className="font-quran text-2xl leading-[2.4] text-[#4A2B3A]">{a.text}</p>
   <div className="mt-2 flex gap-2"><button className={chip} onClick={()=>{play(i);setLast(a.numberInSurah)}}>▶ استماع</button><button className={chip} onClick={()=>mk(`${cur}:${a.numberInSurah}`)}>{marks.includes(`${cur}:${a.numberInSurah}`)?'🔖 محفوظة':'🔖 حفظ'}</button><span className="ms-auto text-xs text-gray-400">{a.numberInSurah}</span></div></Card>)}
  {!txt.length&&<p className="text-sm text-gray-400">جارٍ التحميل…</p>}</div>;
 return <div className="space-y-4"><h1 className="text-xl font-extrabold">القرآن الكريم <small className="text-sm text-gray-400">Quran</small></h1>
  <div className="flex gap-2"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="ابحثي عن سورة أو آية…" className="min-w-0 flex-1 rounded-full border border-white bg-white/80 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-neon"/><button onClick={find} className="rounded-full bg-neon px-4 text-sm font-bold text-white">بحث</button></div>
  {last>0&&<p className="text-xs text-gray-500">آخر آية استمعتِ إليها: {last}</p>}
  {marks.length>0&&<div className="flex flex-wrap gap-2">{marks.map(m=><button key={m} className={chip} onClick={()=>setCur(+m.split(':')[0])}>🔖 {m}</button>)}</div>}
  {hits.slice(0,20).map(h=><Card key={h.number}><p className="font-quran text-xl leading-[2.2]">{h.text}</p><button className={chip+' mt-2'} onClick={()=>setCur(h.surah.number)}>{h.surah.name} · {h.numberInSurah}</button></Card>)}
  <div className="grid grid-cols-2 gap-3">{list.filter(s=>!q||s.name.includes(q)||s.englishName.toLowerCase().includes(q.toLowerCase())).map(s=>
   <button key={s.number} onClick={()=>setCur(s.number)} className="rounded-2xl border border-white/80 bg-white/70 p-3 text-start backdrop-blur-xl"><div className="font-quran text-lg">{s.number}. {s.name}</div><div className="text-xs text-gray-500">{s.englishName} · {s.numberOfAyahs}</div></button>)}</div></div>;
}
