// src/shared/ui/MarkdownRenderer/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown-light.css'; // Импорт базовых стилей

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer = ({ content, className = '' }: MarkdownRendererProps) => {
  if (!content) return null;

  if (content.startsWith('<p>') && content.endsWith('</p>')) {
    content = content.slice(3, -4);
  }

  return (
    <div className={`markdown-body ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        // Важно: не экранируем HTML, если доверяем контенту. В твоем случае — доверяем.
        skipHtml={false}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};