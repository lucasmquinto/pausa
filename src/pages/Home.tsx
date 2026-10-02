import {
    Moon,
    Sun,
    ArrowRight,
    PenLine,
    Sparkles,
    Settings as SettingsIcon,
} from 'lucide-react';

import { OrganicMark } from '../components/OrganicMark';
import { DevotionalCard } from '../components/DevotionalCard';
import type { Devotional, JournalEntry, Settings } from '../types';

const dayNames = [
    'domingo',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
];

const monthNames = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
];

type HomeProps = {
    settings: Settings;
    daily: Devotional;
    favorites: string[];
    onFavorite: (id: string) => void;
    onOpen: () => void;
    onJournal: () => void;
    onMorning: () => void;
    onNight: () => void;
    onSettings: () => void;
    completedCount: number;
    journal: JournalEntry[];
};

function GrowingPlant({ streak }: { streak: number }) {
    const stage =
        streak <= 0
            ? 0
            : streak <= 2
                ? 1
                : streak <= 6
                    ? 2
                    : streak <= 13
                        ? 3
                        : streak <= 29
                            ? 4
                            : 5;

    return (
        <div className={`garden-plant garden-stage-${stage}`}>
            <div className="plant-visual" aria-hidden="true">
                <div className="plant-ground" />

                {stage >= 1 && (
                    <div className="plant-stem">
                        <span className="leaf leaf-left" />
                        <span className="leaf leaf-right" />
                    </div>
                )}

                {stage >= 2 && (
                    <>
                        <span className="leaf leaf-left-high" />
                        <span className="leaf leaf-right-high" />
                    </>
                )}

                {stage >= 3 && (
                    <>
                        <span className="leaf leaf-left-top" />
                        <span className="leaf leaf-right-top" />
                    </>
                )}

                {stage >= 4 && (
                    <>
                        <span className="leaf leaf-extra-left" />
                        <span className="leaf leaf-extra-right" />
                    </>
                )}

                {stage >= 5 && (
                    <span className="plant-flower">
                        <i />
                        <i />
                        <i />
                        <i />
                        <b />
                    </span>
                )}

                {stage === 0 && <span className="plant-seed" />}
            </div>
        </div>
    );
}

function getStreak(journal: JournalEntry[]) {
    if (!journal.length) return 0;

    const dates = journal
        .map((entry) => {
            const rawDate =
                (entry as JournalEntry & { date?: string }).date ??
                (entry as JournalEntry & { createdAt?: string }).createdAt;

            if (!rawDate) return null;

            const date = new Date(rawDate);

            if (Number.isNaN(date.getTime())) return null;

            return new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate()
            ).getTime();
        })
        .filter((date): date is number => date !== null);

    const uniqueDates = [...new Set(dates)].sort((a, b) => b - a);

    if (!uniqueDates.length) return 0;

    const today = new Date();
    const todayStart = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    ).getTime();

    const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;

    if (uniqueDates[0] !== todayStart && uniqueDates[0] !== yesterdayStart) {
        return 0;
    }

    let streak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
        const difference =
            (uniqueDates[i - 1] - uniqueDates[i]) /
            (24 * 60 * 60 * 1000);

        if (difference === 1) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

export function Home({
    settings,
    daily,
    favorites,
    onFavorite,
    onOpen,
    onJournal,
    onMorning,
    onNight,
    onSettings,
    completedCount,
    journal,
}: HomeProps) {
    const now = new Date();
    const hour = now.getHours();

    const part =
        hour < 12
            ? 'Buenos días'
            : hour < 18
                ? 'Buenas tardes'
                : 'Buenas noches';

    const mark =
        hour < 12 ? (
            <Sun size={15} />
        ) : hour < 18 ? (
            <Sparkles size={15} />
        ) : (
            <Moon size={15} />
        );

    const date = `${dayNames[now.getDay()]}, ${now.getDate()} de ${monthNames[now.getMonth()]
        }`;

    const done =
        completedCount > 0 &&
        journal.some((entry) => entry.devotionalId === daily.id);

    const streak = getStreak(journal);

    const gardenMessage =
        streak === 0
            ? 'Cuando vuelvas, algo va a empezar a crecer.'
            : streak === 1
                ? 'Hoy plantaste una pequeña semilla.'
                : streak < 7
                    ? 'Tu constancia empieza a echar raíces.'
                    : streak < 14
                        ? 'Mirá cómo está creciendo lo que cuidás.'
                        : streak < 30
                            ? 'Día a día, este espacio se vuelve más tuyo.'
                            : 'Un mes de pequeñas pausas también puede florecer.';

    return (
        <div className="page home-page">
            <header className="topbar">
                <div>
                    <p className="greeting">
                        {part}, {settings.userName}
                    </p>

                    <p className="date-line">{date}</p>
                </div>

                <div className="top-actions">
                    <OrganicMark night={hour >= 19} />

                    <button
                        className="settings-icon"
                        onClick={onSettings}
                        aria-label="Preferencias"
                        type="button"
                    >
                        <SettingsIcon size={18} />
                    </button>
                </div>
            </header>

            <main>
                <section className="daily-intro">
                    <div className="moment-label">
                        {mark}
                        <span>PAUSA DE HOY</span>
                    </div>

                    <h1>
                        {done
                            ? 'Ya hiciste tu pausa de hoy.'
                            : 'Tu pausa de hoy está esperando.'}
                    </h1>

                    <p>
                        {done
                            ? '¿Querés escribir algo sobre lo que te llevás de este momento?'
                            : 'Un pequeño espacio para detenerte, leer, pensar y hablar con Dios.'}
                    </p>
                </section>

                <DevotionalCard
                    d={daily}
                    favorite={favorites.includes(daily.id)}
                    onFavorite={() => onFavorite(daily.id)}
                    onOpen={onOpen}
                />

                <section className="garden-card">
                    <div className="garden-header">
                        <div>
                            <span className="eyebrow">TU JARDÍN</span>
                            <h2>
                                {streak === 0
                                    ? 'Hay algo esperando crecer.'
                                    : `${streak} ${streak === 1 ? 'día' : 'días'} volviendo`}
                            </h2>
                        </div>
                    </div>

                    <GrowingPlant streak={streak} />

                    <div className="garden-footer">
                        <p>{gardenMessage}</p>

                        <span className="garden-caption">
                            Cada día que volvés, algo crece.
                        </span>
                    </div>
                </section>

                <section className="ritual-links">
                    <button type="button" onClick={onMorning}>
                        <span>
                            <Sun size={17} />
                        </span>

                        <div>
                            <strong>Comenzar el día</strong>
                            <small>Un minuto antes de empezar</small>
                        </div>

                        <ArrowRight size={17} />
                    </button>

                    <button type="button" onClick={onNight}>
                        <span>
                            <Moon size={17} />
                        </span>

                        <div>
                            <strong>Pausa nocturna</strong>
                            <small>Cerrar el día despacio</small>
                        </div>

                        <ArrowRight size={17} />
                    </button>
                </section>

                <div className="home-note">
                    <span>{completedCount} pausas</span>
                    <p>haciendo espacio para Dios</p>
                </div>

                {journal.length > 0 && (
                    <button
                        className="write-nudge"
                        onClick={onJournal}
                        type="button"
                    >
                        <PenLine size={17} />
                        Seguir escribiendo en mi diario
                    </button>
                )}
            </main>
        </div>
    );
}   