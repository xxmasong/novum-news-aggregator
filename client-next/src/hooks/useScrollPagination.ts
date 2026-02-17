import { getScrollBottom, getScrollTop } from '@/utils/utils';
import { useRef, useCallback, useEffect } from 'react';

type Params = {
  offset?: number | null;
  stop?: boolean;
  onLoadMoreByOffset?: (offset: number) => any;
};

export default function useScrollPagination({
  stop,
  offset,
  onLoadMoreByOffset,
}: Params) {
  const last = useRef<string | number | null>(null);

  const preventBottomStick = useCallback(() => {
    if (getScrollBottom() === 0) {
      window.scrollTo(0, getScrollTop() - 1);
    }
  }, []);

  const loadMoreUsingOffset = useCallback(async () => {
    if (stop || !offset || !onLoadMoreByOffset) return;
    if (offset === last.current) return;
    last.current = offset;
    await onLoadMoreByOffset(offset);
  }, [offset, onLoadMoreByOffset, preventBottomStick, stop]);

  const onScroll = useCallback(() => {
    const scrollBottom = getScrollBottom();
    if (scrollBottom < window.screen.height) {
      loadMoreUsingOffset();
    }
  }, [loadMoreUsingOffset]);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);
}
