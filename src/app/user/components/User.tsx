"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getStorageUsername, setStorageUsername } from "@/utils/localStorage";

export const User = () => {
  const [username, setUsername] = useState("");
  const { isMobile } = useIsMobile();
  const router = useRouter();

  useEffect(() => {
    const enteredUsername = getStorageUsername();

    if (enteredUsername) {
      setUsername(enteredUsername);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStorageUsername(username);
    toast.success("ユーザー名を設定しました");
    router.back();
  };

  return (
    <div className={clsx("max-w-96", isMobile ? "mx-4" : "m-auto")}>
      <form
        className={clsx("flex", "flex-col", "gap-4")}
        onSubmit={handleSubmit}
      >
        <div>
          <label id="username">ユーザー名</label>
          <Input
            id="username"
            className={clsx("w-full")}
            value={username}
            onChange={handleChange}
          />
        </div>

        <Button className={clsx("w-full")} label="登録" type="submit" />
      </form>
    </div>
  );
};
