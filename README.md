# eShop - Τελική Εργασία Full Stack Εφαρμογής

Αυτή η εργασία αποτελεί ένα πλήρες παράδειγμα ηλεκτρονικού καταστήματος (eShop) με **React** στο frontend και **Node.js / Express / MongoDB** στο backend. Ο χρήστης μπορεί να κάνει εγγραφή, σύνδεση, να προσθέτει προϊόντα στο καλάθι, να υποβάλει παραγγελία και να αφήνει κριτικές. Ο διαχειριστής μπορεί να επεξεργάζεται προϊόντα.

---

##  Τεχνολογίες

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT
- **Άλλες Βιβλιοθήκες**: bcryptjs, dotenv, nodemon

---

##  Εγκατάσταση

### 1. Κλωνοποίηση αποθετηρίου
```bash
git clone <url>
cd eshop-backend
```

### 2. Περιβάλλον (Backend)

Δημιούργησε αρχείο `.env` μέσα στον φάκελο `eshop-backend`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/eshop
JWT_SECRET=mysecretkey
```

Στη συνέχεια:

```bash
npm install
npm run dev
```

### 3. Περιβάλλον (Frontend)

Μέσα στον φάκελο `eshop-frontend`, δημιούργησε `.env` αρχείο:

```
REACT_APP_API_URL=http://localhost:5000
```

Μετά:

```bash
cd ../eshop-frontend
npm install
npm start
```

---

##  Χρήστες για Δοκιμή

###  Διαχειριστής
- Email: `admin@email.gr`
- Κωδικός: **(ό,τι χρησιμοποίησες κατά την εγγραφή)**

###  Απλός Χρήστης
- Email: `test@email.gr`
- Κωδικός: **(ό,τι χρησιμοποίησες κατά την εγγραφή)**

---

##  Λειτουργίες

-  Δημιουργία λογαριασμού
-  Σύνδεση / Αποσύνδεση
-  Προβολή προϊόντων
-  Προσθήκη στο καλάθι
-  Δημιουργία παραγγελίας
-  Υποβολή αξιολόγησης προϊόντος
-  Προστασία routes με token
-  Admin επεξεργασία προϊόντων

---

##  Φάκελοι

```bash
eShopApp/
├── eshop-backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── eshop-frontend/
│   ├── components/
│   ├── screens/
│   └── App.js
└── README.md
```

---

##  Παρατηρήσεις

- Τα τοπικά αρχεία εικόνων (π.χ. `/uploads/asus-rog-zephyrus.jpg`) πρέπει να υπάρχουν στο φάκελο `eshop-backend/uploads/`.
- Η βάση MongoDB πρέπει να τρέχει στο `localhost:27017`.

---

## Ολοκλήρωση

Η εργασία είναι πλήρης και λειτουργεί τοπικά με βάση τις απαιτήσεις του παραδοτέου.
