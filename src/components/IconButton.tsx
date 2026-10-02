import type {ReactNode} from 'react';
export function IconButton({label,onClick,children,className=''}:{label:string;onClick?:()=>void;children:ReactNode;className?:string}){return <button className={`icon-button ${className}`} aria-label={label} onClick={onClick}>{children}</button>}
