import { NewsDataArticle } from "@/types/news";

export enum Themes {
  DARK = 'dark',
  LIGHT = 'light',
  DEFAULT = 'default',
}

export enum ButtonTypeLabel {
  Back = "BACK",
  Cancel = "CANCEL",
  Clear = "CLEAR",
  Save = "SAVE",
  Add = "ADD",
  Edit = "EDIT",
  Delete = "DELETE",
  Find = "FIND",
  Update = "UPDATE",
  Confirm = "CONFIRM",
  Register = "REGISTER",
  Ok = "OK",
}

export enum ViewMode {
  Add = "Add",
  Create = "Create",
  Edit = "Edit",
  Preview = "Preview",
  View = "View",
  Search = "Search",
}

export enum Pages {
  Welcome,
  Page1,
  Page2,
  Page3,
  Page4,
  NotFound,
}

export const NewsDataArticleDefault: NewsDataArticle = {
  title: '',
  description: null,
  content: null,
  link: null,
  image_url: null,
  keywords: null,
  category: null,
  country: null,
  source_id: '',
  creator: null,
  pubDate: '',
}
