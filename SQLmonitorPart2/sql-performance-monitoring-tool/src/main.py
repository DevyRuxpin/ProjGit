from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from src.collectors.sql_collector import SQLCollector
from src.app import SessionLocal  # Correct import path
from src.templates import templates

app = FastAPI()

# Mount the static files directory
app.mount("/static", StaticFiles(directory="src/styles"), name="static")

# Set up Jinja2 templates
templates = Jinja2Templates(directory="src/templates")

config = load_config()
collector = SQLCollector(config)
alert_manager = AlertManager(config)

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/execute-query", response_class=HTMLResponse)
async def execute_query(request: Request, sql_query: str = Form(...)):
    try:
        # Create a new session instance
        session: Session = SessionLocal()  # Create a session instance
        result = session.execute(sql_query)
        data = result.fetchall()
        session.close()  # Close the session
        return templates.TemplateResponse("query_result.html", {"request": request, "data": data})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/dashboard", response_class=HTMLResponse)
async def read_dashboard(request: Request):
    return templates.TemplateResponse("dashboard.html", {"request": request})

@app.get("/metrics", response_class=HTMLResponse)
async def get_metrics(request: Request):
    try:
        # Your existing code for metrics
        pass
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))