import { useMemo } from "react";
import type { Doc } from "../_components/navbar-comp/NavSidebar";

const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isYesterday = (date: Date) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
};

const isWithinLast7Days = (date: Date) => {
  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);
  return date > weekAgo && date < today;
};

const isWithinLast30Days = (date: Date) => {
  const today = new Date();
  const monthAgo = new Date();
  monthAgo.setDate(today.getDate() - 30);
  return date > monthAgo && date < today;
};

export const useCategorizedDocs = (docs: Doc[]) => {
  return useMemo(() => {
    const todayDocs = docs.filter((doc) => isToday(new Date(doc.createdAt)));
    const yesterdayDocs = docs.filter((doc) => isYesterday(new Date(doc.createdAt)));
    const last7DaysDocs = docs.filter(
      (doc) =>
        isWithinLast7Days(new Date(doc.createdAt)) &&
        !isToday(new Date(doc.createdAt)) &&
        !isYesterday(new Date(doc.createdAt)),
    );
    const last30DaysDocs = docs.filter(
      (doc) =>
        isWithinLast30Days(new Date(doc.createdAt)) &&
        !isToday(new Date(doc.createdAt)) &&
        !isYesterday(new Date(doc.createdAt)) &&
        !isWithinLast7Days(new Date(doc.createdAt)),
    );
    const olderDocs = docs.filter(
      (doc) =>
        !isToday(new Date(doc.createdAt)) &&
        !isYesterday(new Date(doc.createdAt)) &&
        !isWithinLast7Days(new Date(doc.createdAt)) &&
        !isWithinLast30Days(new Date(doc.createdAt)),
    );

    return {
      "today": todayDocs,
      "yesterday": yesterdayDocs,
      "previous 7 Days": last7DaysDocs,
      "previous 30 Days": last30DaysDocs,
      "older": olderDocs,
    };
  }, [docs]);
};
