// Extract values from msg() into a placeholder for input elements
export function placeholderTextFromMsg(msgElement: { props?: { dangerouslySetInnerHTML?: { __html: string } } }): string {
    if (!msgElement || typeof msgElement !== "object" || !msgElement.props) {
        return "";
    }

    if (msgElement.props.dangerouslySetInnerHTML?.__html) {
        return msgElement.props.dangerouslySetInnerHTML.__html;
    }

    return "";
}