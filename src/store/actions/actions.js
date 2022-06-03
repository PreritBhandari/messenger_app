export const ADMIN_GET_MESSAGES = "ADMIN_GET_MESSAGES";
export const ADMIN_ADD_MESSAGES = "ADMIN_ADD_MESSAGES";




export function adminGetMessages(payload) {
    return { type: ADMIN_GET_MESSAGES, payload };
}

export function adminAddMessages(payload) {
    return { type: ADMIN_ADD_MESSAGES, payload };
  }