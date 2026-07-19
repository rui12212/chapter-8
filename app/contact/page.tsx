"use client";
import classes from "./Contact.module.css";
import { useState, useId } from "react";

export default function Contact() {
  const id = useId();
  type ContactForm = {
    name: string;
    email: string;
    content: string;
  };

  type TouchedForm = {
    name: boolean;
    email: boolean;
    content: boolean;
  };

  const initialForm: ContactForm = { name: "", email: "", content: "" };
  const initialTouched: TouchedForm = {
    name: false,
    email: false,
    content: false,
  };

  const [form, setForm] = useState(initialForm);
  const [touched, setTouched] = useState<TouchedForm>(initialTouched);

  const [isSending, setisSending] = useState(false);


  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setTouched({
      ...touched,
      [e.target.name]: true,
    });
  };

  const validateForm = () => {
    if (!form.name || !form.email || !form.content) {
      return false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      return false;
    } else if (form.name.length > 30 || form.content.length > 300) {
      return false;
    } else return true;
  };

  const sendForm = async () => {
    setisSending(true);
    

    if (!validateForm()) {
      window.alert(
        "フォームの入力が適切ではありません。訂正してください。",
      );
      setisSending(false);
      return;
    }

    try {
      type Post = {
        name: string;
        email: string;
        content: string;
      };

      const reqBody: Post = {
        name: form.name,
        email: form.email,
        content: form.content,
      };

      type ResBody = {
        message: string;
        data: {
          name: string;
          email: string;
          content: string;
        };
      };

      const req: Response = await fetch(
        "https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reqBody),
        },
      );

      if (!req.ok) {
        switch (req.status) {
          case 400:
            window.alert(
              "エラーが発生しました。内容をもう一度確かめて、再送信してください。",
            );
          case 500:
            window.alert("サーバーエラーが発生しました");
          default:
            window.alert("エラーが発生しました");
        }
      }

      const res: ResBody = await req.json();
      window.alert(
        `結果:${res.message}: ありがとうございます。返信をお待ちください。`,
      );

      clearForm();
    } catch (error) {
      window.alert(`結果:${error}送信に失敗しました`);
    } finally {
      setisSending(false);
    }
  };

  const clearForm = () => {
    setForm(initialForm);
  };

  return (
    <div className={classes.bodyPreset}>
      <label className={classes.contactTitle}>問い合わせフォーム</label>
      <div className={classes.formAlign}>
        <div className={classes.formPreset}>
          <span className={classes.formLabel}>お名前</span>
          <div className={classes.formArea}>
            <input
              type="text"
              id={`${id}-name`}
              name="name"
              value={form.name}
              onChange={handleForm}
              className={classes.nameForm}
              disabled={isSending}
            />
            {touched.name == true && !form.name ? (
              <span className={classes.error}>名前の記入は必須です</span>
            ) : touched.name == true && form.name.length > 30 ? (
              <span className={classes.error}>名前は30文字以内です</span>
            ) : null}
          </div>
        </div>
        <div className={classes.formPreset}>
          <span className={classes.formLabel}>メールアドレス</span>
          <div className={classes.formArea}>
            <input
              type="email"
              id={`${id}-email`}
              name="email"
              value={form.email}
              onChange={handleForm}
              className={classes.emailForm}
              disabled={isSending}
            />
            {touched.email == true && !form.email ? (
              <span className={classes.error}>
                メールアドレスの記入は必須です
              </span>
            ) : touched.email == true && !/\S+@\S+\.\S+/.test(form.email) ? (
              <span className={classes.error}>
                メールアドレスの形式が正しくありません
              </span>
            ) : null}
          </div>
        </div>
        <div className={classes.formPreset}>
          <span className={classes.formLabel}>本文</span>
          <div className={classes.formArea}>
            <textarea
              rows={15}
              id={`${id}-content`}
              name="content"
              value={form.content}
              onChange={handleForm}
              className={classes.contentForm}
              disabled={isSending}
            ></textarea>
            {touched.content == true && !form.content ? (
              <span className={classes.error}>本文の記入は必須です</span>
            ) : touched.content == true && form.content.length > 300 ? (
              <span className={classes.error}>本文は300文字以内です</span>
            ) : null}
          </div>
        </div>
        <div className={classes.buttonAlign}>
          <button
            className={classes.sendButton}
            disabled={isSending}
            onClick={sendForm}
          >
            {isSending ? "送信中..." : "送信"}
          </button>
          <button
            className={classes.clearButton}
            disabled={isSending}
            onClick={clearForm}
          >
            クリア
          </button>
        </div>
      </div>
    </div>
  );
}
