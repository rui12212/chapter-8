"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Load } from "../../../_load/page";
import classes from "../Detail.module.css";
import { SingleData, Post } from "@/app/_types/type";

type ID = {
  id: string
}

const DetailUI = ({id}: ID) => {
  const [loadEnd, setLoadEnd] = useState(false);
  const [data, setData] = useState<Post>();

  useEffect(() => {
    const getDetailPost = async () => {
      const req: Response = await fetch(
        `https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`,
      );
      const post_json: SingleData = await req.json();
      const post: Post = post_json.post;
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
        <Link href="/home" className={classes.goBackHome}>
          記事一覧へ戻る
        </Link>
      </>
    );
  return (
    <div className={classes.bodyPreset}>
      <span className={classes.imageBox}>
        <span className={classes.imageBoxText}>800 x 400</span>
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
                {category}
              </span>
            ))}
          </span>
        </div>
        <span className={classes.postTitle}>{data.title}</span>
        <div
          className={classes.postContent}
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        <Link href="/home" className={classes.goBackHome}>
          記事一覧へ戻る
        </Link>
      </div>
    </div>
  );
};

export default DetailUI;