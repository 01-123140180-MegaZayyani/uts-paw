import { useEffect,useState } from 'react'

export default function EditBuku({ buku, onSimpan, onBatal }) {
    const [form, setForm] = useState(buku)
    const [galat, setGalat] = useState('')

    useEffect(() => {
        setForm(buku)
    }, [buku])

    function ubah(e) {
        setForm((sebelumnya) => ({
            ...sebelumnya,
            [e.target.name]: e.target.value,
        }))
    }

    function simpan(e) {
        e.preventDefault()

        if (form.judul.trim().length < 3){
            setGalat('Judul wajib diisi, minimal 3 karakter.')
            return
        }

        onSimpan({
            ...form,
            judul: form.judul.trim(),
        })
    }

    return (
        <form className="formulir" onSubmit={simpan} noValidate>
          <h1>Edit Buku</h1>
    
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
    
          <button type="submit">Simpan</button>
          <button type="button" onClick={onBatal}>
            Batal
          </button>
          <p>Isi state saat ini: {JSON.stringify(form)}</p>
        </form>
    )
}