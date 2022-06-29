export default function authHeader() {

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user && user.json.jwt) {
        // for Node.js Express back-end
        return { Authorization: 'Bearer ' + user.json.jwt };
    } else {
        return {};
    }
}