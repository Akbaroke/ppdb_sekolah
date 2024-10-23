import { Pagination } from '../interfaces/store';

const calculateShowingEntriesText = (pagination: Pagination) => {
  const { totalData, currentPage } = pagination;
  const entriesPerPage = 10;
  const startIndex = (currentPage - 1) * entriesPerPage + 1;
  const endIndex = Math.min(startIndex + entriesPerPage - 1, totalData);

  return `Menampilkan ${startIndex} sampai ${endIndex} dari ${totalData} data`;
};

export default calculateShowingEntriesText;
