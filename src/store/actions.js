import * as actionTypes from "./actionTypes";

export const loadData = (payload) => ({ type: actionTypes.LOAD_DATA, payload });
export const addCharacter = (payload) => ({type: actionTypes.ADD_CHARACTER, payload});
export const removeCharacter = (payload) => ({type: actionTypes.REMOVE_CHARACTER, payload});
export const editCharacter = (payload) => ({type: actionTypes.EDIT_CHARACTER, payload});