import React from "react";
import LoadingView from "./LoadingView";
import ErrorView from "./ErrorView";
import EmptyView from "./EmptyView";

/**
 * Renders loading / error / empty states for a useAsync() result, otherwise `children(data)`.
 * Existing data stays on screen while a refetch is in flight.
 */
export default function AsyncView({ state, children, loadingMessage, emptyMessage, emptyIcon, isEmpty }) {
  const { data, loading, error, refetch } = state;
  const empty = isEmpty ? isEmpty(data) : Array.isArray(data) && data.length === 0;

  if (loading && data == null) return <LoadingView message={loadingMessage} />;
  if (error) return <ErrorView message={error.message} onRetry={refetch} />;
  if (empty) return <EmptyView message={emptyMessage} icon={emptyIcon} />;
  return children(data);
}
