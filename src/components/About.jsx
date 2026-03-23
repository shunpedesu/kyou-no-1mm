import DuckChar from './DuckChar'
import { LAB_NAME, LAB_TAGLINE, NOTE_URL } from '../constants'

export default function About({ onBack }) {
  return (
    <div className="screen about">
      <header className="about-header">
        <button className="icon-btn" onClick={onBack} aria-label="戻る">
          ←
        </button>
        <span className="about-header-title">{LAB_NAME}</span>
        <span style={{ width: 40 }} />
      </header>

      <div className="about-body">
        <div className="about-hero">
          <DuckChar size={72} className="about-duck" />
          <h1 className="about-title">{LAB_NAME}</h1>
          <p className="about-subtitle">{LAB_TAGLINE}</p>
        </div>

        <section className="about-section">
          <p className="about-text">
            「今日もしんどかった」——そんな日が続いていても、<br />
            1ミリだけ前に進めたら、それでじゅうぶんだと思っています。
          </p>
          <p className="about-text">
            このアプリは、無理をしない・比べない・責めない、<br />
            そういう考えのもとで作りました。<br />
            あなたのペースで使ってください。
          </p>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">アプリの使い方</h2>
          <ul className="about-list">
            <li>毎日ランダムに「1ミリ提案」が届きます</li>
            <li>できたら「やった」、見るだけでも「みた」でOK</li>
            <li>メモを残せば、振り返りに使えます</li>
            <li>記録画面で、自分のペースを確認できます</li>
          </ul>
        </section>

        <section className="about-section">
          <h2 className="about-section-title">大切にしていること</h2>
          <ul className="about-list">
            <li>データはすべてあなたのスマホに保存されます</li>
            <li>アカウント登録なし・広告なし</li>
            <li>「できない日」があっても、責めない設計</li>
          </ul>
        </section>

        <div className="about-note">
          <p className="about-note-text">
            考えていることや研究所の活動は<br />
            noteで書いています。よかったら。
          </p>
          <a
            href={NOTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--secondary about-note-btn"
          >
            noteを読みに行く
          </a>
        </div>
      </div>
    </div>
  )
}
