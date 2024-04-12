export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const convertToStaticFileUri = (old: string) => {
    return old.replace("storage.googleapis.com", "static-clubreg.tucm.cc")
}
export const convertToStaticFileUriC = (isStatic, old: string) => {
    if (!isStatic) {
        return old
    }
    return old.replace("storage.googleapis.com", "static-clubreg.tucm.cc")
}