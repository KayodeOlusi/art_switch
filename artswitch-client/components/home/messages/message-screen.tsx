import React from "react";
import { SpinnerLoader } from "@/components/global/loader";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { TChatMessage } from "utils/services/typings/messages";

type Props = {
  user: string;
  handleSendMessage: (
    content: string,
    { onStart, onFinish }: { onStart?: () => void; onFinish?: () => void }
  ) => Promise<void>;
  messageData: {
    error: Error | null;
    loading: boolean;
    messages: TChatMessage[];
  };
};

const MessageScreen = ({
  user,
  handleSendMessage,
  messageData: { messages, error, loading: loadingMessages },
}: Props) => {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    await handleSendMessage(message, {
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
    });
  };

  const getSenderStyle = (sender: string) => {
    switch (sender) {
      case user:
        return "items-end";
      default:
        return "items-start";
    }
  };

  return (
    <div className="flex flex-col justify-between gap-y-1 h-full overflow-auto no-scrollbar">
      <div
        className="bg-gray-100 h-full overflow-y-scroll no-scrollbar p-2 rounded-md"
        ref={ref => {
          if (ref) {
            ref.scrollTop = ref.scrollHeight;
          }
        }}
      >
        {loadingMessages ? (
          <div className="w-full h-full flex items-center justify-center">
            <SpinnerLoader size={25} color="#000000" />
          </div>
        ) : messages.length > 0 ? (
          messages.map(message => (
            <div
              key={message._id}
              className={`flex flex-col ${getSenderStyle(message?.sender)}`}
            >
              <div className="text-sm max-w-[50%] bg-white p-2 rounded-xl mb-2">
                {message.content}
              </div>
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
          ref={ref => ref?.focus()}
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
