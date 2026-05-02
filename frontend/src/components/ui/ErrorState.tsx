type Props = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorState({ message = 'Something went wrong', onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
      <svg className="mb-4 h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
        />
      </svg>
      <p className="mb-4 text-sm">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="rounded-md bg-zinc-800 px-4 py-2 text-sm text-white hover:bg-zinc-700">
          Try again
        </button>
      )}
    </div>
  );
}
