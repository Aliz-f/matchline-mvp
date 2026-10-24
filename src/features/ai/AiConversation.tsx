import {useEffect,useRef,useState} from 'react';
import {Bot,Send,ShieldAlert} from 'lucide-react';
import type {ChatMessage,Match} from '../../types/domain';
import {askMatchlineAI,isLiveAiConfigured} from '../../services/ai';
import {useAppStore} from '../../store/useAppStore';
import {AI_MODE} from '../../config/demo';
const prompts=['What were the turning points?','How does this affect the league table?','What if the starting lineup changed?'];
export function AiConversation({match}:{match:Match}){
 const [history,setHistory]=useState<ChatMessage[]>([]);const [question,setQuestion]=useState('');const [busy,setBusy]=useState(false);const [error,setError]=useState('');const prefs=useAppStore(s=>s.preferences);const abortRef=useRef<AbortController|null>(null);
 useEffect(()=>()=>abortRef.current?.abort(),[]);
 async function ask(text:string){const clean=text.trim();if(!clean||busy)return;setBusy(true);setError('');setQuestion('');setHistory(h=>[...h,{id:`u-${Date.now()}`,role:'user',content:clean,timestamp:new Date().toISOString(),source:'user'}]);
  const controller=new AbortController();abortRef.current=controller;
  try{const response=await askMatchlineAI({match,preferences:prefs,question:clean,signal:controller.signal});setHistory(h=>[...h,{id:`a-${Date.now()}`,role:'assistant',content:response.content,timestamp:new Date().toISOString(),source:response.source}]);}
  catch(e){setError(e instanceof Error?e.message:'AI request failed.');}finally{setBusy(false);abortRef.current=null;}
 }
 const liveConfigured=isLiveAiConfigured();
 return <div className="chat-widget"><div className="chat-meta"><span className="status status-upcoming">{liveConfigured?'OPENROUTER DEMO':'OFFLINE AI DEMO'}</span><span>{liveConfigured?'Direct browser mode · simulated data':'Grounded in simulated data'}</span></div>
 <div className="chat-history" aria-live="polite">{history.length===0?<div className="chat-placeholder"><Bot size={30}/><strong>What would you like to know?</strong><span>Ask about this match, your team, or a hypothetical scenario.</span></div>:history.map(msg=><div key={msg.id} className={`bubble ${msg.role}`}><div className="bubble-label">{msg.role==='user'?'YOU':msg.source==='openrouter'?'MATCHLINE AI · OPENROUTER':'MATCHLINE AI · OFFLINE'}</div><div className="chat-text">{msg.content}</div></div>)}{busy&&<p className="muted">Thinking about the match...</p>}</div>
 <div className="prompt-chips">{prompts.map(p=><button key={p} type="button" disabled={busy} onClick={()=>void ask(p)}>{p}</button>)}</div>
 {error&&<div role="alert" className="ai-error"><ShieldAlert size={16}/><span>{error}. You can switch to mock mode in .env.local for a reliable fallback.</span></div>}
 <form className="chat-input" onSubmit={e=>{e.preventDefault();void ask(question)}}><input aria-label="Ask a question about this match" placeholder="Ask anything about this match..." maxLength={500} value={question} onChange={e=>setQuestion(e.target.value)} disabled={busy}/><button type="submit" aria-label="Send question" disabled={busy||!question.trim()}><Send size={18}/></button></form>
 <div className="fine-print">Demo only. AI can make mistakes; hypothetical outcomes are not facts.{AI_MODE==='live'&&!liveConfigured?' No local key is configured, so offline mode is active.':''}</div></div>;
}
