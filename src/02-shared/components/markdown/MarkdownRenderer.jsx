import ReactMarkdown from "react-markdown";
import clsx from "clsx";

const components = {
  // Headings
  h1: ({ children }) => (
    <h1 className="text-xl font-semibold text-text mb-2 mt-4 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-lg font-semibold text-text mb-2 mt-3 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-base font-semibold text-text mb-1 mt-2 first:mt-0">
      {children}
    </h3>
  ),

  // Paragraphs
  p: ({ children }) => (
    <p className="text-text leading-relaxed mb-2 last:mb-0">{children}</p>
  ),

  // Inline elements
  strong: ({ children }) => (
    <strong className="font-semibold text-text">{children}</strong>
  ),
  em: ({ children }) => <em className="italic">{children}</em>,

  // Links
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent hover:text-accent-hover underline transition-colors"
    >
      {children}
    </a>
  ),

  // Code
  code: ({ inline, children }) => {
    if (inline) {
      return (
        <code className="bg-darker text-accent px-1.5 py-0.5 rounded text-xs font-mono">
          {children}
        </code>
      );
    }
    return <code className="text-text text-xs font-mono">{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="bg-darker p-3 rounded-lg overflow-x-auto my-2 text-xs">
      {children}
    </pre>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc pl-4 space-y-1 mb-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-4 space-y-1 mb-2">{children}</ol>
  ),
  li: ({ children }) => <li className="text-text">{children}</li>,

  // Blockquote
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-accent pl-3 italic text-text-muted my-2">
      {children}
    </blockquote>
  ),

  // Horizontal rule
  hr: () => <hr className="border-border my-3" />,
};

export function MarkdownRenderer({ content, className }) {
  return (
    <div className={clsx("markdown-content", className)}>
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </div>
  );
}
