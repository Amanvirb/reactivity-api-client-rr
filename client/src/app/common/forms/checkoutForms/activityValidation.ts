import * as yup from "yup";

export const validationSchema = [
  yup.object({
    title: yup.string().required("Title is required"),
    nutritionFacts: yup.string().required("Nutrition Facts are required"),
    category: yup.string().required(),
    city: yup.string().required(),
    venue: yup.string().required(),
    country: yup.string().required(),
    hostName: yup.string().required(),
  }),
  yup.object({
    title: yup.string().required("Title is required"),
    nutritionFacts: yup.string().required("Nutrition Facts are required"),
  }),
  yup.object(),
];
