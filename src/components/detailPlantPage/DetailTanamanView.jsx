import ImageWithSkeleton from "../ImageWithSkeleton";

export default function DetailTanamanView({ plantDetail }) {
  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Nama Tanaman</h5>
        <div className="text-neutral-80 mt-2">{plantDetail?.plant_name}</div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Nama Latin Tanaman</h5>
        <div className="text-neutral-80 mt-2">{plantDetail?.plant_latin}</div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Deskripsi</h5>
        <div
          className="styled-content text-neutral-80 mt-2"
          dangerouslySetInnerHTML={{ __html: plantDetail?.plant_description }}
        ></div>
      </section>
      <section className="mt-8">
        <h5 className="font-semibold text-body-lg">Gambar pemupukkan</h5>
        <div className="text-neutral-80 mt-2">
          <ImageWithSkeleton
            src={
              plantDetail?.plant_pictures?.length > 0
                ? `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                    plantDetail.plant_pictures[0]?.url
                  }`
                : ""
            }
            alt="Gambar Tanaman"
            width={210}
            height={210}
          />
        </div>
      </section>
    </div>
  );
}
