import { Link } from 'react-router-dom'

export default function KartuItem({ item, onEdit }) {
  const { id, judul, kategori, penulis, tahunTerbit } = item
  return (
    <article className="kartu">
      <h3>
        <Link to={`/koleksi/${id}`}>{judul}</Link>
      </h3>
      <p>
        {kategori} · penulis {penulis} · tahun {tahunTerbit}
      </p>
      
      <button type="button" onClick={() => onEdit(item)}>
        Edit
      </button>
    </article>
  )
}