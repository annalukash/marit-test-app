import * as actionTypes from "./actionTypes";

const initialState = {
    charactersList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_DATA:
            return {
                ...state,
                charactersList: action.payload,
            };
        case actionTypes.ADD_CHARACTER:
            const newArray = [...state.charactersList, action.payload];
            return {
                ...state,
                charactersList: newArray,
            };
        case actionTypes.REMOVE_CHARACTER:
            const filteredArray = state.charactersList.filter((item) => item.id !== action.payload);
            return {
                ...state,
                charactersList: filteredArray,
            };
        case actionTypes.EDIT_CHARACTER:
            const editedArray = state.charactersList.map((item) => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
            return {
                ...state,
                charactersList: editedArray,
            };
        default:
            return state;
    }
};

export default reducer;
