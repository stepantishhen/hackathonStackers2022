import React, { useEffect, useState } from "react";
import { QrReader } from "react-qr-reader";
import MainLayout from "../layouts/MainLayout";
import { useLocation } from "react-router-dom";
import { apiInstance } from "../api/api";
import axios from "axios";

export const Scanner = (props) => {
  const [message, setMessage] = useState("Ожидает сканирования");
  let timeout: null | NodeJS.Timeout = null;
  const [textColor, setTextColor] = useState("text-white");

  return (
    // userid
    // eventid
    // post /events/scan

    <MainLayout>
      <div className="max-w-[500px] m-auto p-5">
        <QrReader
          videoStyle={{
            width: "100%",
            height: "auto",
          }}
          onResult={async (result, error) => {
            if (!result || timeout) return;

            try {
              const {
                data: { data },
              } = await apiInstance.post(
                "/events/scan",
                JSON.parse(result.getText())
              );

              setMessage(
                `${data.firstName} ${data.surname} - успешно отсканирован`
              );
              setTextColor("text-blue-500");
            } catch (error) {
              if (axios.isAxiosError(error) && error.response?.status === 409) {
                setMessage(`Пользователь уже отсканирован`);
                setTextColor("text-red-400");
              } else {
                setMessage("Ошибка при сканировании");
                setTextColor("text-red-400");
              }
            } finally {
              if (timeout) clearTimeout(timeout);

              timeout = setTimeout(() => {
                setMessage("Ожидает сканирования");
                setTextColor("text-white");
                timeout = null;
              }, 3000);
            }

            // if (!!error) {
            // 	console.info(error);
            // }
          }}
          style={{ width: "100%" }}
        />
        <div className={`text-center p-3 bg-black ${textColor}`}>
          <span className="text-2xl font-medium ">{message}</span>
        </div>
      </div>
    </MainLayout>
  );
};
