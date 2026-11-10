/**
 * Runs the work behind a step and returns its result. When that work rejects,
 * reports the error through `reportError` and rethrows the work's own error.
 * Only `operation` is guarded, so a step callback the caller awaits outside it
 * never reads as a failed step, and anything `reportError` throws is dropped
 * so the original cause always propagates.
 */
export const withStepError = async <T>(
  operation: () => Promise<T>,
  reportError: (error: unknown) => Promise<void>,
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    await Promise.resolve()
      .then(() => reportError(error))
      .catch(() => undefined);
    throw error;
  }
};
