# Mini Service Request Board

A full-stack web application built for the GlobalTNA Full-Stack Developer Intern technical assessment. This application allows homeowners to post service requests and tradespeople to browse, view details, update statuses, or delete requests.

## Tech Stack
- **Frontend:** Next.js (App Router, Tailwind CSS, Axios)
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose ODM

## Project Structure
- `/backend` - Express REST API with Mongoose schemas, data validation, and global error handling.
- `/frontend` - Next.js responsive user interface featuring a job board, posting form, and detailed view pages.

---

## Live Demo

The frontend of this application is deployed and can be viewed live here:
👉 **[https://globaltna-assessment-one.vercel.app](https://globaltna-assessment-one.vercel.app)**

*(Note: Since the backend API runs locally, fetching and submitting data from this cloud link will require a local backend instance or an active CORS configuration. For a full demonstration, please follow the local setup instructions below).*

---

## Required Environment Variables

Create a `.env` file in the root of the `/backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/globaltna
