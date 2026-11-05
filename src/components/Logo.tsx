export default function Logo({size=64,className=''}:{size?:number;className?:string}){
 return <img src={import.meta.env.BASE_URL+'icon.svg'} width={size} height={size} className={className} alt="Sancha"/>;
}
