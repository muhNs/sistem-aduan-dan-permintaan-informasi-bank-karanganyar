# Dokumentasi API Client - Sistem Aduan dan Permintaan Informasi

## Pendahuluan

Dokumentasi ini menjelaskan API publik untuk client pada Sistem Aduan dan Permintaan Informasi. API ini dibangun menggunakan Node.js, Express, dan Prisma dengan database MySQL.

## Base URL

```
http://localhost:3000/api/v1
```

_Catatan: Port dapat berbeda tergantung konfigurasi environment._

## Authentication

API publik tidak memerlukan authentication. Semua endpoint di dokumentasi ini dapat diakses tanpa token.

## Endpoints

### Aduan (Complaints)

#### 1. Create Complaint

- **Method**: POST
- **Path**: `/aduan/createComplaint`
- **Deskripsi**: Membuat aduan baru (public, untuk nasabah)
- **Request Body**:
  ```json
  {
    "nasabah": {
      "name": "string (required, min 3 chars)",
      "email": "string (optional, email format)",
      "phone": "string (optional, min 9, max 15 chars)",
      "address": "string (required, min 10 chars)",
      "job": "string (optional)"
    },
    "complaint": {
      "category": "TRANSAKSI | TABUNGAN | AKUN_DAN_KARTU | APLIKASI_ERROR | PELAYANAN_CABANG | INFO_DAN_PROMO | LAINNYA (required)",
      "description": "string (required, min 10 chars)"
    }
  }
  ```
- **Response Success (201)**:
  ```json
  {
    "status": "success",
    "message": "Aduan berhasil dibuat",
    "data": {
      "ticketCode": "COM-2026-0001"
    }
  }
  ```

### Permintaan Informasi (Information Requests)

#### 1. Create Information Request

- **Method**: POST
- **Path**: `/information-requests/createInformationRequest`
- **Deskripsi**: Membuat permintaan informasi baru (public, untuk nasabah)
- **Request Body**:
  ```json
  {
    "nasabah": {
      "name": "string (required, min 3 chars)",
      "email": "string (optional, email format)",
      "phone": "string (optional, min 9, max 15 chars)",
      "address": "string (required, min 10 chars)",
      "job": "string (optional)"
    },
    "request": {
      "infoDetail": "string (required, min 10 chars)",
      "purpose": "string (optional)",
      "infoMethod": "string (optional)",
      "deliveryMethod": "string (optional)"
    }
  }
  ```
- **Response Success (201)**:
  ```json
  {
    "status": "success",
    "message": "Permohonan informasi berhasil dibuat",
    "data": {
      "ticketCode": "REQ-2026-0001"
    }
  }
  ```

### Attachments

#### 1. Upload Attachment

- **Method**: POST
- **Path**: `/attachment/`
- **Deskripsi**: Upload lampiran file untuk aduan atau permintaan informasi
- **Content-Type**: `multipart/form-data`
- **Form Data**:
  - `lampiran[]`: File(s) (max 3 files)
  - `complaintId`: string (optional, ID aduan)
  - `requestId`: string (optional, ID permintaan informasi)
- **Response Success (201)**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "filename": "string",
        "path": "string",
        "complaintId": 1,
        "requestId": null,
        "uploadedAt": "2026-04-30T00:00:00.000Z"
      }
    ]
  }
  ```

## Error Responses

Semua error responses mengikuti format:

```json
{
  "status": "error",
  "message": "Error message description"
}
```

Atau untuk validation errors:

```json
{
  "status": "fail",
  "errors": {
    "fieldName": ["Error message 1", "Error message 2"]
  }
}
```

## Status Codes

- **200**: Success
- **201**: Created
- **400**: Bad Request (validation error)
- **404**: Not Found
- **409**: Conflict (e.g., email already exists)
- **500**: Internal Server Error

## Notes

- Endpoint ini tidak memerlukan authentication
- Data datetime dalam format ISO 8601
- File upload menggunakan multer dengan batas maksimal 3 file per upload
- Untuk tracking aduan dan permintaan informasi, nasabah akan menerima ticket code yang dapat digunakan untuk referensi
