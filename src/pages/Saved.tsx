import { Bookmark } from 'lucide-react';
import type { Devotional } from '../types';
import { DevotionalCard } from '../components/DevotionalCard';

export function Saved({
    devotionals,
    favorites,
    onFavorite,
    onOpen,
}: {
    devotionals: Devotional[];
    favorites: string[];
    onFavorite: (id: string) => void;
    onOpen: (d: Devotional) => void;
}) {
    const list = devotionals.filter((d) => favorites.includes(d.id));

    return (
        <div className="page">
            <header className="section-header">
                <div>
                    <span className="eyebrow">LO QUE QUIERO RECORDAR</span>
                    <h1>Guardados</h1>
                    <p>Palabras que querés tener cerca.</p>
                </div>
            </header>

            {list.length === 0 ? (
                <div className="empty">
                    <Bookmark size={28} />
                    <h2>Todavía no guardaste nada.</h2>
                    <p>
                        Cuando una reflexión te acompañe especialmente, podés guardarla
                        acá.
                    </p>
                </div>
            ) : (
                <div className="saved-list">
                    {list.map((d) => (
                        <DevotionalCard
                            key={d.id}
                            d={d}
                            favorite
                            onFavorite={() => onFavorite(d.id)}
                            onOpen={() => onOpen(d)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}