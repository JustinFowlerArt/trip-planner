
export default function blockInvalidChar(e) {
    return ["e", "E", "+", "-"].includes(e.key) && e.preventDefault();
}