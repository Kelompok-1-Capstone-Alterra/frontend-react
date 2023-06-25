import Hero from "../../assets/img/landing/Hero.png";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { APPLICATION_DOWNLOAD_LINK } from "../../constants";
import Landing1 from "../../assets/img/landing/Landing1.webp";
import Landing2 from "../../assets/img/landing/Landing2.webp";
import Landing3 from "../../assets/img/landing/Landing3.webp";

export default function LandingPage() {
  return (
    <>
      <div className="px-8 lg:px-32">
        <section>
          <div className="grid min-h-screen">
            <div className="flex flex-col items-center justify-between min-w-full lg:gap-2 max-w-7xl lg:flex-row-reverse">
              <img
                src={Hero}
                className="flex-1 max-w-sm lg:min-w-[543px]"
              />
              <div>
                <h1 className="text-h-1 font-bold lg:-mt-24">
                  Pantau tanaman anda kapan saja
                </h1>
                <p className="text-[#6B7280] my-9 text-lg">
                  Agriplan memberikan jadwal perawatan khusus dan pengingat
                  untuk tanaman Anda, serta memberikan rekomendasi, panduan
                  langkah demi langkah, identifikasi, dan pengukur cahaya untuk
                  membantu menjaga kehidupan tanaman Anda.
                </p>
                <Link to={APPLICATION_DOWNLOAD_LINK}>
                  <Button
                    variant={"green"}
                    size="lg"
                    className={"rounded-full"}
                    id="download-1"
                  >
                    Download Sekarang
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="min-w-full">
          <div className="flex flex-col items-center justify-center gap-4 my-10 lg:flex-row lg:gap-16">
            <img
              src={Landing1}
              alt="tanaman"
              className="lg:w-[480px] rounded-[46px]"
            />
            <div>
              <h3 className="text-h-3 font-bold">
                Jaga Tanaman Anda Tetap Segar dengan Agriplan
              </h3>
              <p className="my-4 font-semibold">
                Tidak yakin kapan waktu yang tepat untuk menyiram tanamanmu?
                Cukup tambahkan tanaman ke aplikasi dan dapatkan pengingat kapan
                wakunya untuk menyiram dan pemupukan
              </p>
              <Link
                to={APPLICATION_DOWNLOAD_LINK}
                className="font-semibold text-primary hover:text-primary-hover"
                id="download-2"
              >
                Download Sekarang {">"}
              </Link>
            </div>
          </div>
        </section>
        <section className="min-w-full lg:mb-16">
          <div className="flex flex-col items-center justify-center gap-4 my-10 lg:flex-row-reverse lg:gap-16">
            <img
              src={Landing2}
              alt="tanaman"
              className="lg:w-[480px] rounded-[46px]"
            />
            <div>
              <h3 className="text-h-3 font-bold">
                Jaga Tanaman Anda Tetap Segar dengan Agriplan
              </h3>
              <p className="my-4 font-semibold">
                Tidak yakin kapan waktu yang tepat untuk menyiram tanamanmu?
                Cukup tambahkan tanaman ke aplikasi dan dapatkan pengingat kapan
                wakunya untuk menyiram dan pemupukan
              </p>
              <Link
                to={APPLICATION_DOWNLOAD_LINK}
                className="font-semibold text-primary hover:text-primary-hover"
                id="download-3"
              >
                Download Sekarang {">"}
              </Link>
            </div>
          </div>
        </section>
        <section className="min-w-full lg:mb-16">
          <div className="flex flex-col items-center justify-center gap-4 my-10 lg:flex-row lg:gap-16">
            <img
              src={Landing3}
              alt="tanaman"
              className="lg:w-[480px] rounded-[46px]"
            />
            <div>
              <h3 className="text-h-3 font-bold">
                Jaga Tanaman Anda Tetap Segar dengan Agriplan
              </h3>
              <p className="my-4 font-semibold">
                Tidak yakin kapan waktu yang tepat untuk menyiram tanamanmu?
                Cukup tambahkan tanaman ke aplikasi dan dapatkan pengingat kapan
                wakunya untuk menyiram dan pemupukan
              </p>
              <Link
                to={APPLICATION_DOWNLOAD_LINK}
                className="font-semibold text-primary hover:text-primary-hover"
                id="download-4"
              >
                Download Sekarang {">"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
