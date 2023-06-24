import { Navigate, useParams } from "react-router-dom";
import SecondaryContainer from "../../components/layouts/SecondaryContainer";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import Loading from "../../components/Loading";
import Cookies from "js-cookie";
import ImageWithSkeleton from "../../components/ImageWithSkeleton";

export default function DetailArticlePage() {
  const { id } = useParams();

  const { data, isLoading, error } = useSWR(
    `${import.meta.env.VITE_API_BASE_URL}/auth/admins/articles/${id}/detail`,
    (url) => fetcher(url, Cookies.get("token"))
  );

  const article = data?.data;

  if (isLoading)
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <Loading />
      </div>
    );

  if (error) return <Navigate to="/admin/articles" />;

  return (
    <>
      <SecondaryContainer
        backTo="/admin/articles"
        title="Data Artikel"
        className={"pe-3"}
      >
        <div className="ps-10">
          <h6 className="text-[#030712] text-h-6 font-bold">
            {article?.article_title}
          </h6>
          <div className="my-5">
            <ImageWithSkeleton
              src={`${import.meta.env.VITE_API_BASE_URL}/pictures/${
                article?.article_pictures[0]
              }`}
              width={302}
              height={184}
              alt="gambar artikel"
              className="w-[302px] h-[184px]"
            />
          </div>
          <div
            className="styled-content"
            dangerouslySetInnerHTML={{
              __html: article?.article_description,
            }}
          ></div>
        </div>
      </SecondaryContainer>
    </>
  );
}
