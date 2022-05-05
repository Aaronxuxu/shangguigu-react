import ajax from "./ajax";

export const login = (obj) => ajax("/api/login", obj, "POST");
