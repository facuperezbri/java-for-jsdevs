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
    <div className="rounded-lg overflow-hidden border border-border-subtle">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-java-glow border-b border-java/20">
        <span className="w-2 h-2 rounded-full bg-java" />
        <span className="text-xs font-semibold text-java uppercase tracking-wider">{t('codeLabels.java', 'Java')}</span>
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
          background: 'var(--color-code-bg)',
          color: '#d4d4d4',
          fontFamily: "var(--font-jetbrains), 'Fira Code', monospace",
          tabSize: 4,
        }}
      />
    </div>
  );
}
