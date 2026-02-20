import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DndContext,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
} from '@dnd-kit/core';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { CheckCircle2, XCircle, ArrowRightLeft } from 'lucide-react';
import type { TranslationDrill } from '../../types';
import { CodeBlock } from './CodeBlock';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface TranslationDrillExerciseProps {
  drill: TranslationDrill;
  index: number;
  isComplete: boolean;
  onComplete: (id: string) => void;
}

function DraggableToken({ id, label, disabled }: { id: string; label: string; disabled: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id, disabled });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      disabled={disabled}
      className={cn(
        'px-3 py-1.5 rounded-lg text-sm font-mono border transition-all select-none',
        isDragging && 'opacity-30',
        disabled
          ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed'
          : 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800/50 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-grab active:cursor-grabbing shadow-sm'
      )}
    >
      {label}
    </button>
  );
}

function DroppableSlot({
  id,
  value,
  isCorrect,
  isWrong,
  submitted,
  onClick,
}: {
  id: string;
  value: string | null;
  isCorrect: boolean;
  isWrong: boolean;
  submitted: boolean;
  onClick: () => void;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <button
      ref={setNodeRef}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center min-w-[5rem] px-2 py-0.5 mx-1 rounded border text-sm font-mono transition-all',
        value
          ? submitted && isCorrect
            ? 'bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-800 dark:text-green-300'
            : submitted && isWrong
              ? 'bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-800 dark:text-red-300'
              : 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 cursor-pointer'
          : isOver
            ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 dark:border-blue-600 border-dashed'
            : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 border-dashed text-gray-400 dark:text-gray-500'
      )}
    >
      {value ?? '___'}
    </button>
  );
}

export function TranslationDrillExercise({ drill, index, isComplete, onComplete }: TranslationDrillExerciseProps) {
  const [slotValues, setSlotValues] = useState<Record<string, string | null>>(
    () => Object.fromEntries(drill.slots.map((s) => [s.id, null]))
  );
  const [usedTokens, setUsedTokens] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const { t } = useTranslation();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const allCorrect = submitted && drill.slots.every((s) => results[s.id]);

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  }, []);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const tokenId = active.id as string;
    const slotId = over.id as string;

    // Must drop on a valid slot
    if (!drill.slots.find((s) => s.id === slotId)) return;

    // If slot already has a value, return it to the bank
    const existing = slotValues[slotId];
    if (existing) {
      setUsedTokens((prev) => {
        const next = new Set(prev);
        next.delete(existing);
        return next;
      });
    }

    // If token is already in a different slot, clear it from that slot
    setSlotValues((prev) => {
      const next = { ...prev };
      for (const [key, val] of Object.entries(next)) {
        if (val === tokenId) next[key] = null;
      }
      next[slotId] = tokenId;
      return next;
    });

    setUsedTokens((prev) => {
      const next = new Set(prev);
      // Remove old token reference if it was placed before
      for (const [, val] of Object.entries(slotValues)) {
        if (val === tokenId) {
          // Will be handled by the setSlotValues above
        }
      }
      next.add(tokenId);
      return next;
    });

    if (submitted) {
      setSubmitted(false);
      setResults({});
    }
  }, [drill.slots, slotValues, submitted]);

  // Click-to-place accessibility fallback
  function handleTokenClick(tokenId: string) {
    if (usedTokens.has(tokenId)) return;

    if (selectedToken === tokenId) {
      setSelectedToken(null);
      return;
    }

    // Find first empty slot
    const emptySlot = drill.slots.find((s) => !slotValues[s.id]);
    if (emptySlot) {
      setSlotValues((prev) => ({ ...prev, [emptySlot.id]: tokenId }));
      setUsedTokens((prev) => new Set([...prev, tokenId]));
      setSelectedToken(null);
      if (submitted) {
        setSubmitted(false);
        setResults({});
      }
    } else {
      setSelectedToken(tokenId);
    }
  }

  function handleSlotClick(slotId: string) {
    const val = slotValues[slotId];
    if (!val) {
      // If a token is selected, place it here
      if (selectedToken) {
        setSlotValues((prev) => ({ ...prev, [slotId]: selectedToken }));
        setUsedTokens((prev) => new Set([...prev, selectedToken]));
        setSelectedToken(null);
        if (submitted) {
          setSubmitted(false);
          setResults({});
        }
      }
      return;
    }
    // Return token to bank
    setSlotValues((prev) => ({ ...prev, [slotId]: null }));
    setUsedTokens((prev) => {
      const next = new Set(prev);
      next.delete(val);
      return next;
    });
    if (submitted) {
      setSubmitted(false);
      setResults({});
    }
  }

  function handleCheck() {
    const newResults: Record<string, boolean> = {};
    for (const slot of drill.slots) {
      const placed = slotValues[slot.id];
      newResults[slot.id] = placed === slot.expected;
    }
    setResults(newResults);
    setSubmitted(true);

    if (drill.slots.every((s) => newResults[s.id])) {
      onComplete(drill.id);
    }
  }

  const done = isComplete || allCorrect;

  // Parse Java template and render with drop zones
  function renderTemplate() {
    const parts = drill.javaTemplate.split(/(___SLOT_\d+___)/g);
    return parts.map((part, i) => {
      const match = part.match(/___SLOT_(\d+)___/);
      if (match) {
        const slotIndex = parseInt(match[1], 10) - 1;
        const slot = drill.slots[slotIndex];
        if (!slot) return <span key={i}>{part}</span>;

        const finalValue = done ? slot.expected : slotValues[slot.id];

        return (
          <DroppableSlot
            key={i}
            id={slot.id}
            value={finalValue}
            isCorrect={submitted && results[slot.id] === true}
            isWrong={submitted && results[slot.id] === false}
            submitted={submitted}
            onClick={() => !done && handleSlotClick(slot.id)}
          />
        );
      }
      return <span key={i}>{part}</span>;
    });
  }

  const allSlotsFilled = drill.slots.every((s) => slotValues[s.id]);

  return (
    <div
      className={cn(
        'rounded-xl border p-5 space-y-4 transition-all animate-fade-in',
        done
          ? 'bg-green-50/50 dark:bg-green-900/30 border-green-200 dark:border-green-800/50 shadow-sm'
          : 'bg-white dark:bg-surface-900 border-surface-700 shadow-sm'
      )}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800/50 flex items-center justify-center">
          <ArrowRightLeft size={14} className="text-indigo-600 dark:text-indigo-400" />
        </div>
        <div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1 uppercase tracking-wider font-medium">{t('drill.title', 'Translation Drill')} {index + 1}</div>
          <p className="text-sm text-gray-800 dark:text-gray-200">{t('drill.subtitle', 'Translate the JavaScript code to Java by dragging tokens into the correct slots.')}</p>
        </div>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* JS side */}
          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-50/50 dark:bg-[#1a1a00] border border-[#f7df1e]/20 rounded-t-lg">
              <span className="text-sm">🟨</span>
              <span className="text-xs font-semibold text-yellow-700 dark:text-[#f7df1e] uppercase tracking-wider">{t('codeLabels.javascript', 'JavaScript')}</span>
            </div>
            <CodeBlock code={drill.jsCode} language="javascript" />
          </div>

          {/* Java side with drop zones */}
          <div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50/50 dark:bg-[#1a0000] border border-java/20 rounded-t-lg">
              <span className="text-sm">☕</span>
              <span className="text-xs font-semibold text-red-700 dark:text-java uppercase tracking-wider">{t('codeLabels.java', 'Java')}</span>
            </div>
            <div className="rounded-b-lg overflow-x-auto border border-surface-700 border-t-0">
              <pre
                className="p-4 text-sm leading-relaxed whitespace-pre-wrap"
                style={{
                  background: '#111118',
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  color: '#d4d4d4',
                }}
              >
                {renderTemplate()}
              </pre>
            </div>
          </div>
        </div>

        {/* Token bank */}
        {!done && (
          <div className="space-y-2">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">{t('drill.tokenBank', 'Token Bank — drag or click to place:')}</p>
            <div className="flex flex-wrap gap-2">
              {drill.tokenBank.map((token) => (
                <div
                  key={token}
                  onClick={() => !usedTokens.has(token) && handleTokenClick(token)}
                >
                  <DraggableToken
                    id={token}
                    label={token}
                    disabled={usedTokens.has(token)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <DragOverlay>
          {activeId ? (
            <div className="px-3 py-1.5 rounded-lg text-sm font-mono bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-700 shadow-lg">
              {activeId}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {!done && (
        <div className="flex justify-end">
          <Button size="sm" onClick={handleCheck} disabled={!allSlotsFilled}>
            {t('common.check', 'Check')}
          </Button>
        </div>
      )}

      {submitted && !allCorrect && !done && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800/50 animate-fade-in">
          <XCircle size={14} className="text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-red-700 dark:text-red-300">{t('drill.incorrect', 'Some slots are incorrect. Click wrong tokens to return them and try again.')}</p>
        </div>
      )}

      {done && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800/50 animate-fade-in">
          <CheckCircle2 size={14} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-green-800 dark:text-green-300 leading-relaxed">{drill.explanation}</p>
        </div>
      )}
    </div>
  );
}
