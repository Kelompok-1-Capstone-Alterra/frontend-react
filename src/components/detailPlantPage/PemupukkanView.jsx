import Image from "../../assets/Hero.png";

export default function PemupukkanView() {
  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Berapa kali pemupukkan</h5>
        <div className="text-neutral-80 mt-2">6 kali</div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Waktu pemupukkan</h5>
        <div className="text-neutral-80 mt-2">30 hari sekali</div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Cara pemupukkan</h5>
        <div className="text-neutral-80 mt-2">
          <p>
            Pemupukan susulan tanaman tomat dianjurkan menggunakan pupuk NPK
            daun, kompos atau bisa juga dengan Pupuk Langsung Pakai (PLP),
            ketika usia tanam menginjak satu minggu, dan seterusnya setelah satu
            bulan, dan setiap 30 hari sekali.
          </p>
          <p className="mt-8">
            Jika menggunakan kompos, berikan satu kepalan tangan pada setiap
            tanaman baik dalam pot, polibag atau bedengan. Dan NPK sebanyak 2
            gram per tanaman.
          </p>
        </div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Gambar pemupukkan</h5>
        <div className="text-neutral-80 mt-2">
          <img
            src={Image}
            alt=""
            className="w-[210px]"
          />
        </div>
      </section>
    </div>
  );
}
