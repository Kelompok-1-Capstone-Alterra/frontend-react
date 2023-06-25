import ImageWithSkeleton from "../ImageWithSkeleton";

export default function TemperaturView({ plantTemperature }) {
  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Temperature Ideal</h5>
        <div className="text-neutral-80 mt-2">
          {plantTemperature?.temperature_min}°C -{" "}
          {plantTemperature?.temperature_max}°C
        </div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">
          Deskripsi temperature tanaman
        </h5>
        <div
          className="styled-content text-neutral-80 mt-2"
          dangerouslySetInnerHTML={{
            __html: plantTemperature?.temperature_description,
          }}
        ></div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">
          Gambar temperature tanaman
        </h5>
        <div className="text-neutral-80 mt-2">
          <ImageWithSkeleton
            src={
              plantTemperature?.temperature_pictures?.length > 0
                ? `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                    plantTemperature.temperature_pictures[0]?.url
                  }`
                : ""
            }
            alt="Gambar temperatur tanaman"
            width={210}
            height={210}
          />
        </div>
      </section>
    </div>
  );
}
