import Image from "../../assets/Hero.png";

export default function DetailTanamanView() {
  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Nama Tanaman</h5>
        <div className="text-neutral-80 mt-2">Tomat</div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Nama Latin Tanaman</h5>
        <div className="text-neutral-80 mt-2">Solanum lycopersicum</div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Deskripsi</h5>
        <div className="text-neutral-80 mt-2">
          <p>
            Tomat atau rangam (Solanum lycopersicum) adalah tumbuhan dari
            keluarga Solanaceae, tumbuhan asli Amerika Tengah dan Selatan, dari
            Meksiko sampai Peru. Tomat merupakan tumbuhan siklus hidup singkat,
            dapat tumbuh setinggi 1 sampai 3 meter. Tumbuhan ini memiliki buah
            berwarna hijau, kuning, dan merah yang biasa dipakai sebagai sayur
            dalam masakan atau dimakan secara langsung tanpa diproses. Tomat
            memiliki batang dan daun yang tidak dapat dikonsumsi karena masih
            sekeluarga dengan kentang dan terung yang mengadung alkaloid.Cara
            menanam tanaman tomat adalah disemai lebih dahulu, setelah tumbuh 4
            daun sejati kemudian ditanam (dijadikan bibit terlebih dahulu).
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
