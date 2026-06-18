# Dokumentasi API Sistem Aduan dan Permintaan Informasi

## Pendahuluan

Dokumentasi ini menjelaskan API untuk Sistem Aduan dan Permintaan Informasi. API ini dibangun menggunakan Node.js, Express, dan Prisma dengan database MySQL.

## Base URL

```
http://localhost:3000/api/v1
```

_Catatan: Port dapat berbeda tergantung konfigurasi environment._

## Authentication

API menggunakan JWT (JSON Web Token) untuk authentication. Token diperoleh melalui endpoint login dan harus disertakan dalam header `Authorization: Bearer <token>` untuk endpoint yang memerlukan authentication.

### Roles

- **ADMIN**: Akses penuh ke semua fitur
- **CS**: Akses ke fitur customer service (aduan dan permintaan informasi)
- **USER**: Tidak ada role khusus, hanya untuk nasabah publik

## Endpoints

### Authentication

#### 1. Login

- **Method**: POST
- **Path**: `/auth/login`
- **Deskripsi**: Login untuk mendapatkan access token dan refresh token
- **Request Body**:
  ```json
  {
    "email": "string (required, email format)",
    "password": "string (required, min 6 characters)"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "message": "Login berhasil",
    "data": {
      "user": {
        "id": 1,
        "name": "string",
        "email": "string",
        "role": "ADMIN | CS"
      },
      "accessToken": "string",
      "refreshToken": "string"
    }
  }
  ```
- **Response Error (400)**:
  ```json
  {
    "message": "Email atau password salah"
  }
  ```

#### 2. Logout

- **Method**: POST
- **Path**: `/auth/logout`
- **Deskripsi**: Logout dan mencabut token
- **Headers**: `Authorization: Bearer <access_token>`
- **Response Success (200)**:
  ```json
  {
    "message": "Logout berhasil"
  }
  ```

#### 3. Refresh Token

- **Method**: POST
- **Path**: `/auth/refresh-token`
- **Deskripsi**: Mendapatkan access token baru menggunakan refresh token
- **Request Body**:
  ```json
  {
    "refreshToken": "string (required)"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "message": "Token berhasil diperbarui",
    "data": {
      "accessToken": "string",
      "refreshToken": "string"
    }
  }
  ```

### Users

#### 1. Get Current User Profile

- **Method**: GET
- **Path**: `/users/me`
- **Deskripsi**: Mendapatkan profil user yang sedang login
- **Headers**: `Authorization: Bearer <access_token>`
- **Response Success (200)**:
  ```json
  {
    "id": 1,
    "name": "string",
    "email": "string",
    "role": "ADMIN | CS"
  }
  ```

#### 2. Get All Users

- **Method**: GET
- **Path**: `/users/getAllUsers`
- **Deskripsi**: Mendapatkan daftar semua users (hanya untuk ADMIN)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN only
- **Response Success (200)**:
  ```json
  [
    {
      "id": 1,
      "name": "string",
      "email": "string",
      "role": "ADMIN | CS",
      "createdAt": "2026-04-30T00:00:00.000Z"
    }
  ]
  ```

#### 3. Create User

- **Method**: POST
- **Path**: `/users/createUser`
- **Deskripsi**: Membuat user baru (hanya untuk ADMIN)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN only
- **Request Body**:
  ```json
  {
    "name": "string (required, min 1 char)",
    "email": "string (required, email format)",
    "password": "string (required, min 6 chars)",
    "role": "ADMIN | USER (required)"
  }
  ```
- **Response Success (201)**:
  ```json
  {
    "id": 1,
    "name": "string",
    "email": "string",
    "role": "ADMIN | USER",
    "createdAt": "2026-04-30T00:00:00.000Z"
  }
  ```

#### 4. Update User

- **Method**: PUT
- **Path**: `/users/updateUser/:id`
- **Deskripsi**: Update data user (hanya untuk ADMIN)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN only
- **Parameters**: `id` (number, user ID)
- **Request Body**:
  ```json
  {
    "name": "string (optional)",
    "email": "string (optional, email format)",
    "password": "string (optional, min 6 chars)",
    "role": "admin | cs (optional)"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "id": 1,
    "name": "string",
    "email": "string",
    "role": "ADMIN | CS",
    "updatedAt": "2026-04-30T00:00:00.000Z"
  }
  ```

#### 5. Delete User

- **Method**: POST
- **Path**: `/users/deleteUser/:id`
- **Deskripsi**: Hapus user (soft delete, hanya untuk ADMIN)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN only
- **Parameters**: `id` (number, user ID)
- **Response Success (200)**:
  ```json
  {
    "message": "User deleted successfully"
  }
  ```

### Nasabah (Customers)

#### 1. Get All Nasabah

- **Method**: GET
- **Path**: `/nasabah/getAllNasabah`
- **Deskripsi**: Mendapatkan daftar semua nasabah (hanya untuk ADMIN)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN only
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "name": "string",
        "email": "string",
        "phone": "string",
        "address": "string",
        "job": "string",
        "createdAt": "2026-04-30T00:00:00.000Z"
      }
    ]
  }
  ```

#### 2. Get Nasabah by ID

- **Method**: GET
- **Path**: `/nasabah/getNasabahById/:id`
- **Deskripsi**: Mendapatkan detail nasabah berdasarkan ID (hanya untuk ADMIN)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN only
- **Parameters**: `id` (number, nasabah ID)
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "string",
      "email": "string",
      "phone": "string",
      "address": "string",
      "job": "string",
      "createdAt": "2026-04-30T00:00:00.000Z"
    }
  }
  ```

#### 3. Update Nasabah

- **Method**: PUT
- **Path**: `/nasabah/updateNasabah/:id`
- **Deskripsi**: Update data nasabah (hanya untuk ADMIN)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN only
- **Parameters**: `id` (number, nasabah ID)
- **Request Body**:
  ```json
  {
    "name": "string (optional, min 3 chars)",
    "email": "string (optional, email format)",
    "phone": "string (optional, min 9, max 15 chars)",
    "address": "string (optional, min 10 chars)",
    "job": "string (optional)"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "name": "string",
      "email": "string",
      "phone": "string",
      "address": "string",
      "job": "string",
      "updatedAt": "2026-04-30T00:00:00.000Z"
    },
    "message": "Data nasabah berhasil diperbarui"
  }
  ```

#### 4. Delete Nasabah

- **Method**: POST
- **Path**: `/nasabah/deleteNasabah/:id`
- **Deskripsi**: Hapus nasabah (soft delete, hanya untuk ADMIN)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN only
- **Parameters**: `id` (number, nasabah ID)
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "message": "Data nasabah berhasil dihapus"
  }
  ```

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

#### 2. Get All Complaints

- **Method**: GET
- **Path**: `/aduan/getAllComplaints`
- **Deskripsi**: Mendapatkan daftar semua aduan dengan pagination (hanya untuk ADMIN/CS)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN or CS
- **Query Parameters**:
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
  - `status`: string (optional, filter by status: open | in_progress | resolved | closed)
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "ticketCode": "COM-2026-0001",
        "nasabah": {
          "id": 1,
          "name": "string",
          "email": "string",
          "phone": "string"
        },
        "category": "TRANSAKSI",
        "description": "string",
        "status": "open",
        "priority": "medium",
        "createdAt": "2026-04-30T00:00:00.000Z"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
  ```

#### 3. Get Complaint Detail

- **Method**: GET
- **Path**: `/aduan/getComplaintDetail/:id`
- **Deskripsi**: Mendapatkan detail aduan beserta resolusi jika ada (hanya untuk ADMIN/CS)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN or CS
- **Parameters**: `id` (number, complaint ID)
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "ticketCode": "COM-2026-0001",
      "nasabah": {
        "id": 1,
        "name": "string",
        "email": "string",
        "phone": "string",
        "address": "string"
      },
      "category": "TRANSAKSI",
      "description": "string",
      "status": "resolved",
      "priority": "medium",
      "createdAt": "2026-04-30T00:00:00.000Z",
      "resolution": {
        "id": 1,
        "resolutionMessage": "string",
        "resolvedBy": {
          "id": 1,
          "name": "string"
        },
        "resolvedAt": "2026-04-30T00:00:00.000Z"
      },
      "attachments": [
        {
          "id": 1,
          "filename": "string",
          "path": "string",
          "uploadedAt": "2026-04-30T00:00:00.000Z"
        }
      ]
    }
  }
  ```

#### 4. Update Complaint Status

- **Method**: PUT
- **Path**: `/aduan/updateComplaintStatus/:id`
- **Deskripsi**: Update status aduan (hanya untuk ADMIN/CS)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN or CS
- **Parameters**: `id` (number, complaint ID)
- **Request Body**:
  ```json
  {
    "status": "open | in_progress | resolved | closed (required)"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "message": "Status aduan berhasil diperbarui",
    "data": {
      "id": 1,
      "status": "in_progress",
      "updatedAt": "2026-04-30T00:00:00.000Z"
    }
  }
  ```

#### 5. Resolve Complaint

- **Method**: POST
- **Path**: `/aduan/resolveComplaint/:id`
- **Deskripsi**: Menyelesaikan aduan dengan memberikan resolusi (hanya untuk ADMIN/CS)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN or CS
- **Parameters**: `id` (number, complaint ID)
- **Request Body**:
  ```json
  {
    "resolutionMessage": "string (required, min 10 chars)"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "message": "Aduan berhasil diselesaikan. Notifikasi WhatsApp sedang dikirim ke nasabah.",
    "data": {
      "id": 1,
      "complaintId": 1,
      "resolutionMessage": "string",
      "resolvedBy": 1,
      "resolvedAt": "2026-04-30T00:00:00.000Z"
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

#### 2. Get All Information Requests

- **Method**: GET
- **Path**: `/information-requests/getAllInformationRequests`
- **Deskripsi**: Mendapatkan daftar semua permintaan informasi dengan pagination (hanya untuk ADMIN/CS)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN or CS
- **Query Parameters**:
  - `page`: number (default: 1)
  - `limit`: number (default: 10)
  - `status`: string (optional, filter by status: pending | processed | completed | rejected)
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 1,
        "ticketCode": "REQ-2026-0001",
        "nasabah": {
          "id": 1,
          "name": "string",
          "email": "string",
          "phone": "string"
        },
        "infoDetail": "string",
        "purpose": "string",
        "infoMethod": "string",
        "deliveryMethod": "string",
        "status": "pending",
        "createdAt": "2026-04-30T00:00:00.000Z"
      }
    ],
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1
    }
  }
  ```

#### 3. Get Information Request Detail

- **Method**: GET
- **Path**: `/information-requests/getInformationRequestDetail/:id`
- **Deskripsi**: Mendapatkan detail permintaan informasi beserta response jika ada (hanya untuk ADMIN/CS)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN or CS
- **Parameters**: `id` (number, request ID)
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "data": {
      "id": 1,
      "ticketCode": "REQ-2026-0001",
      "nasabah": {
        "id": 1,
        "name": "string",
        "email": "string",
        "phone": "string",
        "address": "string"
      },
      "infoDetail": "string",
      "purpose": "string",
      "infoMethod": "string",
      "deliveryMethod": "string",
      "status": "completed",
      "createdAt": "2026-04-30T00:00:00.000Z",
      "response": {
        "id": 1,
        "responseMessage": "string",
        "respondedBy": {
          "id": 1,
          "name": "string"
        },
        "respondedAt": "2026-04-30T00:00:00.000Z"
      },
      "attachments": [
        {
          "id": 1,
          "filename": "string",
          "path": "string",
          "uploadedAt": "2026-04-30T00:00:00.000Z"
        }
      ]
    }
  }
  ```

#### 4. Update Information Request Status

- **Method**: PUT
- **Path**: `/information-requests/updateInformationRequestStatus/:id`
- **Deskripsi**: Update status permintaan informasi (hanya untuk ADMIN/CS)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN or CS
- **Parameters**: `id` (number, request ID)
- **Request Body**:
  ```json
  {
    "status": "pending | processed | completed | rejected (required)"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "message": "Status permohonan informasi berhasil diperbarui",
    "data": {
      "id": 1,
      "status": "processed",
      "updatedAt": "2026-04-30T00:00:00.000Z"
    }
  }
  ```

#### 5. Response Information Request

- **Method**: POST
- **Path**: `/information-requests/responseInformationRequest/:id`
- **Deskripsi**: Memberikan response pada permintaan informasi (hanya untuk ADMIN/CS)
- **Headers**: `Authorization: Bearer <access_token>`
- **Authorization**: ADMIN or CS
- **Parameters**: `id` (number, request ID)
- **Request Body**:
  ```json
  {
    "responseMessage": "string (required, min 10 chars)"
  }
  ```
- **Response Success (200)**:
  ```json
  {
    "status": "success",
    "message": "Respon permohonan informasi berhasil dikirim",
    "data": {
      "id": 1,
      "requestId": 1,
      "responseMessage": "string",
      "respondedBy": 1,
      "respondedAt": "2026-04-30T00:00:00.000Z"
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
- **401**: Unauthorized
- **404**: Not Found
- **409**: Conflict (e.g., email already exists)
- **500**: Internal Server Error

## Notes

- Semua endpoint yang memerlukan authentication menggunakan Bearer token di header Authorization
- Endpoint public tidak memerlukan authentication
- Data datetime dalam format ISO 8601
- Pagination menggunakan query parameters `page` dan `limit`
- File upload menggunakan multer dengan batas maksimal 3 file per upload
- Notifikasi WhatsApp dikirim otomatis saat aduan diselesaikan</content>
  <parameter name="filePath">c:\amat\6\magang\Project magang\Sistem aduan dan permohonan informasi\Sistem Aduan dan Permintaan Informasi\backend\API_Documentation.md
