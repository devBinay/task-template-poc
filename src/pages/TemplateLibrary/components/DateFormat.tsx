import moment from "moment";

const formatDate = (dateString: string): string => {
  return moment(dateString).format("DD/MM/YY");
};
