"use client";
import { api } from "@/utils/request";
import React, { createContext, useCallback, useContext, useState } from "react";
import { BookmarkItem } from "./page";
import { useAuth } from "@/app/auth/context";
import { toast } from "sonner";
import { createUUID } from "@/utils/uuid";

interface BookmarkContextProps {
  list: BookmarkItem[];
  addBookmark: (title: string, url: string) => void;
  removeBookmark: (item: BookmarkItem) => void;
  setList: (list: BookmarkItem[]) => void;
}

const BookmarkContext = createContext<BookmarkContextProps>(
  {} as BookmarkContextProps
);

export const BookmarkContextProvider: React.FC<{
  children: React.ReactNode;
  bookmarks: BookmarkItem[];
}> = ({ children, bookmarks }) => {
  const { user } = useAuth();
  const [list, setList] = useState<BookmarkItem[]>(bookmarks);

  const handleSaveBookmark = useCallback(
    async (item: BookmarkItem) => {
      if (user?.id) {
        try {
          await api.post("/api/bookmark/create", {
            id: item.id,
            title: item.title,
            url: item.url,
          });
        } catch (err) {
          toast("Oops!", {
            description: "Your bookmark was not saved in the cloud, try again.",
          });
        }
      } else {
        const currentLocal = JSON.parse(
          localStorage.getItem("@dnnr:bookmarks") || "[]"
        );
        localStorage.setItem(
          "@dnnr:bookmarks",
          JSON.stringify([...currentLocal, item])
        );
      }
    },
    [user?.id]
  );

  const handleDeleteBookmark = useCallback(
    async (item: BookmarkItem) => {
      if (user?.id) {
        try {
          await api.delete("/api/bookmark/delete", {
            params: {
              id: item.id,
            },
          });
        } catch (err) {
          toast("Oops!", {
            description:
              "Your bookmark was not deleted in the cloud, try again.",
          });
        }
      } else {
        const currentLocal = JSON.parse(
          localStorage.getItem("@dnnr:bookmarks") || "[]"
        );
        const newList = currentLocal.filter(
          (i: BookmarkItem) => i.id !== item.id
        );
        localStorage.setItem("@dnnr:bookmarks", JSON.stringify(newList));
      }
    },
    [user?.id]
  );

  const handleAddBookmark = useCallback(
    (title: string, url: string) => {
      if (!title || !url) return;

      const newItem: BookmarkItem = {
        id: createUUID(),
        title,
        url: url.startsWith("http") ? url : `https://${url}`,
      };

      setList((prev) => [...prev, newItem]);
      handleSaveBookmark(newItem);
    },
    [handleSaveBookmark]
  );

  const handleRemoveBookmark = useCallback(
    (removedItem: BookmarkItem) => {
      setList((prev) =>
        prev.filter((currentItem) => currentItem.id !== removedItem.id)
      );
      handleDeleteBookmark(removedItem);
    },
    [handleDeleteBookmark]
  );

  return (
    <BookmarkContext.Provider
      value={{
        addBookmark: handleAddBookmark,
        removeBookmark: handleRemoveBookmark,
        setList,
        list,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmark = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error(
      "useBookmark must be used inside a BookmarkContextProvider"
    );
  }
  return context;
};
