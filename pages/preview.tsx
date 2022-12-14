import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardLayout from "../src/components/DashboardLayout";
import { template } from "../src/helpers/imageTemplate";
import styles from "./../styles/pages/Template.module.scss";
import { database } from "./../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Preview() {
  const router = useRouter();
  const [tempalteData, setTemplateData]: any = useState([]);
  const [previewData, setPreviewData]: any = useState();
  const [id, setId]: any = useState();
  const [realId, setRealId]: any = useState();
  let dataId: any = router?.query?.id;

  const dbInstance = collection(database, "messages_list");

  useEffect(() => {
    let tmp = dataId?.replace("-", "");
    setRealId(tmp);
  }, [router]);
  useEffect(() => {
    if (realId && previewData) {
      setId(
        previewData
          .map((item: any) => item.message_id)
          .indexOf(parseInt(realId))
      );
    }
    // console.log(dataId, previewData);
  }, [previewData, realId]);

  useEffect(() => {
    getNotes();
  }, []);
  useEffect(() => {
    if (previewData !== undefined && id !== undefined) {
    }
  }, [previewData, id]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < template?.length; i++) {
      arr.push(template[i]);
      setTemplateData(arr);
    }
  }, []);

  const getNotes = () => {
    getDocs(dbInstance).then((data: any) => {
      setPreviewData(
        data.docs.map((item: any) => {
          return { ...item.data(), id: item.id };
        })
      );
    });
  };

  return (
    <DashboardLayout pageTitle="Preview Mail">
      {previewData === undefined ? (
        <div className="loading_messages">Loading...</div>
      ) : (
        <div className={styles.wrapperTemplate}>
          <div className={styles.titlePreview}>Sttt.. Ini Pesannya!</div>
          {id !== undefined && tempalteData.length > 0 && (
            <div className={styles.wrapperImage}>
              <div className={styles.templateImage}>
                <Image
                  src={
                    tempalteData && tempalteData[previewData[id]?.template_id]
                  }
                  objectFit="cover"
                  width={300}
                  height={410}
                  layout="responsive"
                />
              </div>
              <div className={styles.letterText}>
                Dari : {previewData && previewData[id]?.original_send_to}
              </div>
              <div className={styles.letterForText}>
                Untuk : {previewData && previewData[id]?.original_receive_from}
              </div>
              <div className={styles.templateText}>
                {previewData && previewData[id]?.original_text}
              </div>
            </div>
          )}
          <Link href="/write" passHref>
            <div className={styles.another}>
              Mau bales <b>suratnya?</b>
            </div>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}
