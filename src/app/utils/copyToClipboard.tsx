import { useState, useEffect } from "react";

type CopyToClipboardProps = {
  text: string;
  type?: "default" | "phone";
};

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text, type = "default" }) => {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (type === "phone" && isMobile) {
    return (
      <a
        href={`tel:${text}`}
        style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
      >
        {text}
      </a>
    );
  }

  return (
    <div
      style={{ position: "relative", width: "fit-content", cursor: "pointer" }}
      onClick={handleCopy}
    >
      <span>{text}</span>
      {copied && (
        <span
          style={{
            position: "absolute",
            bottom: -20,
            right: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "white",
            padding: "3px 6px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          Copied!
        </span>
      )}
    </div>
  );
};

export default CopyToClipboard;
