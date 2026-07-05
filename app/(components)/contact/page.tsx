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
  const initialForm: ContactForm = { name: "", email: "", content: "" };

  const [form, setForm] = useState(initialForm);
  const [isDisabled, setIsDisabled] = useState(false);

  const [hasName, setHasName] = useState(true);
  const [isProperName, setIsProperName] = useState(true);

  const [hasEmail, setHasEmail] = useState(true);
  const [isProperEmail, setIsProperEmail] = useState(true);

  const [hasContent, setHasContent] = useState(true);
  const [isProperContent, setIsProperContent] = useState(true);

  const validateNameForm = () => {
    if (!form.name) {
      setHasName(false);
      
    } else if (form.name.length > 30) {
      setHasName(true);
      setIsProperName(false);
    }else
    {
      setHasName(true);
      setIsDisabled(true);
    }
  };

  const validateEmailForm = () => {
    if (!form.email) {
      setHasEmail(false);
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      setHasEmail(true);
      setIsProperEmail(false);
    }else
    {
      setHasName(true);
      setIsProperEmail(true);
    }
  };

  const validateContent = () => {
    if (!form.content) {
      setHasContent(false);
    } else if (form.content.length > 500) {
      setHasContent(true);
      setIsProperContent(false);
    }else
    {
      setHasContent(true);
      setIsProperContent(true);
    }
  };

  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const sendForm = async () => {
    setIsDisabled(true);
    validateNameForm();
    validateEmailForm();
    validateContent();

    if (!form.name || !form.email || !form.content) {
      setIsDisabled(false);
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

      const res: ResBody = await req.json()
      window.alert(`結果:${res.message}: ありがとうございます。返信をお待ちください。`,)

      clearForm()
    } catch (error) {
        window.alert(`結果:${error}送信に失敗しました`);
    }finally {
        setIsDisabled(false);
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
              disabled={isDisabled}
            />
            {!hasName ? (
              <span className={classes.error}>名前の記入は必須です</span>
            ) : !isProperName ? (
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
              disabled={isDisabled}
            />
            {!hasEmail ? (
              <span className={classes.error}>
                メールアドレスの記入は必須です
              </span>
            ) : !isProperEmail ? (
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
              disabled={isDisabled}
            ></textarea>
            {hasContent ? null : (
              <span className={classes.error}>本文の記入は必須です</span>
            )}
          </div>
        </div>
        <div className={classes.buttonAlign}>
          <button
            className={classes.sendButton}
            disabled={isDisabled}
            onClick={sendForm}
          >
            {isDisabled ? "送信中..." : "送信"}
          </button>
          <button
            className={classes.clearButton}
            disabled={isDisabled}
            onClick={clearForm}
          >
            クリア
          </button>
        </div>
      </div>
    </div>
  );
}
