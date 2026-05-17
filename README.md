# Mini Service Request Board

[cite_start]A full-stack web application built for the GlobalTNA Full-Stack Developer Intern technical assessment[cite: 1, 2]. [cite_start]This application allows homeowners to post service requests and tradespeople to browse, view details, update statuses, or delete requests[cite: 13].

## Tech Stack
- [cite_start]**Frontend:** Next.js (App Router, Tailwind CSS, Axios) [cite: 9, 11]
- [cite_start]**Backend:** Node.js + Express 
- [cite_start]**Database:** MongoDB + Mongoose ODM [cite: 9, 10]

## Project Structure
- [cite_start]`/backend` - Express REST API with Mongoose schemas, data validation, and global error handling[cite: 24, 31].
- [cite_start]`/frontend` - Next.js responsive user interface featuring a job board, posting form, and detailed view pages[cite: 32, 33].

---

## Required Environment Variables

[cite_start]Create a `.env` file in the root of the `/backend` directory with the following variables[cite: 50]:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/globaltna
