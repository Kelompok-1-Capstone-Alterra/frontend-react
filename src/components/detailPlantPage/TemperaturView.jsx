import Image from "../../assets/Hero.png";

export default function TemperaturView() {
  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Temperature Ideal</h5>
        <div className="text-neutral-80 mt-2">24°C - 28°C</div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">
          Deskripsi temperature tanaman
        </h5>
        <div className="text-neutral-80 mt-2">
          <p className="mt-2">
            Tanaman tomat bisa tumbuh baik di dataran tinggi (lebih dari 700 m
            dpi), dataran medium (200 m - 700 m dpi), dan dataran rendah (kurang
            dari 200 m dpl).
          </p>
          <p className="mt-2">
            Faktor temperatur dapat mempengaruhi warna buah. Pada temperatur
            tinggi (di atas 32°C) warna buah tomat cenderung kuning, sedangkan
            pada temperatur tidak tetap warna buah cenderung tidak merata.
          </p>
          <p className="mt-2">
            Temperatur ideal dan berpengaruh baik terhadap warna buah tomat
            adalah antara 24°C - 28°C yang umumnya merah merata.
          </p>
        </div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">
          Gambar temperature tanaman
        </h5>
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
