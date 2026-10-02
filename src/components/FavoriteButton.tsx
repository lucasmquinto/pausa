import {Heart} from 'lucide-react';
export function FavoriteButton({active,onClick}:{active:boolean;onClick:()=>void}){return <button className={`favorite ${active?'is-favorite':''}`} onClick={onClick} aria-label={active?'Quitar de guardados':'Guardar esta pausa'}><Heart size={21} strokeWidth={1.5} fill={active?'currentColor':'none'}/></button>}
