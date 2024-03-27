import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Axios from "../../Axios";
import { toast } from "react-toastify";
import MessageTable from "../../components/MessageTable";
import { faClose, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateMessage() {
  const [recipients, setRecipients] = useState([]);
  const [link, setLink] = useState("");
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [forAll, setForAll] = useState(false);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (!recipients.includes(value)) {
      setRecipients([...recipients, value]);
    }
  };

  const removeSelected = (value) => {
    if (recipients.includes(value)) {
      // Remove the selected value
      const updatedValues = recipients.filter((item) => item !== value);
      setRecipients(updatedValues);
    }
  };
  const handleSetAll = () => {
    setForAll(!forAll);
    if (!forAll) {
      setRecipients(users.map((user) => user._id));
    } else {
      setRecipients([]);
    }
  };
  const filteredUsers = users.filter((user) => recipients.includes(user._id));

  const getMessages = async () => {
    Axios.get("/messages")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.error(err));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    Axios.post("/messages/add", {
      link,
      recipients,
      title,
    })
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          toast.success("message created", {
            autoClose: 3000,
            position: toast.POSITION.TOP_CENTER,
          });
          setLink("");
          setRecipients(null);
          setTitle("");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err.response.data);
        setLoading(false);
        toast.error("something went wrong", {
          autoClose: 3000,
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };
  const getUsers = () => {
    Axios.get("/auth/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUsers();
    getMessages();
  }, []);
  return (
    <div>
      <form className="bg-white shadow-md rounded max-w-2xl mx-auto my-7 px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            placeholder="Message Title"
            defaultValue=""
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div className="mb-4  flex">
          <label className="block mb-2 text-sm font-medium mr-4 text-blue-900 dark:text-white">
            Messages To All Study Centres
          </label>
          <input type="checkbox" onClick={() => handleSetAll()} />
        </div>
        {!forAll && (
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-blue-900 dark:text-white">
              Select a recipient
            </label>
            <select
              id="recipient"
              onChange={(e) => handleSelectChange(e)}
              className="bg-gray-50 border rounded-lg focus:ring focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option hidden>Choose one</option>
              {users
                .sort((a, b) => (a.username > b.username ? 1 : -1))
                .map((user, key) => (
                  <option key={key} value={user._id}>
                    {user?.branch?.studyCentreName}, {user.username}
                  </option>
                ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="link"
          >
            Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="link"
            placeholder="Link here"
            defaultValue=""
            onChange={(e) => setLink(e.target.value)}
            value={link}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          {loading ? (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Processing...
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Send
            </button>
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-blue-900 dark:text-white">
            Selected Recipients
          </label>
          {forAll ? (
            <h1 className="font-semibold text-red-600 uppercase">
              Message will be delivered to all
            </h1>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {filteredUsers.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-200 rounded-lg p-2 shadow-md flex flex-col items-center justify-between"
                >
                  <span className="text-center font-serif">
                    {item?.branch?.studyCentreName}, {item.username}
                  </span>
                  <span
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeSelected(item._id)}
                  >
                    Remove
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      <MessageTable messages={messages} getMessages={getMessages} />
    </div>
  );
}

export default CreateMessage;
