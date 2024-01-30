function calculateAge(tanggalLahir: Date): number {
  const now = new Date();
  const yearOfBirth = tanggalLahir.getFullYear();
  const monthOfBirth = tanggalLahir.getMonth();
  const dateOfBirth = tanggalLahir.getDate();

  const yearNow = now.getFullYear();
  const monthNow = now.getMonth();
  const dateNow = now.getDate();

  let age = yearNow - yearOfBirth;

  // Periksa apakah ulang tahun sudah berlalu atau belum
  if (
    monthNow < monthOfBirth ||
    (monthNow === monthOfBirth && dateNow < dateOfBirth)
  ) {
    age--;
  }

  return age;
}

export default calculateAge;
