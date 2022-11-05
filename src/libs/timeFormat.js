const month = [
  'Januari', 'Februari','Maret', 'April',
  'Mei', 'Juni', 'Juli', 'Agustus',
  'September', 'Oktober', 'November', 'Desember'
]

export const formatDate = (dateString) => {
  const date = new Date(dateString??null)

  const tahun = date.getFullYear();
  const bulan = date.getMonth();
  const tanggal = date.getDate();

  return `${String(tanggal).padStart(2, '0')} ${month[bulan]} ${tahun}`
}