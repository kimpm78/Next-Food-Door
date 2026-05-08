import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./InfoPage.module.css";

const contactLabels = {
  order: "注文に関するヘルプ",
  "account-payment": "アカウントとお支払い",
  membership: "メンバーシップとロイヤルティ",
};

function ContactPage({ type = "order" }) {
  const [step, setStep] = useState("input");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const pageTitle = contactLabels[type] || "お問い合わせ";

  const changeHandler = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const confirmHandler = (event) => {
    event.preventDefault();
    setStep("confirm");
  };

  const submitHandler = () => {
    setStep("complete");
  };

  if (step === "confirm") {
    return (
      <main className={styles.container}>
        <h1>{pageTitle}</h1>

        <section>
          <h2>入力内容の確認</h2>

          <p>
            <strong>お名前：</strong>
            {formData.name}
          </p>
          <p>
            <strong>メールアドレス：</strong>
            {formData.email}
          </p>
          <p>
            <strong>お問い合わせ内容：</strong>
          </p>
          <p>{formData.message}</p>

          <button type="button" onClick={() => setStep("input")}>
            戻る
          </button>

          <button type="button" onClick={submitHandler}>
            送信する
          </button>
        </section>
      </main>
    );
  }

  if (step === "complete") {
    return (
      <main className={styles.container}>
        <h1>お問い合わせ完了</h1>

        <section>
          <h2>お問い合わせを受け付けました</h2>
          <p>内容を確認のうえ、担当者よりご連絡いたします。</p>
          <p>ご返信までにお時間をいただく場合があります。</p>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1>{pageTitle}</h1>

      <section>
        <h2>お問い合わせ内容を入力してください</h2>

        <form onSubmit={confirmHandler}>
          <div>
            <label htmlFor="contact-name">お名前</label>
            <input
              id="contact-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={changeHandler}
              required
            />
          </div>

          <div>
            <label htmlFor="contact-email">メールアドレス</label>
            <input
              id="contact-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={changeHandler}
              required
            />
          </div>

          <div>
            <label htmlFor="contact-message">お問い合わせ内容</label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={changeHandler}
              rows="6"
              required
            />
          </div>

          <button type="submit">確認画面へ</button>
        </form>
      </section>
    </main>
  );
}

ContactPage.propTypes = {
  type: PropTypes.string,
};

export default ContactPage;
