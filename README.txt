This is a demo project by PhatLV - use to apply for the web developer position

- Project name: Task management app
	Inspired by Google ecosystem apps (Task, Calendar and Keep)

- Description:
	Create, update, delete task
	Manage task by catalogue
	Visualize task on calendar (month/ week/ day format)
	Designed to response on various screen size (mobile/ tablet/ desktop screen)

- Language: Javascript

- Technology: MERN stack
	Database: MongoDB
	Back-end: ExpressJS
	Front-end: ReactJS
	Environment: NodeJS

- Dataflow: 
					(false) → return 400;
		┌───────────────────────────────────────┐
		↓										|	(true)			
	Client ─> request ─> router ─> schema ─> validator ────> controller <══> service <══> database
		↑														| 					
		└───────────────────────────────────────────────────────┘
					(true)	→ return 200 || return 404;
					(false)	→ return 500;

