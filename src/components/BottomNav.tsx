import {NavLink} from 'react-router-dom';
const T=[['/','الرئيسية','Home','🏠'],['/quran','القرآن','Quran','📖'],['/hadith','الأحاديث','Hadith','📜'],['/podcasts','البودكاست','Podcasts','🎧'],['/videos','الفيديو','Video','▶️']];
export default function BottomNav(){
 return <nav className="fixed inset-x-3 bottom-3 z-40 flex justify-around rounded-3xl border border-white/80 bg-white/75 py-2 shadow-[0_8px_30px_rgba(255,111,174,.3)] backdrop-blur-xl">
  {T.map(([to,a,e,i])=><NavLink key={to} to={to} end className={({isActive})=>`flex flex-col items-center rounded-2xl px-3 py-1 text-xs ${isActive?'bg-neon/15 font-bold text-[#C2457F]':'text-gray-500'}`}>
   <span className="text-lg">{i}</span>{a}<small className="text-[9px] opacity-60">{e}</small></NavLink>)}</nav>;
}
