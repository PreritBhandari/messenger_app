import {
    ADMIN_GET_MESSAGES,
    ADMIN_ADD_MESSAGES
} from "../actions/actions";

const initialState = {
    messages: []
};

export default function mainReducer(state = initialState, action) {
    switch (action.type) {
        // regions
        case ADMIN_GET_MESSAGES: {
            return {
                ...state,
                messages: [...action.payload],
            };
        }

        case ADMIN_ADD_MESSAGES: {
            const messages = [...state.messages];
            messages.push(action.payload);
            return {
                ...state,
                messages: messages,
            };
        }

        default:
            return state;
    }
}