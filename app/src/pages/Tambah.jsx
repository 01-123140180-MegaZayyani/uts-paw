import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import TombolAksi from '../components/TombolAksi.jsx'
import './Tambah.css'

const AWAL = { judul: '', kategori: 'Kategori', penulis: '', tahunTerbit: '2005', status: 'Ingin Dimiliki' }

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const simpan = (e) => {
    e.preventDefault()
    if (form.judul.trim().length < 3) {
      setGalat('Judul wajib diisi, minimal 3 karakter.')
      return
    }
    tambah({ ...form, judul: form.judul.trim() })
    navigate('/koleksi')
    console.log('Data yang akan disimpan:', form)
  }

  const konfirmasiBatal =( ) => {
    if (window.confirm(`Batal menambahkan buku "${form.judul}"? (Buku tidak akan tersimpan)`)) {
      navigate('/koleksi')
    }
  }

  return (
    <form className="formulir" onSubmit={simpan} noValidate>
      <h1>Tambah Buku</h1>

      <label htmlFor="judul">Judul</label>
      <input id="judul" name="judul" value={form.judul} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        <option>Keuangan</option>
        <option>Novel</option>
        <option>Komik</option>
        <option>Pengembangan Diri</option>
      </select>

      <label htmlFor="penulis">Penulis</label>
      <input id="penulis" name="penulis" type="text" value={form.penulis} onChange={ubah} />

      <label htmlFor="tahunTerbit">Tahun Terbit</label>
      <input id="tahunTerbit" name="tahunTerbit" type="number" value={form.tahunTerbit} onChange={ubah} />

      <label htmlFor="status">Status</label>
      <select id="status" name="status" value={form.status} onChange={ubah}>
        <option value="dimiliki">Dimiliki</option>
        <option value="sedangDibaca">Sedang Dibaca</option>
        <option value="inginDibeli">Ingin Dibeli</option>
      </select> 

      <TombolAksi type="submit">Simpan</TombolAksi>
      <TombolAksi type="button" onClick={konfirmasiBatal}>
        Batal
      </TombolAksi>
      <p>Isi state saat ini: {JSON.stringify(form)}</p>
    </form>
  )
}