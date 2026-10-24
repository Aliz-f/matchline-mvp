import type {ReactNode} from 'react';
import {Info} from 'lucide-react';
export function Notice({children}:{children:ReactNode}){return <div className="notice"><Info size={17}/><span>{children}</span></div>}
