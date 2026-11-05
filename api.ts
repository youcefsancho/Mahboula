export const j=(u:string):Promise<any>=>fetch(u).then(r=>{if(!r.ok)throw new Error(String(r.status));return r.json()});
export const A='https://api.alquran.cloud/v1';
export const H='https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions';
export const RECITERS=[{id:'ar.alafasy',n:'مشاري العفاسي'},{id:'ar.abdurrahmaansudais',n:'السديس'},{id:'ar.husary',n:'الحصري'},{id:'ar.minshawi',n:'المنشاوي'}];
export const day=()=>Math.floor(Date.now()/864e5);
export async function share(text:string){
 const c=document.createElement('canvas');c.width=c.height=1080;const x=c.getContext('2d')!;
 const g=x.createLinearGradient(0,0,1080,1080);g.addColorStop(0,'#FFF0F5');g.addColorStop(1,'#FFC6DD');x.fillStyle=g;x.fillRect(0,0,1080,1080);
 x.strokeStyle='#D4AF37';x.lineWidth=8;x.strokeRect(40,40,1000,1000);
 x.direction='rtl';x.textAlign='center';x.fillStyle='#4A2B3A';x.font='44px Amiri, serif';
 const out:string[]=[];let line='';
 for(const w of text.split(' ')){if(x.measureText(line+' '+w).width>880){out.push(line);line=w}else line+=' '+w}out.push(line);
 out.slice(0,12).forEach((l,i)=>x.fillText(l.trim(),540,200+i*70));
 x.fillStyle='#D4AF37';x.font='36px sans-serif';x.fillText('Sancha',540,1000);
 const b=await new Promise<Blob>(r=>c.toBlob(v=>r(v!)));const f=new File([b],'hadith.png',{type:'image/png'});
 if((navigator as any).canShare?.({files:[f]}))await navigator.share({files:[f]});
 else{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='hadith.png';a.click()}
}
