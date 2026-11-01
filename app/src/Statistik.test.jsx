import { test, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App.jsx';

const DATA = [
    { id: '1', judul: 'Buku A', kategori: 'Kategori A', penulis: 'Penulis A', tahunTerbit: 2020, status: 'Ingin DIbeli'},
    { id: '2', judul: 'Buku B', kategori: 'Kategori B', penulis: 'Penulis B', tahunTerbit: 2022, status: 'Dimiliki'},
    { id: '3', judul: 'Buku C', kategori: 'Kategori C', penulis: 'Penulis C', tahunTerbit: 2024, status: 'Sedang Dibaca'},
]

beforeEach(() => {
    localStorage.removeItem('uts-paw-koleksi')
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(DATA))),
    )
})

afterEach(() => {
    vi.unstubAllGlobals()
})

function buka(path){
    render(
        <MemoryRouter initialEntries={[path]}>
            <App />
        </MemoryRouter>,
    )
}

test('menampilkan jumlah item perkategori dan total koleksi', async () => {
    buka('/statistik')

    expect(await screen.findByRole('heading', {name: 'Statistik'})).toBeInTheDocument()
    expect(await screen.findByRole('row', {name: '/The Psychology of Money/'})).toBeInTheDocument()
    expect(await screen.findByRole('row', {name: '/Keuangan/'})).toBeInTheDocument()
    expect(await screen.findByRole('row', {name: '/Jumlah 1/'})).toBeInTheDocument()
})