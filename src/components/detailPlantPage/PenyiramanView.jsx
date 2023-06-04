import Image from "../../assets/Hero.png";

export default function PenyiramanView() {
  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Waktu Penyiraman</h5>
        <div className="text-neutral-80 mt-2">1 kali sehari</div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">
          Deskripsi informasi penyiraman
        </h5>
        <div className="text-neutral-80 mt-2">
          <p className="mt-2">
            Untuk menyirami tanaman tomat, perlu dilakukan 2 kali dalam sehari
            ketika pagi dan sore. Namun harus memperhatikan kelemahan tanaman
            tomat, yaitu tidak tahan dengan genangan dan rentan terhadap
            kekurangan oksigen.
          </p>
          <p className="mt-2">
            Oleh karena itu, siramlah tanaman secukupnya saja tidak perlu
            terlalu basah kuyup yang dapat menimbulkan genangan disekitar akar.
          </p>
          <p className="mt-2">
            Penyiraman saat pagi, harus dengan air yang lebih sedikit dari sore
            hari, karena ketika sore hari lebih diperlukan untuk menggantikan
            air yang hilang karena penguapan dan mengembalikan kekuatan tanaman
            ketika malam hari tiba.
          </p>
        </div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">
          Alat dan bahan untuk penanaman
        </h5>
        <div className="text-neutral-80 mt-2">
          <h6 className="font-medium">Alat dan Bahan</h6>
          <ol className="list-decimal ms-4 mt-2">
            <li>Pot</li>
            <li>Tanah subur</li>
            <li>Bibit tomat</li>
            <li>Pupuk</li>
          </ol>
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
