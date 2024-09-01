import { doc, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "../libs/firebase.ts";

export const useRunData = (id: string) => {
  const [runData, setRunData] = useState<DocumentData | null>(null);

  useEffect(() => {
    const docRef = doc(db, "runs", id);

    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          setRunData(doc.data());
        } else {
          console.log("指定されたランデータが存在しません");
        }
      },
      (error) => {
        console.error("onSnapshot エラー:", error);
      },
    );

    return () => unsubscribe();
  }, [id]);

  return { runData };
};
