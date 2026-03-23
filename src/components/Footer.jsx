import { LAB_NAME, LAB_TAGLINE, NOTE_URL } from '../constants'

export default function Footer({ onAbout }) {
  return (
    <footer className="app-footer">
      <button className="footer-lab-name" onClick={onAbout}>
        {LAB_NAME}
      </button>
      <p className="footer-tagline">{LAB_TAGLINE}</p>
      <a
        href={NOTE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="footer-note-link"
      >
        note を読む →
      </a>
    </footer>
  )
}
