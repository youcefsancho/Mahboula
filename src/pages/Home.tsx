import {useEffect,useState} from 'react';
import Card from '../components/Card';import Logo from '../components/Logo';import {Rose} from '../components/Bg';
import {A,H,j,day,share} from '../lib/api';
const N=['الفجر','الشروق','الظهر','العصر','المغرب','العشاء'],K=['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
export default function Home(){
 const [ay,setAy]=useState<any[]|null>(null);const [hd,setHd]=useState<any>(null);const [pt,setPt]=useState<any>(null);const [qb,setQb]=useState<number|null>(null);const [err,setErr]=useState('');
 useEffect(()=>{j(`${A}/ayah/${day()%6236+1}/editions/quran-uthmani,en.sahih`).then(r=>setAy(r.data)).catch(()=>{});
  j(`${H}/ara-nawawi.json`).then(r=>setHd(r.hadiths[day()%r.hadiths.length])).catch(()=>{})},[]);
 const notify=async()=>{if(ay&&await Notification.requestPermission()==='granted')(await navigator.serviceWorker.ready).showNotification('آية اليوم',{body:ay[0].text,icon:import.meta.env.BASE_URL+'icon.svg'})};
 const loc=()=>navigator.geolocation.getCurrentPosition(async p=>{const {latitude:a,longitude:o}=p.coords;
  try{setPt((await j(`https://api.aladhan.com/v1/timings?latitude=${a}&longitude=${o}`)).data.timings)}catch{setErr('تعذّر جلب الأوقات')}
  const R=Math.PI/180,d=(39.8262-o)*R;setQb((Math.atan2(Math.sin(d),Math.cos(a*R)*Math.tan(21.4225*R)-Math.sin(a*R)*Math.cos(d))/R+360)%360)},()=>setErr('اسمحي بالوصول إلى الموقع'));
 return <div className="space-y-5">
  <header className="flex items-center gap-3"><Logo size={56}/><div><h1 className="text-xl font-extrabold">السلام عليكِ يا سانشا <Rose s={22} className="inline"/></h1><p className="text-xs text-gray-500">A gift from Sancho · هدية من سانشو</p></div></header>
  <Card><h2 className="mb-2 font-bold text-[#C2457F]">آية اليوم <small className="text-gray-400">Verse of the day</small></h2>
   {ay?<><p className="font-quran text-2xl leading-[2.4]">{ay[0].text}</p><p className="mt-1 text-sm text-gray-500" dir="ltr">{ay[1].text}</p>
   <button onClick={notify} className="mt-3 rounded-full bg-neon/15 px-4 py-1 text-sm text-[#C2457F]">🔔 تفعيل الإشعار</button></>:<p className="text-sm text-gray-400">جارٍ التحميل…</p>}</Card>
  <Card><h2 className="mb-2 font-bold text-[#C2457F]">حديث اليوم <small className="text-gray-400">Hadith of the day</small></h2>
   {hd?<><p className="font-quran text-xl leading-[2.2]">{hd.text}</p><button onClick={()=>share(hd.text)} className="mt-3 rounded-full bg-gold/15 px-4 py-1 text-sm text-[#8a6d12]">🖼️ مشاركة كصورة</button></>:<p className="text-sm text-gray-400">جارٍ التحميل…</p>}</Card>
  <Card><h2 className="mb-2 font-bold text-[#C2457F]">الصلاة والقبلة <small className="text-gray-400">Prayer & Qibla</small></h2>
   {!pt&&<button onClick={loc} className="rounded-full bg-neon px-5 py-2 text-sm font-bold text-white">📍 استخدام موقعي</button>}
   {err&&<p className="mt-2 text-sm text-red-500">{err}</p>}
   {pt&&<div className="grid grid-cols-3 gap-2 text-center">{N.map((n,i)=><div key={n} className="rounded-2xl bg-white/80 p-2"><div className="text-xs text-gray-500">{n}</div><div className="font-bold" dir="ltr">{pt[K[i]]}</div></div>)}</div>}
   {qb!==null&&<div className="mt-4 flex items-center gap-3"><div className="grid h-16 w-16 place-items-center rounded-full border-2 border-gold bg-white"><span className="text-2xl" style={{transform:`rotate(${qb}deg)`}}>⬆️</span></div><p className="text-sm">اتجاه القبلة: {Math.round(qb)}° من الشمال</p></div>}</Card>
 </div>;
}
