export default function PenyiramanView({ plantWatering }) {
  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Waktu Penyiraman</h5>
        <div className="text-neutral-80 mt-2">
          {plantWatering?.watering_period} kali sehari
        </div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">
          Deskripsi informasi penyiraman
        </h5>
        <div
          className="styled-content text-neutral-80 mt-2"
          dangerouslySetInnerHTML={{
            __html: plantWatering?.watering_description,
          }}
        ></div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">
          Gambar informasi penyiraman
        </h5>
        <div className="text-neutral-80 mt-2">
          <img
            src={
              plantWatering?.watering_pictures?.length > 0
                ? `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                    plantWatering.watering_pictures[0]?.url
                  }`
                : ""
            }
            alt="Gambar Penyiramans"
            className="w-[210px]"
          />
        </div>
      </section>
    </div>
  );
}
