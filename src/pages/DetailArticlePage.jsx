import { useLoaderData, Navigate } from "react-router-dom";
import SecondaryContainer from "../components/layouts/SecondaryContainer";

export default function DetailArticlePage() {
  const article = useLoaderData();
  console.log(article);
  if (article === null) {
    return <Navigate to="/admin/articles" />;
  }
  if (article)
    return (
      <div className="h-screen flex justify-center items-center px-24">
        {JSON.stringify(article)}
      </div>
    );
  return (
    <>
      {article === null ? <Navigate to="/admin/articles" /> : null}
      <SecondaryContainer
        backTo="/admin/articles"
        title="Tambah Artikel"
        className={"pe-3"}
      >
        <div className="ps-10">
          <div className="mb-[8px]">
            <label className="flex text-body-lg font-bold mb-3">
              Judul Artikel
            </label>
            <div className="w-[1037px]">{article.article_title}</div>
          </div>
          <div className="pb-4">
            <label className="flex text-body-lg font-bold mb-3">
              Deskripsi
            </label>
            <div
              className="styled-content"
              dangerouslySetInnerHTML={{
                __html: article.article_description,
              }}
            ></div>
          </div>
          <div className="pb-4">
            <label className="flex text-body-lg font-bold mb-3">
              Gambar Tanaman
            </label>
            <img
              src={article.image}
              alt=""
              className="w-[153px] h-[87px]"
            />
          </div>
        </div>
      </SecondaryContainer>
    </>
  );
}
