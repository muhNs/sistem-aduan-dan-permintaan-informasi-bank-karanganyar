# Attachment API

Dokumentasi API untuk upload, menampilkan, dan mendownload file attachment.

> Base URL server: `http://localhost:<PORT>`
> Karena aplikasi menggunakan versioning `v1`, endpoint attachment berada di bawah `/api/v1/attachments`.

## 1. Upload File

- Method: `POST`
- Endpoint: `/api/v1/attachments/upload`
- Fungsi: Upload file attachment ke server dan simpan metadata di database.
- Content-Type: `multipart/form-data`
- Field file: `lampiran[]`
- Maksimal file: 3 file per request

### Request

Form data:

- `lampiran[]` = file
- `complaintId` = optional, ID aduan
- `requestId` = optional, ID permohonan informasi

### Contoh menggunakan fetch

```js
const formData = new FormData();
formData.append("lampiran[]", fileInput.files[0]);
formData.append("complaintId", "123");

const response = await fetch(
  "http://localhost:3000/api/v1/attachments/upload",
  {
    method: "POST",
    body: formData,
  },
);

const result = await response.json();
console.log(result);
```

### Respon sukses

```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "requestId": null,
      "complaintId": 123,
      "complaintResolutionId": null,
      "filePath": "/uploads/1686000000000-nama-file.pdf"
    }
  ]
}
```

## 2. Menampilkan File

- Method: `GET`
- Endpoint: `/uploads/:filename`
- Fungsi: Menampilkan file di browser / frontend.

### Contoh

Untuk file `1686000000000-nama-file.pdf`:

```
http://localhost:3000/uploads/1686000000000-nama-file.pdf
```

Jika file berada di sub-folder, gunakan path lengkap sesuai `filePath` dalam database, misal:

```
http://localhost:3000/uploads/complaints/1686000000000-nama-file.pdf
```

## 3. Download File

- Method: `GET`
- Endpoint: `/api/v1/attachments/download/:filename`
- Fungsi: Mengunduh file attachment sebagai attachment download.

### Contoh

```
http://localhost:3000/api/v1/attachments/download/1686000000000-nama-file.pdf
```

### Contoh menggunakan fetch

```js
const response = await fetch(
  "http://localhost:3000/api/v1/attachments/download/1686000000000-nama-file.pdf",
);
const blob = await response.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "nama-file.pdf";
document.body.appendChild(a);
a.click();
URL.revokeObjectURL(url);
```

## Catatan

- Semua file diupload disimpan di folder `public/uploads`.
- Endpoint `GET /uploads/:filename` sudah dikonfigurasi sebagai static file serving.
- Endpoint download menggunakan lookup dari tabel `Attachment` untuk memastikan file tersedia di database dan server.
