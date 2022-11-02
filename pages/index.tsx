// @ts-nocheck

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DashboardLayout from "../src/components/DashboardLayout";
import styles from "./../styles/pages/Input.module.scss";
import { app, database } from "./../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
export default function Input() {
  const router = useRouter();
  const [data, setData]: any = useState();
  const [messageList, setMessageList]: any = useState();
  const [found, setFound]: any = useState();
  const [foundSearch, setFoundSearch]: any = useState(false);
  const [answerQuestion, setAnswerQuestion]: any = useState(false);
  const dbInstance = collection(database, "messages_list");

  useEffect(() => {
    // console.log(router);
    window?.ReactNativeWebView?.postMessage();
  }, [router]);

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    if (data !== undefined && messageList?.length > 0) {
      setFound(
        messageList.filter((id: any) => {
          return id?.message_id == data.id_message;
        })
      );
    }
    console.log(messageList?.map((item) => item.message_id), data?.id_message);
  }, [messageList, data]);

  useEffect(() => {
    if (answerQuestion) {
      if (found[0].secure_answer === data?.answer) {
        setAnswerQuestion(false);
        router.push(`/preview?id=${data?.id_message}`);
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
        router.push(`?id=${data?.id_message}`);
      } else {
        setFoundSearch(false);
        alert("Salah!");
      }
    }
    console.log(found);
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
  //   const handleSave = (e: any) => {};
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
          <div className={styles.title}>Jawab Dulu Ya!</div>
          <div>
            <div className={styles.titleQuestion}>
              {found[0]?.secure_question}
            </div>
            <div className={styles.input}>
              <input onChange={handleChange} name="answer" id="answer" />
            </div>
          </div>

          <div className={styles.wrapBtn}>
            <button className={styles.skip} onClick={() => router.back()}>
              Kembali
            </button>
            <button onClick={handleAnswer}>Submit</button>
          </div>
        </div>
      ) : (
        <div className={styles.wrapperInput}>
          <div>
            <div className={styles.title}>Masukkan ID</div>
            <div className={styles.input}>
              <input
                onChange={handleChange}
                name="id_message"
                id="id_message"
              />
            </div>
          </div>
          <div className={styles.wrapBtn}>
            <button className={styles.skip} onClick={handleSkip}>
              Lewati
            </button>
            <button onClick={handleSubmit}>Simpan</button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
