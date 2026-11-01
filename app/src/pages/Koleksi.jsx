import { useState } from 'react'
import useKoleksi from '../hooks/useKoleksi.js'
import KotakPencarian from '../components/KotakPencarian.jsx'
import KartuItem from '../components/KartuItem.jsx'
import TombolAksi from '../components/TombolAksi.jsx'
import EditBuku from '../components/EditBuku.jsx'

export default function Koleksi() {
  const { items, loading, error, perbarui } = useKoleksi()
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const [bukuEdit, setBukuEdit] = useState(null)

  function resetFilter() {
    setCari('')
    setKategori('Semua')
  }

  function simpanPerubahan(bukuDiubah) {
    perbarui(bukuDiubah)
    setBukuEdit(null)
  }

  if (loading) return <p>Memuat data...</p>
  if (error) return <p role="alert">Gagal memuat: {error}</p>

  const daftarKategori = ['Kategori', ...new Set(items.map((item) => item.kategori))]
  const tampil = items.filter(
    (item) =>
      item.judul.toLowerCase().includes(cari.toLowerCase()) &&
      (kategori === 'Semua' || item.kategori === kategori),
  )

  return (
    <section>
      <h1>Koleksi</h1>
      <div className="alat-koleksi">
        <KotakPencarian nilai={cari} onUbah={setCari} />
        <select aria-label="Kategori" value={kategori} onChange={(e) => setKategori(e.target.value)}>
          {daftarKategori.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>

        <TombolAksi type="button" varian="bahaya" onClick={resetFilter}>
          Reset Filter
        </TombolAksi>

      </div>
        {tampil.length === 0 ? (
          <p>Tidak ada judul yang cocok.</p>
        ) : (
          <div className="daftar-kartu">
            {tampil.map((item) => (
              <KartuItem
                key={item.id}
                item={item}
                onEdit={setBukuEdit}
              />
            ))}

            {bukuEdit && (
              <EditBuku
                buku={bukuEdit}
                onSimpan={simpanPerubahan}
                onBatal={() => setBukuEdit(null)}
              />
            )}
        </div>
      )}
    </section>
  )
}