import React from "react";
import { socket } from "../../../socket";
import Lottie from "react-lottie";
import { useAppSelector } from "app/hooks";
import { animations } from "utils/animations";
import { SpinnerLoader } from "@/components/global/loader";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { TChatMessage } from "utils/services/typings/messages";
import { selectUserDetails } from "features/slices/user";

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

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animations.typing_animation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const MessageScreen = ({
  user,
  handleSendMessage,
  messageData: { messages, error, loading: loadingMessages },
}: Props) => {
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [typing, setTyping] = React.useState<any>(false);
  const { socketConnected } = useAppSelector(selectUserDetails);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    socket.emit("stop typing", messages[0]?.chat);

    await handleSendMessage(message, {
      onStart: () => setLoading(true),
      onFinish: () => setLoading(false),
    });
  };

  const generateMessageTime = (date: string) => {
    return new Date(date).getTime() > Date.now() - 86400000
      ? new Date(date).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      : new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!message) {
      socket.emit("stop typing", messages[0]?.chat);
      setTyping(false);
    }

    setMessage(e.target.value);

    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      socket.emit("typing", messages[0]?.chat);
    }

    let lastTypingTime = new Date().getTime();
    let timerLength = 3000;

    const timer = setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", messages[0]?.chat);
        setTyping(false);
      }
    }, timerLength);

    return () => clearTimeout(timer);
  };

  const getSenderStyle = (sender: string) => {
    switch (sender) {
      case user:
        return "items-end";
      default:
        return "items-start";
    }
  };

  React.useEffect(() => {
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));

    return () => {
      socket.off("typing");
      socket.off("stop typing");
    };
  }, []);

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
              <div className="text-xs max-w-[50%] bg-white py-2 px-3 rounded-xl mb-2">
                {message.content}
                <p className="text-[6px] text-secondaryText">
                  {generateMessageTime(message.createdAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-sm text-gray-500">No messages yet</p>
          </div>
        )}
        {isTyping && (
          <div className="w-16 h-16">
            <Lottie
              speed={0.5}
              width={"100%"}
              height={"100%"}
              options={defaultOptions}
              isClickToPauseDisabled={true}
            />
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
          onChange={handleTyping}
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
