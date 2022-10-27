import Image from "next/image";
import { useEffect, useState } from "react";
import DashboardLayout from "../src/components/DashboardLayout";
import { template } from "../src/helpers/imageTemplate";
import styles from "./../styles/pages/Template.module.scss";

export default function Preview() {
  const [tempalteData, setTemplateData]: any = useState([]);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < template?.length; i++) {
      arr.push(template[i]);
      setTemplateData(arr);
    }
  }, []);

  return (
    <DashboardLayout pageTitle="Preview Mail">
      <div className={styles.wrapperTemplate}>
        <div
          className={styles.titlePreview}
          style={{
            marginBottom: "32px",
            textAlign: "center",
            fontSize: "20px",
            fontWeight: 700,
            color: "white",
          }}
        >
          Sttt.. Ini Pesannya!
        </div>
        {tempalteData.length > 0 && (
          <div className={styles.wrapperImage}>
            <div className={styles.templateImage}>
              <Image
                src={tempalteData && tempalteData[0]}
                objectFit="cover"
                width={300}
                height={420}
                layout="responsive"
              />
            </div>
            <div className={styles.letterText}>Dari : Farhat</div>
            <div className={styles.letterForText}>Untuk : Tes</div>
            <div className={styles.templateText}>Tes</div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
