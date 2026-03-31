# Form Connection & Data Mapping Guide

## 1. Objective
Connect the public website's "Certainty Quote" form to the MasChemFreight Command Center (PocketBase).
**Key Requirement:** Every quote submission must automatically create or update a record in the `contacts` collection and then link that contact to the new `quote` record.

## 2. Source Data Analysis (Frontend Form)
*Reference: `src/js/main.js` (Alpine.store('quoteForm'))*

The following fields are currently captured by the public form:

| Frontend Field | Type | Description |
| :--- | :--- | :--- |
| `name` | String | Submitter's Full Name |
| `email` | String | Contact Email |
| `company_name` | String | Business Name (Optional) |
| `cell_local_number` | String | Phone Number |
| `cell_country_code` | String | Dial Code (e.g., +27) |
| `initial_country` | String | Destination Country |
| `delivery_deadline_date` | String | Requested Delivery Date |
| `is_hazardous` | Boolean/String | Hazchem Status |
| `product_description` | String | Cargo Details |
| `collection_address` | String | Pickup Location |
| `delivery_addresses` | Array | Drop-off Location(s) |
| `quote_id` | String | Generated ID (e.g., MCF-260210-...) |

---

## 3. Destination Schema (PocketBase)

We need two collections to store this data properly.

### A. Collection: `contacts` (CRM)
*Unique Constraint: `email`*

| Field Name | Type | Source Mapping |
| :--- | :--- | :--- |
| `name` | Text | `form.name` |
| `email` | Email | `form.email` |
| `phone` | Text | `form.cell_country_code` + `form.cell_local_number` |
| `company` | Text | `form.company_name` |
| `type` | Select | Default to "Client" |

### B. Collection: `quotes` (Transactional)

| Field Name | Type | Source Mapping |
| :--- | :--- | :--- |
| `quote_ref` | Text | `form.quote_id` |
| `contact_id` | Relation | ID from the created/found `contacts` record |
| `status` | Select | Default to "New" |
| `destination` | Text | `form.initial_country` |
| `cargo_details` | JSON | `{ description: form.product_description, hazchem: form.is_hazardous }` |
| `route_details` | JSON | `{ pickup: form.collection_address, drops: form.delivery_addresses, date: form.delivery_deadline_date }` |
| `price` | Number | (Empty on submission - for Staff to fill) |

---

## 4. Implementation Logic (The "Bridge")

We will create a helper function `submitQuoteToPocketBase(formData)` in `src/js/main.js` that replaces the current Make.com webhook.

### Workflow:
1.  **Check Contact:** Query `contacts` collection for `email == form.email`.
    *   *If Found:* Get `id`.
    *   *If Not Found:* Create new `contact` record -> Get new `id`.
2.  **Create Quote:** Insert new record into `quotes` collection with:
    *   `contact_id`: The ID from Step 1.
    *   `quote_ref`: The generated ID.
    *   Mapped fields from Section 3B.
3.  **Success:** Return `true` to the Alpine store to show the success modal.

### Code Snippet (Preview)
```javascript
// Example SDK usage
async function submitToCommandCenter(data) {
  const pb = new PocketBase(import.meta.env.VITE_API_URL);
  
  // 1. Find or Create Contact
  let contact;
  try {
    contact = await pb.collection('contacts').getFirstListItem(`email="${data.email}"`);
  } catch {
    contact = await pb.collection('contacts').create({
      name: data.name,
      email: data.email,
      phone: `${data.cell_country_code} ${data.cell_local_number}`,
      company: data.company_name,
      type: 'Client'
    });
  }

  // 2. Create Quote linked to Contact
  await pb.collection('quotes').create({
    quote_ref: data.quote_id,
    contact_id: contact.id,
    destination: data.initial_country,
    status: 'New',
    cargo_details: {
        description: data.product_description,
        hazchem: data.is_hazardous
    },
    route_details: {
        pickup: data.collection_address,
        drops: data.delivery_addresses,
        required_date: data.delivery_deadline_date
    }
  });
}
```

---

## 5. Security Note
*   The connection from the public site will use a restricted **API Client Key** (or limited user) that only has `create` permission on `quotes` and `contacts`.
*   It should **NOT** have `list` or `update` permissions to prevent data scraping.
