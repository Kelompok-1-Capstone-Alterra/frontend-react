import Hero from "../assets/Hero.png";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Landing1 from "../assets/Landing1.png";
import Landing2 from "../assets/Landing2.png";
import Landing3 from "../assets/Landing3.png";

export default function LandingPage() {
  return (
    <>
      <div className="px-8 lg:px-32">
        <section>
          <div className="grid min-h-screen">
            <div className="flex flex-col items-center justify-between min-w-full lg:gap-2 max-w-7xl lg:flex-row-reverse">
              <img src={Hero} className="flex-1 max-w-sm lg:min-w-[543px]" />
              <div>
                <h1 className="text-6xl leading-[72px] font-bold lg:-mt-24">
                  Pantau tanaman anda kapan saja
                </h1>
                <p className="text-[#6B7280] my-9 text-lg">
                  Agriplan memberikan jadwal perawatan khusus dan pengingat
                  untuk tanaman Anda, serta memberikan rekomendasi, panduan
                  langkah demi langkah, identifikasi, dan pengukur cahaya untuk
                  membantu menjaga kehidupan tanaman Anda.
                </p>
                <Link to={"/login"}>
                  <Button variant={"green"} className={"rounded-full"}>
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
              alt=""
              className="lg:w-[480px] rounded-[46px]"
            />
            <div>
              <h3 className="text-4xl font-bold leading-[44px]">
                Jaga Tanaman Anda Tetap Segar dengan Agriplan
              </h3>
              <p className="my-4 font-semibold">
                Tidak yakin kapan waktu yang tepat untuk menyiram tanamanmu?
                Cukup tambahkan tanaman ke aplikasi dan dapatkan pengingat kapan
                wakunya untuk menyiram dan pemupukan
              </p>
              <Link className="font-semibold text-primary hover:text-[#047857]">
                Download Sekarang {">"}
              </Link>
            </div>
          </div>
        </section>
        <section className="min-w-full lg:mb-16">
          <div className="flex flex-col items-center justify-center gap-4 my-10 lg:flex-row-reverse lg:gap-16">
            <img
              src={Landing2}
              alt=""
              className="lg:w-[480px] rounded-[46px]"
            />
            <div>
              <h3 className="text-4xl font-bold leading-[44px]">
                Jaga Tanaman Anda Tetap Segar dengan Agriplan
              </h3>
              <p className="my-4 font-semibold">
                Tidak yakin kapan waktu yang tepat untuk menyiram tanamanmu?
                Cukup tambahkan tanaman ke aplikasi dan dapatkan pengingat kapan
                wakunya untuk menyiram dan pemupukan
              </p>
              <Link className="font-semibold text-primary hover:text-[#047857]">
                Download Sekarang {">"}
              </Link>
            </div>
          </div>
        </section>
        <section className="min-w-full lg:mb-16">
          <div className="flex flex-col items-center justify-center gap-4 my-10 lg:flex-row lg:gap-16">
            <img
              src={Landing3}
              alt=""
              className="lg:w-[480px] rounded-[46px]"
            />
            <div>
              <h3 className="text-4xl font-bold leading-[44px]">
                Jaga Tanaman Anda Tetap Segar dengan Agriplan
              </h3>
              <p className="my-4 font-semibold">
                Tidak yakin kapan waktu yang tepat untuk menyiram tanamanmu?
                Cukup tambahkan tanaman ke aplikasi dan dapatkan pengingat kapan
                wakunya untuk menyiram dan pemupukan
              </p>
              <Link className="font-semibold text-primary hover:text-[#047857]">
                Download Sekarang {">"}
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
