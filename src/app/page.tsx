"use client";
import Footer from "@/components/Footer";
import HomeSegment from "@/components/HomeSegment";
import ListGrid from "@/components/ListGrid";
import SpinningLoading from "@/components/loading/SpinningLoading";
import Navbar from "@/components/Navbar";
import SearchNotFound from "@/components/SearchNotFound";
import { SearchItem, useSearchMulti } from "@/hooks/useSearchMulti";
import { changeSpinningLoading } from "@/store/features/spinningLoadingSlice";
import { RootState } from "@/store/store";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { isSpinningLoading } = useSelector(
    (state: RootState) => state.spinningLoader
  );
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state: RootState) => state.search);
  const [items, setItems] = useState<SearchItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isFetchingNextPage, setIsFetchingNextPage] = useState(true);
  const searchMultiQuery = useSearchMulti({
    searchValue: searchValue,
    page: page,
  });

  useEffect(() => {
    if (searchMultiQuery.isFetched && searchMultiQuery.data) {
      const { results, total_pages } = searchMultiQuery.data;
      setItems((prevItems) => {
        const newItems = results.filter(
          (newItem) => !prevItems.some((item) => item.id === newItem.id)
        );
        return [...prevItems, ...newItems];
      });
      setTotalPages(total_pages);
    }
  }, [searchMultiQuery.isFetched, searchMultiQuery.data, page, totalPages]);

  useEffect(() => {
    if (searchValue) {
      setItems([]);
      setPage(1);
    }
  }, [searchValue]);

  const loadMore = () => {
    if (page === totalPages) {
      setIsFetchingNextPage(false);
      return;
    } else {
      setIsFetchingNextPage(true);
      setPage((prevPage) => prevPage + 1);

      if (searchMultiQuery.data) {
        setTimeout(() => {
          const { results, total_pages } = searchMultiQuery.data;
          setItems((prevItems) => {
            const newItems = results.filter(
              (newItem) => !prevItems.some((item) => item.id === newItem.id)
            );
            return [...prevItems, ...newItems];
          });
          setTotalPages(total_pages);
          setIsFetchingNextPage(true);
        }, 2000);
      }
    }
  };

  useEffect(() => {
    if (isSpinningLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isSpinningLoading]);

  useEffect(() => {
    if (searchMultiQuery.isFetching) {
      dispatch(changeSpinningLoading(true));
    } else {
      dispatch(changeSpinningLoading(false));
    }
  }, [dispatch, searchMultiQuery.isFetching]);

  return (
    <React.Fragment>
      <Navbar />
      {!searchValue && (
        <Suspense fallback={<SpinningLoading />}>
          <section className="flex-1">
            <HomeSegment />
          </section>
        </Suspense>
      )}

      {searchValue && items?.length > 0 && (
        <section className="mt-40 min-h-[100dvh]">
          <ListGrid
            items={items}
            isFetchingNextPage={isFetchingNextPage}
            loadMore={loadMore}
          />
          {!isFetchingNextPage && <Footer />}
        </section>
      )}

      {searchValue && items?.length == 0 && searchMultiQuery.isFetched && (
        <SearchNotFound searchQuery={searchValue} />
      )}

      {/* <Footer /> */}
      {isSpinningLoading && (
        <section className="w-full min-h-[100dvh] dark:bg-primary bg-[#f5f5f5] z-50">
          <SpinningLoading />
        </section>
      )}
    </React.Fragment>
  );
}
