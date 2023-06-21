import ImageWithSkeleton from "../ImageWithSkeleton";

export default function PemupukkanView({ plantFertilizing }) {
  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Berapa kali pemupukkan</h5>
        <div className="text-neutral-80 mt-2">
          {plantFertilizing?.fertilizing_limit} kali
        </div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Waktu pemupukkan</h5>
        <div className="text-neutral-80 mt-2">
          {plantFertilizing?.fertilizing_period} hari sekali
        </div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Cara pemupukkan</h5>
        <div
          className="styled-content text-neutral-80 mt-2"
          dangerouslySetInnerHTML={{
            __html: plantFertilizing?.fertilizing_description,
          }}
        ></div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Gambar pemupukkan</h5>
        <div className="text-neutral-80 mt-2">
          <ImageWithSkeleton
            src={
              plantFertilizing?.fertilizing_pictures?.length > 0
                ? `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                    plantFertilizing.fertilizing_pictures[0]?.url
                  }`
                : ""
            }
            alt="Gambar pemupukkan"
            width={210}
            height={210}
          />
        </div>
      </section>
    </div>
  );
}
