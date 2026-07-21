"use client";
import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { MultiData, Posts, Post } from "./_types/type";
import { Load } from "./_load/page";
import classes from "./Home.module.css";
import {MicroCmsPost} from "./_types/MicroCmsPost";
import Image from "next/image";

const Home = () => {
  const [loadEnd, setLoadEnd] = useState(false);
  const [posts, setPosts] = useState<MicroCmsPost[]>([]);
  
  useEffect(() => {
    const getPost = async () => {
      const res: Response = await fetch(
        "https://rmf6mueo2k.microcms.io/api/v1/posts",{
          headers: {
            "X-MICROCMS-API-KEY":process.env.NEXT_PUBLIC_MICROCMS_API_KEY as string,
          }
        }
      );      
      const {contents} = await res.json();
      setPosts(contents);
      setLoadEnd(!loadEnd);
    };
    getPost();
  }, []);

  if (!loadEnd) return <Load />;
  return (
    <div className={classes.bodyPreset}>
      <label className={classes.homeTitle}>記事一覧</label>
      <ul className="post">
        {posts.map((post: MicroCmsPost) => (
          <Fragment key={post.id}>
            <Link href={`posts/${post.id}`} className={classes.tileLink}>
              <div className={classes.alignImageAndTitle}>
                <li className={classes.imageBox}>
                  <Image 
                  height={116}
                  width={157}
                  src={post.thumbnail.url}
                  alt={`${post.thumbnail.url}の画像`}
                  className={classes.imageBoxText} />
                </li>
                <div className={classes.postTextArea}>
                  <div className={classes.postHeader}>
                    <li>
                      {new Date(post.createdAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </li>
                    {post.categories.map((category,id) => (
                      <span key={id} className={classes.categoryTag}>
                        {category.name}
                      </span>
                    ))}
                  </div>
                  <span className={classes.postTitle}>{post.title}</span>
                  <div
                    className={classes.postContent}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>
              </div>
              <li className={classes.postBorderBottom}></li>
            </Link>
          </Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Home;
