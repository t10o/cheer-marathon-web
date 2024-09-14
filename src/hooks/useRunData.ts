import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

import { db } from "@/libs/firebase";
import { Run } from "@/models/run";

export const useRunData = (id: string) => {
  const [runData, setRunData] = useState<Run | null>(null);

  useEffect(() => {
    const docRef = doc(db, "runs", id);

    const unsubscribe = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists()) {
          setRunData(doc.data() as Run);
        } else {
          console.log("指定されたランデータが存在しません");
        }
      },
      (error) => {
        throw new Error(error.message);
      },
    );

    return () => unsubscribe();
  }, [id]);

  return { runData };
};
