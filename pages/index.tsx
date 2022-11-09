// @ts-nocheck

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "../src/components/DashboardLayout";
import styles from "./../styles/pages/Input.module.scss";
import { app, database } from "./../firebase";
import { collection, getDocs } from "firebase/firestore";
import "animate.css";
export default function Input() {
  const router = useRouter();
  const [data, setData]: any = useState();
  const [messageList, setMessageList]: any = useState();
  const [found, setFound]: any = useState();
  const [foundSearch, setFoundSearch]: any = useState(false);
  const [answerQuestion, setAnswerQuestion]: any = useState(false);
  const dbInstance = collection(database, "messages_list");

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (data !== undefined && messageList?.length > 0) {
      if (
        data?.id_message_1 !== undefined &&
        data?.id_message_2 !== undefined
      ) {
        let join = data.id_message_1 + data.id_message_2;
        setFound(
          messageList.filter((id: any) => {
            return id?.message_id == join;
          })
        );
      }
    }
  }, [messageList, data]);

  useEffect(() => {
    if (answerQuestion) {
      if (found[0].secure_answer == data?.answer?.toLowerCase()) {
        setAnswerQuestion(false);
        router.push(
          `/preview?id=${data?.id_message_1 + "-" + data?.id_message_2}`
        );
      } else {
        setAnswerQuestion(false);
        alert("Salah Jawabannya!");
      }
    }
  }, [answerQuestion]);

  useEffect(() => {
    if (foundSearch) {
      if (found?.length > 0) {
        setFoundSearch(false);
        router.push(`?id=${data?.id_message_1 + "-" + data?.id_message_2}`);
      } else {
        setFoundSearch(false);
        alert("Salah!");
      }
    }
  }, [foundSearch, found]);

  const getNotes = () => {
    getDocs(dbInstance).then((data) => {
      setMessageList(
        data.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  const handleSkip = (e: any) => {
    router.push("/write");
  };
  const handleChange = (e: any) => {
    e.preventDefault();
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFoundSearch(true);
  };
  const handleAnswer = (e: any) => {
    e.preventDefault();
    setAnswerQuestion(true);
  };
  return (
    <DashboardLayout pageTitle="Input ID">
      {router?.query?.id && found ? (
        <div className={styles.wrapperInput}>
          <div
            className={`${styles.wrapperFirst} animate__animated animate__bounceInDown animate__fast`}
          >
            <div className={`${styles.title}`}>Eitss.. Jawab Ini Dulu</div>
            <div className={styles.subtitle}>
              Kalau surat ini untuk kamu, pasti kamu bisa jawab!!
            </div>
            <div>
              <div className={styles.titleQuestion}>
                {found[0]?.secure_question}
              </div>
              <div className={styles.inputFull}>
                <input onChange={handleChange} name="answer" id="answer" />
              </div>
            </div>
          </div>
          <div className={styles.wrapBtn}>
            <button onClick={handleAnswer}>Kirim Jawaban</button>
            <div className={styles.skip} onClick={handleSkip}>
              Belum menerima surat, <b>lewati ini</b>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.wrapperInput}>
          <div
            className={`${styles.wrapperFirst} animate__animated animate__bounceInDown animate__fast`}
          >
            <div className={`${styles.title}`}>Masukkan ID</div>
            <div className={styles.subtitle}>ID suratnya jangan salah ya!</div>
            <div className={styles.wrapperID}>
              <div className={styles.input}>
                <input
                  onChange={handleChange}
                  name="id_message_1"
                  id="id_message_1"
                />
              </div>
              <div
                className={styles.dash}
                style={{ fontWeight: 700, color: "white" }}
              >
                -
              </div>
              <div className={styles.input}>
                <input
                  onChange={handleChange}
                  name="id_message_2"
                  id="id_message_2"
                />
              </div>
            </div>
            <div className={styles.tipsInfo}>
              <div className={styles.info}>i</div>
              <div className={styles.tips}>
                ID Surat tertera pada{" "}
                <span>
                  <b>pojok kanan</b>
                </span>{" "}
                dari surat yang kamu terima
              </div>
            </div>
          </div>
          <div className={styles.wrapBtn}>
            <button onClick={handleSubmit}>Simpan</button>
            <div className={styles.skip} onClick={handleSkip}>
              Belum menerima surat, <b>lewati ini</b>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
