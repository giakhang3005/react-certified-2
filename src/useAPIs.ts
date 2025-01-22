/** @format */

import axios from "axios";

export const useAPIs = () => {
  const onGetAllCategories = () => {
    return axios
      .get("https://opentdb.com/api_category.php")
      .then((res) => res.data.trivia_categories)
      .catch((err) => console.warn(err));
  };

  const onGetQuestions = (category: number, difficulty: string) => {
    return axios
      .get(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
      .then((res) => res.data)
      .catch((err) => console.warn(err));
  }

  return { onGetAllCategories, onGetQuestions };
};
