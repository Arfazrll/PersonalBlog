"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    X,
    Send,
    Bot,
    User,
    Loader2,
    AlertCircle,
    RotateCcw,
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/data/portfolio";
import { useTranslations, useLocale } from "next-intl";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    error?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateId(): string {
    return Math.random().toString(36).slice(2, 11);
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─── Markdown renderer (simple, no external deps) ─────────────────────────────
function SimpleMarkdown({ text }: { text: string }) {
    const lines = text.split("\n");
    const elements: React.ReactNode[] = [];
    let i = 0;
    let k = 0; // Separate key counter — always unique regardless of i's position

    while (i < lines.length) {
        const line = lines[i];

        // Empty line → spacing
        if (line.trim() === "") {
            elements.push(<div key={k++} className="h-2" />);
            i++;
            continue;
        }

        // Heading ##
        if (line.startsWith("## ")) {
            elements.push(
                <p key={k++} className="font-semibold text-sm mt-2 mb-1">
                    {inlineFormat(line.slice(3))}
                </p>
            );
            i++;
            continue;
        }

        // Heading #
        if (line.startsWith("# ")) {
            elements.push(
                <p key={k++} className="font-bold text-sm mt-2 mb-1">
                    {inlineFormat(line.slice(2))}
                </p>
            );
            i++;
            continue;
        }

        // Bullet list
        if (line.match(/^[-*•] /)) {
            const items: string[] = [];
            while (i < lines.length && lines[i].match(/^[-*•] /)) {
                items.push(lines[i].replace(/^[-*•] /, ""));
                i++;
            }
            elements.push(
                <ul key={k++} className="list-disc list-inside space-y-0.5 my-1">
                    {items.map((item, idx) => (
                        <li key={idx} className="text-sm leading-relaxed">
                            {inlineFormat(item)}
                        </li>
                    ))}
                </ul>
            );
            continue;
        }

        // Numbered list
        if (line.match(/^\d+\. /)) {
            const items: string[] = [];
            while (i < lines.length && lines[i].match(/^\d+\. /)) {
                items.push(lines[i].replace(/^\d+\. /, ""));
                i++;
            }
            elements.push(
                <ol key={k++} className="list-decimal list-inside space-y-0.5 my-1">
                    {items.map((item, idx) => (
                        <li key={idx} className="text-sm leading-relaxed">
                            {inlineFormat(item)}
                        </li>
                    ))}
                </ol>
            );
            continue;
        }

        // Regular paragraph
        elements.push(
            <p key={k++} className="text-sm leading-relaxed">
                {inlineFormat(line)}
            </p>
        );
        i++;
    }

    return <div className="space-y-1">{elements}</div>;
}

function inlineFormat(text: string): React.ReactNode {
    // Bold (**text**), italic (*text*), code (`code`), links [text](url)
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return <strong key={idx}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
            return <em key={idx}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
            return (
                <code key={idx} className="px-1 py-0.5 rounded text-xs font-mono bg-foreground/10">
                    {part.slice(1, -1)}
                </code>
            );
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
            return (
                <a
                    key={idx}
                    href={linkMatch[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:opacity-80"
                >
                    {linkMatch[1]}
                </a>
            );
        }
        return part;
    });
}

// ─── Suggested questions moved into component for i18n ───

// ─── Message bubble ───────────────────────────────────────────────────────────
const MessageBubble = React.memo(function MessageBubble({
    message,
    onRetry,
}: {
    message: Message;
    onRetry?: () => void;
}) {
    const t = useTranslations("chatbot");
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2 }}
            className={cn("flex gap-2.5 w-full", isUser ? "flex-row-reverse" : "flex-row")}
        >
            {/* Avatar */}
            <div
                className={cn(
                    "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5",
                    isUser
                        ? "bg-primary/20 border border-primary/30"
                        : "bg-foreground/10 border border-foreground/10"
                )}
            >
                {isUser ? (
                    <User className="w-3.5 h-3.5 text-primary" />
                ) : (
                    <Bot className="w-3.5 h-3.5 text-foreground/70" />
                )}
            </div>

            {/* Content */}
            <div className={cn("flex flex-col gap-1 max-w-[82%]", isUser ? "items-end" : "items-start")}>
                <div
                    className={cn(
                        "px-3.5 py-2.5 rounded-2xl break-words",
                        isUser
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : message.error
                                ? "bg-destructive/10 border border-destructive/20 text-destructive rounded-tl-sm"
                                : "bg-foreground/8 border border-foreground/8 text-foreground rounded-tl-sm"
                    )}
                >
                    {isUser ? (
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    ) : message.error ? (
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                                <p className="text-sm">{message.content}</p>
                            </div>
                            {onRetry && (
                                <button
                                    onClick={onRetry}
                                    className="flex items-center gap-1 text-xs underline underline-offset-2 hover:opacity-80 w-fit"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    {t("retry")}
                                </button>
                            )}
                        </div>
                    ) : (
                        <SimpleMarkdown text={message.content} />
                    )}
                </div>
                <span className="text-[10px] text-foreground/40 px-1">{formatTime(message.timestamp)}</span>
            </div>
        </motion.div>
    );
});

// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="flex gap-2.5"
        >
            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-foreground/10 border border-foreground/10 flex items-center justify-center mt-0.5">
                <Bot className="w-3.5 h-3.5 text-foreground/70" />
            </div>
            <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm bg-foreground/8 border border-foreground/8">
                <div className="flex gap-1 items-center h-3">
                    {[0, 1, 2].map((i) => (
                        <motion.span
                            key={i}
                            className="w-1.5 h-1.5 rounded-full bg-foreground/40"
                            animate={{ y: [0, -4, 0] }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─── ChatWindow ───────────────────────────────────────────────────────────────
function ChatWindow({ onClose }: { onClose: () => void }) {
    const t = useTranslations("chatbot");
    const locale = useLocale();

    const [messages, setMessages] = useState<Message[]>([
        {
            id: generateId(),
            role: "assistant",
            content: t("greeting", { name: portfolioData.personal.name }),
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showScrollBtn, setShowScrollBtn] = useState(false);
    const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Auto-scroll to bottom
    const scrollToBottom = useCallback((smooth = true) => {
        messagesEndRef.current?.scrollIntoView({
            behavior: smooth ? "smooth" : "instant",
        });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading, scrollToBottom]);

    // Show scroll-to-bottom button when not at bottom
    const handleScroll = useCallback(() => {
        const el = scrollContainerRef.current;
        if (!el) return;
        const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
        setShowScrollBtn(distFromBottom > 60);
    }, []);

    // Focus input on open
    useEffect(() => {
        const timer = setTimeout(() => inputRef.current?.focus(), 100);
        return () => clearTimeout(timer);
    }, []);

    // Cleanup abort controller on unmount
    useEffect(() => {
        return () => {
            abortControllerRef.current?.abort();
        };
    }, []);

    const sendMessage = useCallback(
        async (text: string) => {
            const trimmed = text.trim();
            if (!trimmed || isLoading) return;

            setLastUserMessage(trimmed);
            setInput("");

            const userMsg: Message = {
                id: generateId(),
                role: "user",
                content: trimmed,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, userMsg]);
            setIsLoading(true);

            // Build messages array for API (exclude error messages)
            const apiMessages = [...messages, userMsg]
                .filter((m) => !m.error)
                .map(({ role, content }) => ({ role, content }));

            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            try {
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ messages: apiMessages, locale }),
                    signal: abortControllerRef.current.signal,
                });

                if (!res.ok) {
                    let errorMessage = t("error");
                    try {
                        const errData = await res.json();
                        errorMessage = errData?.error ?? errorMessage;
                    } catch {
                        // ignore JSON parse errors
                    }
                    throw new Error(errorMessage);
                }

                const data = await res.json();
                const reply = data?.reply;

                if (!reply || typeof reply !== "string") {
                    throw new Error(t("invalidResponse"));
                }

                setMessages((prev) => [
                    ...prev,
                    {
                        id: generateId(),
                        role: "assistant",
                        content: reply,
                        timestamp: new Date(),
                    },
                ]);
            } catch (err: unknown) {
                if (err instanceof Error && err.name === "AbortError") return;

                const errorMsg =
                    err instanceof Error
                        ? err.message
                        : t("unknownError");

                setMessages((prev) => [
                    ...prev,
                    {
                        id: generateId(),
                        role: "assistant",
                        content: errorMsg,
                        timestamp: new Date(),
                        error: true,
                    },
                ]);
            } finally {
                setIsLoading(false);
            }
        },
        [messages, isLoading]
    );

    const handleRetry = useCallback(() => {
        if (!lastUserMessage) return;
        // Remove last error message
        setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.error) return prev.slice(0, -1);
            return prev;
        });
        sendMessage(lastUserMessage);
    }, [lastUserMessage, sendMessage]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
            }
        },
        [input, sendMessage]
    );

    // Auto-resize textarea
    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setInput(e.target.value);
            const el = e.target;
            el.style.height = "auto";
            el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
        },
        []
    );

    const SUGGESTED_QUESTIONS = t.raw("suggestions") as string[];
    const showSuggestions = messages.length <= 1;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            className={cn(
                "fixed z-50 flex flex-col",
                "bottom-24 right-4 md:right-16",
                "w-[calc(100vw-2rem)] sm:w-[380px]",
                "h-[520px] max-h-[80vh]",
                "rounded-2xl shadow-2xl overflow-hidden",
                "bg-background border border-foreground/10",
                "backdrop-blur-xl"
            )}
            style={{ maxWidth: "420px" }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/8 bg-foreground/3 flex-shrink-0">
                <div className="flex items-center gap-2.5">
                    <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-primary" />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold leading-none">{t("title")}</p>
                        <p className="text-[11px] text-foreground/50 mt-0.5">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/8 transition-colors"
                    aria-label={t("close")}
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Messages area */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent"
            >
                {messages.map((msg, idx) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        onRetry={msg.error && idx === messages.length - 1 ? handleRetry : undefined}
                    />
                ))}

                <AnimatePresence>
                    {isLoading && <TypingIndicator />}
                </AnimatePresence>

                {/* Suggested questions */}
                <AnimatePresence>
                    {showSuggestions && !isLoading && (
                        <motion.div
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 6 }}
                            className="flex flex-wrap gap-2 pt-1"
                        >
                            {SUGGESTED_QUESTIONS.map((q) => (
                                <button
                                    key={q}
                                    onClick={() => sendMessage(q)}
                                    className={cn(
                                        "text-xs px-3 py-1.5 rounded-full border transition-all",
                                        "bg-foreground/5 border-foreground/10 text-foreground/70",
                                        "hover:bg-primary/10 hover:border-primary/30 hover:text-foreground",
                                        "active:scale-95"
                                    )}
                                >
                                    {q}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
                {showScrollBtn && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => scrollToBottom()}
                        className={cn(
                            "absolute right-3 bottom-20 z-10",
                            "w-7 h-7 rounded-full flex items-center justify-center",
                            "bg-background border border-foreground/15 shadow-md",
                            "text-foreground/60 hover:text-foreground transition-colors"
                        )}
                    >
                        <ChevronDown className="w-3.5 h-3.5" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Input area */}
            <div className="flex-shrink-0 px-3.5 py-3 border-t border-foreground/8 bg-foreground/2">
                <div className="flex items-end gap-2">
                    <textarea
                        ref={inputRef}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        disabled={isLoading}
                        placeholder={t("placeholder")}
                        rows={1}
                        className={cn(
                            "flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm",
                            "bg-foreground/5 border border-foreground/10",
                            "placeholder:text-foreground/35 text-foreground",
                            "focus:outline-none focus:border-primary/40 focus:bg-foreground/7",
                            "transition-colors disabled:opacity-50",
                            "min-h-[40px] max-h-[120px] leading-relaxed"
                        )}
                        style={{ height: "40px" }}
                    />
                    <button
                        onClick={() => sendMessage(input)}
                        disabled={isLoading || !input.trim()}
                        className={cn(
                            "flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                            "bg-primary text-primary-foreground",
                            "transition-all active:scale-95",
                            "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100",
                            "hover:opacity-90"
                        )}
                        aria-label="Send message"
                    >
                        {isLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Send className="w-4 h-4" />
                        )}
                    </button>
                </div>
                <p className="text-[10px] text-foreground/30 mt-1.5 text-center">
                    {t("inputHint")}
                </p>
            </div>
        </motion.div>
    );
}

// ─── Main ChatBot component ───────────────────────────────────────────────────
export function ChatBot({ headless = false }: { headless?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasNewMsg, setHasNewMsg] = useState(false);

    const toggle = useCallback(() => {
        setIsOpen((prev) => !prev);
        setHasNewMsg(false);
    }, []);

    const close = useCallback(() => setIsOpen(false), []);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) close();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, close]);

    // Listen for external toggle events (e.g. from Footer)
    useEffect(() => {
        const handleToggle = () => setIsOpen(true);
        window.addEventListener("portfolio:toggle-chatbot", handleToggle);
        return () => window.removeEventListener("portfolio:toggle-chatbot", handleToggle);
    }, []);

    return (
        <>
            {/* Chat window */}
            <AnimatePresence>{isOpen && <ChatWindow onClose={close} />}</AnimatePresence>

            {/* Trigger button — globally fixed corner button */}
            {!headless && (
                <motion.button
                    onClick={toggle}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        "relative p-3 rounded-full transition-all group",
                        "border border-foreground/10",
                        isOpen
                            ? "bg-primary/20 border-primary/40"
                            : "bg-foreground/5 hover:bg-foreground/10"
                    )}
                    aria-label="Open portfolio chatbot"
                    aria-expanded={isOpen}
                >
                    <MessageSquare
                        className={cn(
                            "w-5 h-5 transition-colors",
                            isOpen
                                ? "text-primary"
                                : "text-foreground/60 group-hover:text-foreground"
                        )}
                    />
                    {/* Notification dot */}
                    {hasNewMsg && !isOpen && (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background"
                        />
                    )}
                    {/* Pulse ring when closed */}
                    {!isOpen && (
                        <motion.span
                            className="absolute inset-0 rounded-full border border-primary/30"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    )}
                </motion.button>
            )}
        </>
    );
}
