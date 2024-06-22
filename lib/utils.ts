export function supportsFlagEmoji() {
    if (typeof document === 'undefined') {
        return false;
    }

    const canvas = document.createElement('canvas');
    canvas.height = 10;
    canvas.width = canvas.height * 2;
    const ctx = canvas.getContext('2d');
    ctx.font = `${canvas.height}px Arial`;
    ctx.fillText('🇬🇧', 0, canvas.height);
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let i = 0;
    while (i < data.length) {
        if (data[i] !== data[i + 1] || data[i] !== data[i + 2]) {
            return true;
        }
        i += 4;
    }
    return false;
}
