import type {Devotional} from '../types';
export function VerseBlock({d}:{d:Devotional}){return <section className="verse-block"><span className="eyebrow">VERSÍCULO</span><blockquote>“{d.verse}”</blockquote><div className="reference">{d.reference} · {d.translation}</div></section>}
