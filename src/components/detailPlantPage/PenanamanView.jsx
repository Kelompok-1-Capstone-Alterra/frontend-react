export default function PenanamanView({ plantPlanting }) {
  const isContainer = plantPlanting?.planting_container;
  const isGround = plantPlanting?.planting_ground;

  return (
    <div className="mt-8">
      <section>
        <h5 className="font-semibold text-body-lg">Lokasi Tanaman</h5>
        <div className="text-neutral-80 mt-2">
          {isContainer && isGround
            ? "dengan pot / poly bag dan tanpa pot"
            : isContainer
            ? "dengan pot / poly bag"
            : "tanpa pot"}
        </div>
      </section>
      {isContainer && (
        <>
          <hr className="mt-8" />
          <h4 className="text-h-6 font-bold mt-8">Menanam dengan pot</h4>
          <section className="mt-8">
            <h5 className="font-semibold text-body-lg">Cara Menanam</h5>
            <div
              className="styled-content text-neutral-80 mt-2"
              dangerouslySetInnerHTML={{
                __html: plantPlanting?.container_info?.container_instruction,
              }}
            ></div>
          </section>
          <section className="mt-8">
            <h5 className="font-semibold text-body-lg">
              Alat dan bahan untuk penanaman
            </h5>
            <div
              className="styled-content text-neutral-80 mt-2"
              dangerouslySetInnerHTML={{
                __html: plantPlanting?.container_info?.container_materials,
              }}
            ></div>
          </section>
          <section className="mt-8">
            <h5 className="font-semibold text-body-lg">
              Link Vidio Cara Penanaman
            </h5>
            <div className="text-neutral-80 mt-2">
              {plantPlanting?.container_info?.container_video}
            </div>
          </section>
          <section className="mt-8">
            <h5 className="font-semibold text-body-lg">Gambar pemupukkan</h5>
            <div className="text-neutral-80 mt-2">
              <img
                src={
                  plantPlanting?.container_info?.container_pictures?.length > 0
                    ? `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                        plantPlanting.container_info.container_pictures[0]?.url
                      }`
                    : ""
                }
                alt="Gambar penanaman dengan pot"
                className="w-[210px]"
              />
            </div>
          </section>
        </>
      )}
      {isGround && (
        <>
          <hr className="mt-8" />
          <h4 className="text-h-6 font-bold mt-8">Menanam tanpa pot</h4>
          <section className="mt-8">
            <h5 className="font-semibold text-body-lg">Cara Menanam</h5>
            <div
              className="styled-content text-neutral-80 mt-2"
              dangerouslySetInnerHTML={{
                __html: plantPlanting?.ground_info?.ground_instruction,
              }}
            ></div>
          </section>
          <section className="mt-8">
            <h5 className="font-semibold text-body-lg">
              Alat dan bahan untuk penanaman
            </h5>
            <div
              className="styled-content text-neutral-80 mt-2"
              dangerouslySetInnerHTML={{
                __html: plantPlanting?.ground_info?.ground_materials,
              }}
            ></div>
          </section>
          <section className="mt-8">
            <h5 className="font-semibold text-body-lg">
              Link Vidio Cara Penanaman
            </h5>
            <div className="text-neutral-80 mt-2">
              {plantPlanting?.ground_info?.ground_video}
            </div>
          </section>
          <section className="mt-8">
            <h5 className="font-semibold text-body-lg">Gambar pemupukkan</h5>
            <div className="text-neutral-80 mt-2">
              <img
                src={
                  plantPlanting?.ground_info?.ground_pictures?.length > 0
                    ? `${import.meta.env.VITE_API_BASE_URL}/pictures/${
                        plantPlanting.ground_info.ground_pictures[0]?.url
                      }`
                    : ""
                }
                alt="Gambar penanaman tanpa pot"
                className="w-[210px]"
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
