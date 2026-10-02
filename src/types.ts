export type Devotional={id:string;date:string;title:string;theme:string;verse:string;reference:string;translation:string;reflection:string;question:string;prayer:string;affirmation:string;category:string;readingTime:string};
export type JournalEntry={id:string;date:string;title:string;reflection:string;gratitude?:string;need?:string;prayer?:string;devotionalId?:string;mood?:number};
export type Mood={date:string;mood:number};
export type Settings={userName:string;reminderTime:string;notifications:boolean;theme:'light'|'dark';textSize:'small'|'normal'|'large';animations:boolean;onboardingDone:boolean;morningIntentions:string[]};
export type Tab='home'|'explore'|'journal'|'saved'|'settings';
