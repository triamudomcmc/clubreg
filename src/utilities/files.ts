export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const convertToStaticFileUriC = (isStatic, old: string) => {
    if (!isStatic) {
        return old
    }
    // seems like static-clubreg.tucm.cc storage is not working anymore
    return old.replace("storage.googleapis.com", "static-clubreg.tucm.cc").replace("/assets", "https://static-clubreg.tucm.cc/assets")
}

export const convertToStaticFileUri = (old: string) => {
    return convertToStaticFileUriC(false, old)
}
