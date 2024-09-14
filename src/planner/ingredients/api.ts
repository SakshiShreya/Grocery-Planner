import { TIngredientsBase, TIngredientsResponse } from "./types";

export const getIngredients = ({ page = 1 }): Promise<TIngredientsResponse> => {
  return fetch(`https://grocery-planner-be.onrender.com/api/ingredients?${new URLSearchParams({ page: page.toString() }).toString()}`).then(response =>
    response.json()
  );
};

export const createIngredient = (data: TIngredientsBase): Promise<TIngredientsBase> => {
  return fetch("https://grocery-planner-be.onrender.com/api/ingredients", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(({ data }) => data);
};

export const updateIngredient = ({ data, id }: { data: TIngredientsBase; id: string }): Promise<TIngredientsBase> => {
  return fetch(`https://grocery-planner-be.onrender.com/api/ingredients/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(({ data }) => data);
};

export const deleteIngredient = (id: string): Promise<void> => {
  return fetch(`https://grocery-planner-be.onrender.com/api/ingredients/${id}`, {
    method: "DELETE"
  }).then(response => response.json());
};
