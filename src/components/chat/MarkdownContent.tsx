'use client';

import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from '@/src/components/lesson/CodeBlock';
import { cn } from '@/src/lib/utils';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

const markdownComponents: Components = {
  strong: ({ children }) => (
    <strong className="font-bold text-text-primary">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic">{children}</em>
  ),
  del: ({ children }) => (
    <del className="line-through text-text-muted">{children}</del>
  ),
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className ?? '');
    const code = String(children).replace(/\n$/, '');
    const isBlock = Boolean(match) || code.includes('\n');

    if (isBlock) {
      const language = match?.[1] ?? 'text';
      return (
        <CodeBlock code={code} language={language} lineHeight={1.5} />
      );
    }

    return (
      <code
        className={cn(
          'px-1.5 py-0.5 rounded text-xs font-mono',
          'bg-surface-3 border border-border-subtle text-text-primary'
        )}
        {...props}
      >
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <div className="my-3 [&>div]:!my-0">{children}</div>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-module-blue underline hover:text-module-blue/80 transition-colors"
    >
      {children}
    </a>
  ),
  p: ({ children }) => (
    <p className="mb-2 last:mb-0">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-text-primary">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-border pl-3 my-2 text-text-secondary italic">
      {children}
    </blockquote>
  ),
  h1: ({ children }) => (
    <h1 className="text-lg font-bold text-text-primary mt-3 mb-1 first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-base font-bold text-text-primary mt-3 mb-1 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-sm font-bold text-text-primary mt-2 mb-1 first:mt-0">
      {children}
    </h3>
  ),
  hr: () => <hr className="border-border my-3" />,
};

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  return (
    <div className={cn('markdown-content', className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
