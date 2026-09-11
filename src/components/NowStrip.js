import '../styles/NowStrip.css';
import DATA from '../data/tg-posts.json';
import { useLang } from '../context/LangContext';

// "Now" strip under the hero: what is going on this season. Texts live in
// translations; the channel numbers come from the committed Telegram data.
export default function NowStrip() {
  const { t } = useLang();
  const n = t.now;
  const posts = DATA.posts?.length ?? 0;
  const subs = DATA.subscribers ?? 0;

  return (
    <section className="now" aria-label={n.label}>
      <div className="now__label"><i aria-hidden="true" />{n.label}</div>
      {n.items.map((item, i) => {
        const hint = item.channel && subs > 0
          ? `${t.blog.subscribersFmt(subs)} · ${n.postsFmt(posts)}`
          : item.hint;
        return (
          <a key={i} className="now__item" href={item.href} target="_blank" rel="noreferrer">
            <span className="now__text">{item.text}</span>
            <span className="now__hint">{hint}</span>
          </a>
        );
      })}
    </section>
  );
}
