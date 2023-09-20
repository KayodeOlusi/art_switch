import React from "react";
import { SpinnerLoader } from "@/components/global/loader";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { TChatMessage } from "utils/services/typings/messages";

type Props = {
  handleSendMessage: (
    content: string,
    onStart?: () => void,
    onFinish?: () => void
  ) => Promise<void>;
  messages: TChatMessage[];
};

const MessageScreen = ({ handleSendMessage, messages }: Props) => {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    await handleSendMessage(
      message,
      () => setLoading(true),
      () => setLoading(false)
    );
  };

  return (
    <div className="flex flex-col justify-between gap-y-1 h-full">
      <div className="bg-gray-100 h-full p-2 rounded-md">
        {messages.length > 0 ? (
          messages.map(message => (
            <div key={message._id} className="flex flex-col gap-y-1">
              <p className="text-sm font-bold">{message.sender}</p>
              <p className="text-sm">{message.content}</p>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">No messages yet</p>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="h-8 w-full relative">
        <input
          type="text"
          name="message"
          role="textbox"
          value={message}
          placeholder="Type a message..."
          onChange={e => setMessage(e.target.value)}
          className="w-full rounded-lg pr-8 pl-4 py-1 text-sm outline-none"
        />
        <button type="submit">
          {loading ? (
            <SpinnerLoader
              size={16}
              color="#7C3AED"
              className="w-4 h-4 rotate-90 absolute right-3
                  top-[6px] hover:text-purple-400 cursor-pointer
                  transition-all duration-200"
            />
          ) : (
            <PaperAirplaneIcon
              className="w-4 h-4 rotate-90 absolute right-3
                  top-[6px] hover:text-purple-400 cursor-pointer
                  transition-all duration-200
                "
            />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageScreen;
