// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isObjectEqual(x: any, y: any): boolean {
  // Mengonversi objek menjadi string JSON untuk membandingkan dengan tepat
  const obj1String = JSON.stringify(x);
  const obj2String = JSON.stringify(y);

  // Memeriksa apakah kedua string JSON sama
  if (obj1String === obj2String) {
    return true; // Objek sama
  } else {
    return false; // Objek berbeda
  }
}

export default isObjectEqual;
