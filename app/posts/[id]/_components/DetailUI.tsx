"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Load } from "../../../_load/page";
import classes from "../Detail.module.css";
import { SingleData, Post } from "@/app/_types/type";
import { MicroCmsPost } from "@/app/_types/MicroCmsPost";
import Image from "next/image";

type ID = {
  id: string;
};

const DetailUI = ({ id }: ID) => {
  const [loadEnd, setLoadEnd] = useState(false);
  const [data, setData] = useState<MicroCmsPost>();

  useEffect(() => {
    const getDetailPost = async () => {
      const req: Response = await fetch(
        `https://rmf6mueo2k.microcms.io/api/v1/posts/${id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        },
      );
      const post: MicroCmsPost = await req.json();
      setLoadEnd(!loadEnd);
      setData(post);
    };
    getDetailPost();
  }, []);

  if (!loadEnd) return <Load />;
  if (!data)
    return (
      <>
        <p className={classes.errorText}>記事が見つかりませんでした</p>
        <Link href="/" className={classes.goBackHome}>
          記事一覧へ戻る
        </Link>
      </>
    );
  return (
    <div className={classes.bodyPreset}>
      <span className={classes.imageBox}>
        <Image
          height={116}
          width={157}
          src={data.thumbnail.url}
          alt={`${data.thumbnail.url}の画像`}
          className={classes.imageBoxText}
        />
      </span>
      <div className={classes.postTextArea}>
        <div className={classes.postHeader}>
          <span>
            {new Date(data.createdAt).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          <span>
            {data.categories.map((category, id) => (
              <span key={id} className={classes.categoryTag}>
                {category.name}
              </span>
            ))}
          </span>
        </div>
        <span className={classes.postTitle}>{data.title}</span>
        <div
          className={classes.postContent}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        <Link href="/" className={classes.goBackHome}>
          記事一覧へ戻る
        </Link>
      </div>
    </div>
  );
};

export default DetailUI;
