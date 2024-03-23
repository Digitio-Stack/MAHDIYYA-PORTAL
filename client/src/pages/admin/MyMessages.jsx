import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import Axios from "../../Axios";
import { UserAuthContext } from "../../context/user";

function MyMessages() {
  const [messages, setMessages] = useState([]);
  const { authData } = useContext(UserAuthContext);
  const getMessages = async () => {
    Axios.post("/messages/recipient/" + authData._id)
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err.response));
  };
  useEffect(() => {
    getMessages();
  }, []);
  return (
    <>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table class="min-w-full text-left text-sm font-light text-surface dark:text-white">
                <thead class="border-b border-neutral-200 font-medium dark:border-white/10">
                  <tr>
                    <th scope="col" class="px-6 py-4">
                      #
                    </th>
                    <th scope="col" class="px-6 py-4">
                      title
                    </th>
                    <th scope="col" class="px-6 py-4">
                      Link
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length > 0 &&
                    messages.map((message, key) => (
                      <tr
                        key={key}
                        class="border-b border-neutral-200 dark:border-white/10"
                      >
                        <td class="whitespace-nowrap px-6 py-4 font-medium">
                          {key + 1}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          {message.title}
                        </td>
                        <td class="whitespace-nowrap px-6 py-4">
                          <a href={message.link} target="_blank" className="text-blue-600">{message.link}</a>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyMessages;
