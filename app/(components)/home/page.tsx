"use client";
import { useEffect, useState, Fragment } from "react";
import Link from "next/link";
import { MultiData, Posts, Post } from "../../_types/type";
import { Load } from "../../_load/page";
import classes from "./Home.module.css";

const Home = () => {
  const [loadEnd, setLoadEnd] = useState(false);
  const [posts, setPosts] = useState<Posts>([]);
  
  useEffect(() => {
    const getPost = async () => {
      const res: Response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts",
      );
      const data: MultiData = await res.json();
      const posts = data.posts;
      setPosts(posts);
      setLoadEnd(!loadEnd);
    };
    getPost();
  }, []);

  if (!loadEnd) return <Load />;
  return (
    <div className={classes.bodyPreset}>
      <label className={classes.homeTitle}>記事一覧</label>
      <ul className="post">
        {/* JSXのルールで、.map()の返り値は必ず親一つにまとめないといけない */}
        {posts.map((post: Post) => (
          <Fragment key={post.id}>
            <Link href="/detail/${post.id}" className={classes.tileLink}>
              <div className={classes.alignImageAndTitle}>
                <li className={classes.imageBox}>
                  <span className={classes.imageBoxText}>800 x 400</span>
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
                    {post.categories.map((category, id) => (
                      <span key={id} className={classes.categoryTag}>
                        {category}
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
