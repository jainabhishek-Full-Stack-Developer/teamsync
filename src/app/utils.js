export const generateCustomUUID = () => {
    const timestamp = Date.now().toString(16); // Hex timestamp
    const randomPart = Math.random().toString(16).slice(2, 10).replace(/\./g, ''); // Random hex string without dots
    const uniqueSegment = (performance.now() * 1000).toString(16).slice(0, 8).replace(/\./g, ''); // More uniqueness without dots

    return `${timestamp}-${randomPart}-${uniqueSegment}`;
};
