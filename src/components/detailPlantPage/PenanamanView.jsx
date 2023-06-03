import Image from "../../assets/Hero.png";

export default function PenanamanView() {
  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Lokasi Tanaman</h5>
        <div className="text-neutral-80 mt-2">dengan pot / poly bag</div>
      </section>
      <hr className="mt-8" />
      <h4 className="text-h-6 font-bold">Menanam dengan pot</h4>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Cara Menanam</h5>
        <div className="text-neutral-80 mt-2">
          <h6 className="font-medium">Memilih Bibit Tomat</h6>
          <p className="mt-2">
            Memilih bibit buah tomat adalah langkah yang paling penting dalam
            menanam tomat. Pilihlah bibit tomat yang baik yang terbebas dari
            hama. Kamu bisa memilih buah tomat yang benar-benar matang ditandai
            dengan warna yang merah dan kulit yang tipis. Selain itu biji tomat
            juga tampak besar dan jika direndam tidak terapung. Tetapi jika kamu
            masih ragu, alangkah lebih baiknya kamu membeli bibit unggulan pada
            petani atau datang saja kios pertanian. Tentu bibit dari petani atau
            kios pertanian memiliki kemungkinan bibitnya lebih berkualitas.
          </p>
          <h6>Penyemaian</h6>
          <p>
            Langkah awal setelah memilih biji tomat adalah penyemaian. Biji
            tomat disemai terlebih dahulu di dalam kotak pesemaian. Media
            persemaian berupa campuran tanah dan pupuk kandang dengan
            perbandingan 1:1. Benih ditanamkan kedalam kotak pesemaian dan
            diletakkan di tempat yang teduh sehingga curahan hujan tidak merusak
            benih yang masih lemah. Bibit lalu dipindahkan ke dalam polybag
            kecil setelah bibit mempunyai 5 helai daun. Bibit yang telah berumur
            ± 1 bulan dapat dipindah ke dalam pot/polybag.
          </p>
          <h6>Panen Tomat</h6>
          <p>
            Setelah berumur 20 hari , pindahkan benih tomat pada lahan yang
            telah disiapkan. Jangan lupa untuk menggemburkan tanah lahan dan
            memberikan pupuk. Berhati-hatilah saat melepaskan benih dari polybag
            agar akar tidak rusak. Kamu bisa juga menggunakan ember bekas yang
            sudah dibersihkan. Campuran dari tanah, pasir dan kompos dengan
            perbandingan 1:1:1. Selama masa penanaman, rajinlah memberi pupuk.
            Gunakan pupuk kompos sehingga tomat menjadi lebih organik.
          </p>
          <h6>Perawatan Tomat</h6>
          <p>
            Jangan lupa untuk menyirami tanaman tomat setiap hari. Seringlah
            melihat apakah ada tanaman lain yang tumbuh yang akan mengganggu
            pertumbuhan tomat. Jika ada cabut secara rutin agar tomat bisa
            tumbuh dengan baik. Selain itu, jangan lupa untuk menancapkan bambu
            di samping tanaman sebagai media tomat untuk merambat.
          </p>
          <h6>Panen</h6>
          <p>
            Setelah 60 hari hingga 90 hari sejak masa tanam, tanaman tomnat
            biasanya sudah bisa dapat dipanen. Kamu pun bisa melakukan panen,
            memetik tomat dari halaman rumah kamu. Setelah itu, kamu pun bisa
            mengonsumsi tomat yang kaya akan vitamin.
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
        <h5 className="font-semibold text-body-lg">
          Link Vidio Cara Penanaman
        </h5>
        <div className="text-neutral-80 mt-2">
          https://www.youtube.com/watch?v=1i8WJ8cRWsE&list=RDGMEMQ1dJ7wXf
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
