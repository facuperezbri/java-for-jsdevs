import { useTranslation } from 'react-i18next';
import { cn } from '../../lib/utils';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CodeEditor({ value, onChange, disabled }: CodeEditorProps) {
  const { t } = useTranslation();
  
  return (
    <div className="rounded-lg overflow-hidden border border-surface-700">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50/50 dark:bg-[#1a0000] border-b border-surface-700">
        <span className="text-sm">☕</span>
        <span className="text-xs font-semibold text-red-700 dark:text-java uppercase tracking-wider">{t('codeLabels.java', 'Java')}</span>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        spellCheck={false}
        className={cn(
          'w-full min-h-[200px] p-4 text-sm leading-relaxed resize-y outline-none',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
        )}
        style={{
          background: '#111118',
          color: '#d4d4d4',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          tabSize: 4,
        }}
      />
    </div>
  );
}
