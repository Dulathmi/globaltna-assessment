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

## Required Environment Variables

Create a `.env` file in the root of the `/backend` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/globaltna
